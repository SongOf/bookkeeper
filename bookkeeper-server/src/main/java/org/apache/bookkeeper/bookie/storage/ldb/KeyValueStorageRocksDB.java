/**
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */
package org.apache.bookkeeper.bookie.storage.ldb;

import static com.google.common.base.Preconditions.checkState;
import static org.rocksdb.RateLimiter.DEFAULT_FAIRNESS;
import static org.rocksdb.RateLimiter.DEFAULT_MODE;
import static org.rocksdb.RateLimiter.DEFAULT_REFILL_PERIOD_MICROS;

//CHECKSTYLE.OFF: IllegalImport
import io.netty.util.internal.PlatformDependent;
//CHECKSTYLE.ON: IllegalImport

import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.TimeUnit;

import org.apache.bookkeeper.bookie.storage.ldb.KeyValueStorageFactory.DbConfigType;
import org.apache.bookkeeper.conf.ServerConfiguration;
import org.rocksdb.BlockBasedTableConfig;
import org.rocksdb.BloomFilter;
import org.rocksdb.Cache;
import org.rocksdb.ChecksumType;
import org.rocksdb.CompressionType;
import org.rocksdb.InfoLogLevel;
import org.rocksdb.LRUCache;
import org.rocksdb.Options;
import org.rocksdb.RateLimiter;
import org.rocksdb.RateLimiterMode;
import org.rocksdb.ReadOptions;
import org.rocksdb.RocksDB;
import org.rocksdb.RocksDBException;
import org.rocksdb.RocksIterator;
import org.rocksdb.Slice;
import org.rocksdb.WriteBatch;
import org.rocksdb.WriteOptions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * RocksDB based implementation of the KeyValueStorage.
 */
public class KeyValueStorageRocksDB implements KeyValueStorage {

    static KeyValueStorageFactory factory = (defaultBasePath, subPath, dbConfigType, conf) ->
            new KeyValueStorageRocksDB(defaultBasePath, subPath, dbConfigType, conf);

    private final RocksDB db;

    private final WriteOptions optionSync;
    private final WriteOptions optionDontSync;

    private final ReadOptions optionCache;
    private final ReadOptions optionDontCache;

    private final WriteBatch emptyBatch;
    private final RocksDBStatsParser dbStatsParser;

    private static final String ROCKSDB_LOG_PATH = "dbStorage_rocksDB_logPath";
    private static final String ROCKSDB_LOG_LEVEL = "dbStorage_rocksDB_logLevel";
    private static final String ROCKSDB_LZ4_COMPRESSION_ENABLED = "dbStorage_rocksDB_lz4CompressionEnabled";
    private static final String ROCKSDB_WRITE_BUFFER_SIZE_MB = "dbStorage_rocksDB_writeBufferSizeMB";
    private static final String ROCKSDB_SST_SIZE_MB = "dbStorage_rocksDB_sstSizeInMB";
    private static final String ROCKSDB_BLOCK_SIZE = "dbStorage_rocksDB_blockSize";
    private static final String ROCKSDB_BLOOM_FILTERS_BITS_PER_KEY = "dbStorage_rocksDB_bloomFilterBitsPerKey";
    private static final String ROCKSDB_BLOCK_CACHE_SIZE = "dbStorage_rocksDB_blockCacheSize";
    private static final String ROCKSDB_NUM_LEVELS = "dbStorage_rocksDB_numLevels";
    private static final String ROCKSDB_NUM_FILES_IN_LEVEL0 = "dbStorage_rocksDB_numFilesInLevel0";
    private static final String ROCKSDB_MAX_SIZE_IN_LEVEL1_MB = "dbStorage_rocksDB_maxSizeInLevel1MB";
    // add new params for rocksDB
    private static final String ROCKSDB_MAX_WRITE_BUFFER_NUMBER = "dbStorage_rocksDB_maxWriteBufferNumber";
    private static final String ROCKSDB_MAX_BACK_GROUND_JOBS = "dbStorage_rocksDB_maxBackgroundJobs";
    private static final String ROCKSDB_RATE_BYTES_PER_SECOND = "dbStorage_rocksDB_rateBytesPerSecond";
    private static final String ROCKSDB_RATE_REFILL_PERIOD_MICROS = "dbStorage_rocksDB_rateRefillPeriodMicros";
    private static final String ROCKSDB_RATE_FAIRNESS = "dbStorage_rocksDB_rateFairness";
    private static final String ROCKSDB_RATELIMITERMODE = "dbStorage_rocksDB_rateLimiterMode";
    private static final String ROCKSDB_INCREASE_PARALLELISM = "dbStorage_rocksDB_increaseParallelism";
    private static final String ROCKSDB_MAX_TOTAL_WAL_SIZE = "dbStorage_rocksDB_maxTotalWalSize";
    private static final String ROCKSDB_MAX_OPEN_FILES = "dbStorage_rocksDB_maxOpenFiles";
    private static final String ROCKSDB_DELETE_OBSOLETE_FILES_PERIOD_MICROS =
            "dbStorage_rocksDB_deleteObsoleteFilesPeriodMicros";
    private static final String ROCKSDB_FORMAT_VERSION = "dbStorage_rocksDB_formatVersion";
    private static final String ROCKSDB_CHECKSUM_TYPE = "dbStorage_rocksDB_checksumType";
    private static final String ROCKSDB_CACHE_INDEX_AND_FILTER_BLOCKS = "dbStorage_rocksDB_cacheIndexAndFilterBlocks";
    private static final String ROCKSDB_LEVEL_COMPACTION_DYNAMIC_LEVEL_BYTES =
            "dbStorage_rocksDB_levelCompactionDynamicLevelBytes";
    private static final String ROCKSDB_KEEP_LOG_FILE_NUM = "dbStorage_rocksDB_keepLogFileNum";
    private static final String ROCKSDB_LOG_FILE_TIME_TO_ROLL = "dbStorage_rocksDB_logFileTimeToRoll";

    public KeyValueStorageRocksDB(String basePath, String subPath, DbConfigType dbConfigType, ServerConfiguration conf)
            throws IOException {
        this(basePath, subPath, dbConfigType, conf, false);
    }

    public KeyValueStorageRocksDB(String basePath, String subPath, DbConfigType dbConfigType, ServerConfiguration conf,
                                  boolean readOnly)
            throws IOException {
        try {
            RocksDB.loadLibrary();
        } catch (Throwable t) {
            throw new IOException("Failed to load RocksDB JNI library", t);
        }

        this.optionSync = new WriteOptions();
        this.optionDontSync = new WriteOptions();
        this.optionCache = new ReadOptions();
        this.optionDontCache = new ReadOptions();
        this.emptyBatch = new WriteBatch();

        try (Options options = new Options()) {
            options.setCreateIfMissing(true);

            if (dbConfigType == DbConfigType.Huge) {
                // Set default RocksDB block-cache size to 10% / numberOfLedgers of direct memory, unless override
                int ledgerDirsSize = conf.getLedgerDirNames().length;
                long defaultRocksDBBlockCacheSizeBytes = PlatformDependent.maxDirectMemory() / ledgerDirsSize / 10;
                long blockCacheSize = DbLedgerStorage.getLongVariableOrDefault(conf, ROCKSDB_BLOCK_CACHE_SIZE,
                        defaultRocksDBBlockCacheSizeBytes);

                long writeBufferSizeMB = conf.getInt(ROCKSDB_WRITE_BUFFER_SIZE_MB, 64);
                long sstSizeMB = conf.getInt(ROCKSDB_SST_SIZE_MB, 64);
                int numLevels = conf.getInt(ROCKSDB_NUM_LEVELS, -1);
                int numFilesInLevel0 = conf.getInt(ROCKSDB_NUM_FILES_IN_LEVEL0, 4);
                long maxSizeInLevel1MB = conf.getLong(ROCKSDB_MAX_SIZE_IN_LEVEL1_MB, 256);
                int blockSize = conf.getInt(ROCKSDB_BLOCK_SIZE, 64 * 1024);
                int bloomFilterBitsPerKey = conf.getInt(ROCKSDB_BLOOM_FILTERS_BITS_PER_KEY, 10);
                boolean lz4CompressionEnabled = conf.getBoolean(ROCKSDB_LZ4_COMPRESSION_ENABLED, true);

                // add new params for rocksDB
                int maxWriteBufferNumber = conf.getInt(ROCKSDB_MAX_WRITE_BUFFER_NUMBER, 4);
                int maxBackgroundJobs = conf.getInt(ROCKSDB_MAX_BACK_GROUND_JOBS, 32);
                int rateBytesPerSecond = conf.getInt(ROCKSDB_RATE_BYTES_PER_SECOND, -1);
                int increaseParallelism = conf.getInt(ROCKSDB_INCREASE_PARALLELISM, 32);
                int maxTotalWalSize = conf.getInt(ROCKSDB_MAX_TOTAL_WAL_SIZE, 512 * 1024 * 1024);
                int maxOpenFiles = conf.getInt(ROCKSDB_MAX_OPEN_FILES, -1);
                long deleteObsoleteFilesPeriodMicros = conf.getLong(ROCKSDB_DELETE_OBSOLETE_FILES_PERIOD_MICROS,
                        TimeUnit.HOURS.toMicros(1));
                int formatVersion = conf.getInt(ROCKSDB_FORMAT_VERSION, 2);
                ChecksumType checksumType = ChecksumType.valueOf(conf.getString(ROCKSDB_CHECKSUM_TYPE,
                        ChecksumType.kxxHash.name()));
                boolean cacheIndexAndFilterBlocks = conf.getBoolean(ROCKSDB_CACHE_INDEX_AND_FILTER_BLOCKS, true);
                boolean levelCompactionDynamicLevelBytes = conf.getBoolean(ROCKSDB_LEVEL_COMPACTION_DYNAMIC_LEVEL_BYTES,
                        true);

                if (lz4CompressionEnabled) {
                    options.setCompressionType(CompressionType.LZ4_COMPRESSION);
                }
                options.setWriteBufferSize(writeBufferSizeMB * 1024 * 1024);
                options.setMaxWriteBufferNumber(maxWriteBufferNumber);
                if (numLevels > 0) {
                    options.setNumLevels(numLevels);
                }
                options.setLevelZeroFileNumCompactionTrigger(numFilesInLevel0);
                options.setMaxBytesForLevelBase(maxSizeInLevel1MB * 1024 * 1024);
                options.setMaxBackgroundJobs(maxBackgroundJobs);
                if (rateBytesPerSecond > 0) {
                    long refillPeriodMicros = conf.getLong(ROCKSDB_RATE_REFILL_PERIOD_MICROS,
                            DEFAULT_REFILL_PERIOD_MICROS);
                    int fairness = conf.getInt(ROCKSDB_RATE_FAIRNESS,
                            DEFAULT_FAIRNESS);
                    RateLimiterMode rateLimiterMode = RateLimiterMode.getRateLimiterMode(
                            conf.getByte(ROCKSDB_RATELIMITERMODE, DEFAULT_MODE.getValue()));
                    final boolean autoTune = true;
                    RateLimiter rateLimiter = new RateLimiter(rateBytesPerSecond, refillPeriodMicros, fairness, rateLimiterMode, autoTune);
                    options.setRateLimiter(rateLimiter);
                }

                options.setIncreaseParallelism(increaseParallelism);
                options.setMaxTotalWalSize(maxTotalWalSize);
                options.setMaxOpenFiles(maxOpenFiles);
                options.setTargetFileSizeBase(sstSizeMB * 1024 * 1024);
                options.setDeleteObsoleteFilesPeriodMicros(deleteObsoleteFilesPeriodMicros);

                final Cache cache = new LRUCache(blockCacheSize);
                BlockBasedTableConfig tableOptions = new BlockBasedTableConfig();
                tableOptions.setBlockSize(blockSize);
                tableOptions.setBlockCache(cache);
                tableOptions.setFormatVersion(formatVersion);
                tableOptions.setChecksumType(checksumType);
                if (bloomFilterBitsPerKey > 0) {
                    tableOptions.setFilterPolicy(new BloomFilter(bloomFilterBitsPerKey, false));
                }

                // Options best suited for HDDs
                tableOptions.setCacheIndexAndFilterBlocks(cacheIndexAndFilterBlocks);
                options.setLevelCompactionDynamicLevelBytes(levelCompactionDynamicLevelBytes);

                options.setTableFormatConfig(tableOptions);
            }

            // Configure file path
            String logPath = conf.getString(ROCKSDB_LOG_PATH, "");
            if (!logPath.isEmpty()) {
                Path logPathSetting = FileSystems.getDefault().getPath(logPath, subPath);
                Files.createDirectories(logPathSetting);
                log.info("RocksDB<{}> log path: {}", subPath, logPathSetting);
                options.setDbLogDir(logPathSetting.toString());
            }
            String path = FileSystems.getDefault().getPath(basePath, subPath).toFile().toString();

            // Configure log level
            String logLevel = conf.getString(ROCKSDB_LOG_LEVEL, "info");
            switch (logLevel) {
            case "debug":
                options.setInfoLogLevel(InfoLogLevel.DEBUG_LEVEL);
                break;
            case "info":
                options.setInfoLogLevel(InfoLogLevel.INFO_LEVEL);
                break;
            case "warn":
                options.setInfoLogLevel(InfoLogLevel.WARN_LEVEL);
                break;
            case "error":
                options.setInfoLogLevel(InfoLogLevel.ERROR_LEVEL);
                break;
            default:
                log.warn("Unrecognized RockDB log level: {}", logLevel);
            }

            int keepLogFileNum = conf.getInt(ROCKSDB_KEEP_LOG_FILE_NUM, 30);
            long logFileTimeToRoll = conf.getLong(ROCKSDB_LOG_FILE_TIME_TO_ROLL, TimeUnit.DAYS.toSeconds(1));
            // Keep log files for 1month
            options.setKeepLogFileNum(keepLogFileNum);
            options.setLogFileTimeToRoll(logFileTimeToRoll);

            try {
                if (readOnly) {
                    db = RocksDB.openReadOnly(options, path);
                } else {
                    db = RocksDB.open(options, path);
                }
            } catch (RocksDBException e) {
                throw new IOException("Error open RocksDB database", e);
            }
        }

        optionSync.setSync(true);
        optionDontSync.setSync(false);

        optionCache.setFillCache(true);
        optionDontCache.setFillCache(false);
        dbStatsParser = new RocksDBStatsParser(this.db);
    }

    @Override
    public void close() throws IOException {
        db.close();
        optionSync.close();
        optionDontSync.close();
        optionCache.close();
        optionDontCache.close();
        emptyBatch.close();
    }

    @Override
    public void put(byte[] key, byte[] value) throws IOException {
        try {
            db.put(optionDontSync, key, value);
        } catch (RocksDBException e) {
            throw new IOException("Error in RocksDB put", e);
        }
    }

    @Override
    public byte[] get(byte[] key) throws IOException {
        try {
            return db.get(key);
        } catch (RocksDBException e) {
            throw new IOException("Error in RocksDB get", e);
        }
    }

    @Override
    public int get(byte[] key, byte[] value) throws IOException {
        try {
            int res = db.get(key, value);
            if (res == RocksDB.NOT_FOUND) {
                return -1;
            } else if (res > value.length) {
                throw new IOException("Value array is too small to fit the result");
            } else {
                return res;
            }
        } catch (RocksDBException e) {
            throw new IOException("Error in RocksDB get", e);
        }
    }

    @Override
    public Entry<byte[], byte[]> getFloor(byte[] key) throws IOException {
        try (Slice upperBound = new Slice(key);
                 ReadOptions option = new ReadOptions(optionCache).setIterateUpperBound(upperBound);
                 RocksIterator iterator = db.newIterator(option)) {
            iterator.seekToLast();
            if (iterator.isValid()) {
                return new EntryWrapper(iterator.key(), iterator.value());
            }
        }
        return null;
    }

    @Override
    public Entry<byte[], byte[]> getCeil(byte[] key) throws IOException {
        try (RocksIterator iterator = db.newIterator(optionCache)) {
            // Position the iterator on the record whose key is >= to the supplied key
            iterator.seek(key);

            if (iterator.isValid()) {
                return new EntryWrapper(iterator.key(), iterator.value());
            } else {
                return null;
            }
        }
    }

    @Override
    public void delete(byte[] key) throws IOException {
        try {
            db.delete(optionDontSync, key);
        } catch (RocksDBException e) {
            throw new IOException("Error in RocksDB delete", e);
        }
    }

    @Override
    public void compact(byte[] firstKey, byte[] lastKey) throws IOException {
        try {
            db.compactRange(firstKey, lastKey);
        } catch (RocksDBException e) {
            throw new IOException("Error in RocksDB compact", e);
        }
    }

    @Override
    public void sync() throws IOException {
        try {
            db.write(optionSync, emptyBatch);
        } catch (RocksDBException e) {
            throw new IOException(e);
        }
    }

    @Override
    public CloseableIterator<byte[]> keys() {
        final RocksIterator iterator = db.newIterator(optionCache);
        iterator.seekToFirst();

        return new CloseableIterator<byte[]>() {
            @Override
            public boolean hasNext() {
                return iterator.isValid();
            }

            @Override
            public byte[] next() {
                checkState(iterator.isValid());
                byte[] key = iterator.key();
                iterator.next();
                return key;
            }

            @Override
            public void close() {
                iterator.close();
            }
        };
    }

    @Override
    public CloseableIterator<byte[]> keys(byte[] firstKey, byte[] lastKey) {
        final Slice upperBound = new Slice(lastKey);
        final ReadOptions option = new ReadOptions(optionCache).setIterateUpperBound(upperBound);
        final RocksIterator iterator = db.newIterator(option);
        iterator.seek(firstKey);

        return new CloseableIterator<byte[]>() {
            @Override
            public boolean hasNext() {
                return iterator.isValid();
            }

            @Override
            public byte[] next() {
                checkState(iterator.isValid());
                byte[] key = iterator.key();
                iterator.next();
                return key;
            }

            @Override
            public void close() {
                iterator.close();
                option.close();
                upperBound.close();
            }
        };
    }

    @Override
    public CloseableIterator<Entry<byte[], byte[]>> iterator() {
        final RocksIterator iterator = db.newIterator(optionDontCache);
        iterator.seekToFirst();
        final EntryWrapper entryWrapper = new EntryWrapper();

        return new CloseableIterator<Entry<byte[], byte[]>>() {
            @Override
            public boolean hasNext() {
                return iterator.isValid();
            }

            @Override
            public Entry<byte[], byte[]> next() {
                checkState(iterator.isValid());
                entryWrapper.key = iterator.key();
                entryWrapper.value = iterator.value();
                iterator.next();
                return entryWrapper;
            }

            @Override
            public void close() {
                iterator.close();
            }
        };
    }

    @Override
    public long count() throws IOException {
        try {
            return db.getLongProperty("rocksdb.estimate-num-keys");
        } catch (RocksDBException e) {
            throw new IOException("Error in getting records count", e);
        }
    }

    public Map<String, RocksDBStatsParser.RocksDBCompactionStats> compactMetric() {
        return dbStatsParser.parseDBMetric();
    }

    @Override
    public Batch newBatch() {
        return new RocksDBBatch();
    }

    private class RocksDBBatch implements Batch {
        private final WriteBatch writeBatch = new WriteBatch();

        @Override
        public void close() {
            writeBatch.close();
        }

        @Override
        public void put(byte[] key, byte[] value) throws IOException {
            try {
                writeBatch.put(key, value);
            } catch (RocksDBException e) {
                throw new IOException("Failed to flush RocksDB batch", e);
            }
        }

        @Override
        public void remove(byte[] key) throws IOException {
            try {
                writeBatch.delete(key);
            } catch (RocksDBException e) {
                throw new IOException("Failed to flush RocksDB batch", e);
            }
        }

        @Override
        public void clear() {
            writeBatch.clear();
        }

        @Override
        public void deleteRange(byte[] beginKey, byte[] endKey) throws IOException {
            try {
                writeBatch.deleteRange(beginKey, endKey);
            } catch (RocksDBException e) {
                throw new IOException("Failed to flush RocksDB batch", e);
            }
        }

        @Override
        public void flush() throws IOException {
            try {
                db.write(optionSync, writeBatch);
            } catch (RocksDBException e) {
                throw new IOException("Failed to flush RocksDB batch", e);
            }
        }
    }

    private static final class EntryWrapper implements Entry<byte[], byte[]> {
        // This is not final since the iterator will reuse the same EntryWrapper
        // instance at each step
        private byte[] key;
        private byte[] value;

        public EntryWrapper() {
            this.key = null;
            this.value = null;
        }

        public EntryWrapper(byte[] key, byte[] value) {
            this.key = key;
            this.value = value;
        }

        @Override
        public byte[] setValue(byte[] value) {
            throw new UnsupportedOperationException();
        }

        @Override
        public byte[] getValue() {
            return value;
        }

        @Override
        public byte[] getKey() {
            return key;
        }
    }

    private static final Logger log = LoggerFactory.getLogger(KeyValueStorageRocksDB.class);
}
