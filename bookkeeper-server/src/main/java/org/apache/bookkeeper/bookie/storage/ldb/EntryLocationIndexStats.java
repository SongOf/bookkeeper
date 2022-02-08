/*
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
 */

package org.apache.bookkeeper.bookie.storage.ldb;

import static org.apache.bookkeeper.bookie.BookKeeperServerStats.BOOKIE_SCOPE;
import static org.apache.bookkeeper.bookie.BookKeeperServerStats.CATEGORY_SERVER;
import static org.apache.bookkeeper.bookie.storage.ldb.RocksDBStatsParser.DB_DEFAULT_LEVELS;

import java.util.Map;
import java.util.function.Supplier;
import lombok.Getter;
import org.apache.bookkeeper.stats.Gauge;
import org.apache.bookkeeper.stats.StatsLogger;
import org.apache.bookkeeper.stats.annotations.StatsDoc;

/**
 * A umbrella class for ledger metadata index stats.
 */
@StatsDoc(
        name = BOOKIE_SCOPE,
        category = CATEGORY_SERVER,
        help = "Entry location index stats"
)
@Getter
class EntryLocationIndexStats {

    private static final String ENTRIES_COUNT = "entries-count";
    private static final String DB_COMPACT_FILES_COUNT = "db_compact_files_count";
    private static final String DB_COMPACT_FILES_COMPACTING_COUNT = "db_compact_files_compacting_count";
    private static final String DB_COMPACT_SUM_COUNT = "db_compact_sum_count";
    private static final String DB_COMPACT_SUM_SECOND = "db_compact_sum_second";
    private static final String DB_COMPACT_SIZE = "db_compact_size";
    private static final String DB_COMPACT_SCORE_BY_CUR_MAX_SIZE = "db_compact_score_by_cur_max_size";
    private static final String DB_COMPACT_READ_GBYTES = "db_compact_read_gbytes";
    private static final String DB_COMPACT_READ_FROM_LEVEL_N_GBYTES = "db_compact_read_from_level_n_gbytes";
    private static final String DB_COMPACT_READ_FROM_LEVEL_NP1_GBYTES = "db_compact_read_from_level_np1_gbytes";
    private static final String DB_COMPACT_WRITE_GBYTES = "db_compact_write_gbytes";
    private static final String DB_COMPACT_WRITE_NEW_GBYTES = "db_compact_write_new_gbytes";
    private static final String DB_COMPACT_MOVED_GBYTES = "db_compact_moved_gbytes";
    private static final String DB_COMPACT_WRITE_AMP_BY_WRITE_READ = "db_compact_write_amp_by_write_read";
    private static final String DB_COMPACT_READ_MBYTES_PER_SEC = "db_compact_read_mbytes_per_sec";
    private static final String DB_COMPACT_WRITE_MBYTES_PER_SEC = "db_compact_write_mbytes_per_sec";
    private static final String DB_COMPACT_MERGE_CPU_SEC = "db_compact_merge_cpu_sec";
    private static final String DB_COMPACT_AVG_SEC = "db_compact_avg_sec";
    private static final String DB_COMPACT_KEY_IN_RECORD_NUMS = "db_compact_key_in_record_nums";
    private static final String DB_COMPACT_KEY_DROP_RECORD_NUMS = "db_compact_key_drop_record_nums";

    @StatsDoc(
            name = ENTRIES_COUNT,
            help = "Current number of entries"
    )
    private final Gauge<Long> entriesCountGauge;

    @StatsDoc(
            name = DB_COMPACT_FILES_COUNT,
            help = "rocksdb compact files count"
    )
    private Gauge<Long> filesCntGauge;

    @StatsDoc(
            name = DB_COMPACT_FILES_COMPACTING_COUNT,
            help = "rocksdb compact files compacting count"
    )
    private Gauge<Long> filesCompactCntGauge;

    @StatsDoc(
            name = DB_COMPACT_SUM_COUNT,
            help = "rocksdb compact sum count"
    )
    private Gauge<Double> compactSumCntGauge;

    @StatsDoc(
            name = DB_COMPACT_SUM_SECOND,
            help = "rocksdb compact sum second"
    )
    private Gauge<Double> compactSumSecGauge;

    @StatsDoc(
            name = DB_COMPACT_SIZE,
            help = "rocksdb compact size"
    )
    private Gauge<Double> compactSizeGauge;

    @StatsDoc(
            name = DB_COMPACT_SCORE_BY_CUR_MAX_SIZE,
            help = "rocksdb compact score by current level divide to max level size"
    )
    private Gauge<Double> compactScoreByCurMaxSizeGauge;

    @StatsDoc(
            name = DB_COMPACT_READ_GBYTES,
            help = "rocksdb compact read gbytes"
    )
    private Gauge<Double> compactReadGBytesGauge;

    @StatsDoc(
            name = DB_COMPACT_READ_FROM_LEVEL_N_GBYTES,
            help = "rocksdb compact read fromclevel N GBytes"
    )
    private Gauge<Double> compactReadFromLevelNGBytesGauge;

    @StatsDoc(
            name = DB_COMPACT_READ_FROM_LEVEL_NP1_GBYTES,
            help = "rocksdb compact read from level N+1 GBytes"
    )
    private Gauge<Double> compactReadFromLevelNp1GBytesGauge;

    @StatsDoc(
            name = DB_COMPACT_WRITE_GBYTES,
            help = "rocksdb compact write GBytes"
    )
    private Gauge<Double> compactWriteGBytesGauge;

    @StatsDoc(
            name = DB_COMPACT_WRITE_NEW_GBYTES,
            help = "rocksdb compact write_new_gbytes"
    )
    private Gauge<Double> compactWriteNewGBytesGauge;

    @StatsDoc(
            name = DB_COMPACT_MOVED_GBYTES,
            help = "rocksdb compact moved GBytes"
    )
    private Gauge<Double> compactMovedGBytesGauge;

    @StatsDoc(
            name = DB_COMPACT_WRITE_AMP_BY_WRITE_READ,
            help = "rocksdb compact write amp by write bytes divide to read bytes"
    )
    private Gauge<Double> compactWriteAmpByWriteReadGauge;

    @StatsDoc(
            name = DB_COMPACT_READ_MBYTES_PER_SEC,
            help = "rocksdb compact read MBytes per Second"
    )
    private Gauge<Double> compactReadMBytesPerSecGauge;

    @StatsDoc(
            name = DB_COMPACT_WRITE_MBYTES_PER_SEC,
            help = "rocksdb compact write MBytes per Second"
    )
    private Gauge<Double> compactWriteMBytesPerSecGauge;

    @StatsDoc(
            name = DB_COMPACT_MERGE_CPU_SEC,
            help = "rocksdb compact merge cpu sec"
    )
    private Gauge<Double> compactMergeCpuSecGauge;

    @StatsDoc(
            name = DB_COMPACT_AVG_SEC,
            help = "rocksdb compact average second"
    )
    private Gauge<Double> compactAvgSecGauge;

    @StatsDoc(
            name = DB_COMPACT_KEY_IN_RECORD_NUMS,
            help = "rocksdb compact key in record nums"
    )
    private Gauge<Double> compactKeyInRecordNumsGauge;

    @StatsDoc(
            name = DB_COMPACT_KEY_DROP_RECORD_NUMS,
            help = "rocksdb compact key drop record nums"
    )
    private Gauge<Double> compactKeyDropRecordNumsGauge;

    EntryLocationIndexStats(StatsLogger statsLogger,
                            Supplier<Long> entriesCountSupplier) {
        entriesCountGauge = new Gauge<Long>() {
            @Override
            public Long getDefaultValue() {
                return 0L;
            }

            @Override
            public Long getSample() {
                return entriesCountSupplier.get();
            }
        };
        statsLogger.registerGauge(ENTRIES_COUNT, entriesCountGauge);
    }

    EntryLocationIndexStats(StatsLogger statsLogger,
                            Supplier<Long> entriesCountSupplier,
                            Supplier<Map<String, RocksDBStatsParser.RocksDBCompactionStats>> compactSupplier) {
        entriesCountGauge = new Gauge<Long>() {
            @Override
            public Long getDefaultValue() {
                return 0L;
            }

            @Override
            public Long getSample() {
                return entriesCountSupplier.get();
            }
        };
        statsLogger.registerGauge(ENTRIES_COUNT, entriesCountGauge);

        for (String level : DB_DEFAULT_LEVELS) {
            filesCntGauge = new Gauge<Long>() {
                @Override
                public Long getDefaultValue() {
                    return 0L;
                }

                @Override
                public Long getSample() {
                    return compactSupplier.get().get(level).getFilesCnt();
                }
            };
            statsLogger.registerGauge(DB_COMPACT_FILES_COUNT + "_" + level, filesCntGauge);

            filesCompactCntGauge = new Gauge<Long>() {
                @Override
                public Long getDefaultValue() {
                    return 0L;
                }

                @Override
                public Long getSample() {
                    return compactSupplier.get().get(level).getFilesCompactCnt();
                }
            };
            statsLogger.registerGauge(DB_COMPACT_FILES_COMPACTING_COUNT + "_" + level, filesCompactCntGauge);

            compactSumCntGauge = new Gauge<Double>() {
                @Override
                public Double getDefaultValue() {
                    return 0D;
                }

                @Override
                public Double getSample() {
                    return compactSupplier.get().get(level).getCompactSumCnt();
                }
            };
            statsLogger.registerGauge(DB_COMPACT_SUM_COUNT + "_" + level, compactSumCntGauge);

            compactSumSecGauge = new Gauge<Double>() {
                @Override
                public Double getDefaultValue() {
                    return 0D;
                }

                @Override
                public Double getSample() {
                    return compactSupplier.get().get(level).getCompactSumSec();
                }
            };
            statsLogger.registerGauge(DB_COMPACT_SUM_SECOND + "_" + level, compactSumSecGauge);

            compactSizeGauge = new Gauge<Double>() {
                @Override
                public Double getDefaultValue() {
                    return 0D;
                }

                @Override
                public Double getSample() {
                    return compactSupplier.get().get(level).getSize();
                }
            };
            statsLogger.registerGauge(DB_COMPACT_SIZE + "_" + level, compactSizeGauge);

            compactScoreByCurMaxSizeGauge = new Gauge<Double>() {
                @Override
                public Double getDefaultValue() {
                    return 0D;
                }

                @Override
                public Double getSample() {
                    return compactSupplier.get().get(level).getScore();
                }
            };
            statsLogger.registerGauge(DB_COMPACT_SCORE_BY_CUR_MAX_SIZE + "_" + level,
                    compactScoreByCurMaxSizeGauge);

            compactReadGBytesGauge = new Gauge<Double>() {
                @Override
                public Double getDefaultValue() {
                    return 0D;
                }

                @Override
                public Double getSample() {
                    return compactSupplier.get().get(level).getReadGB();
                }
            };
            statsLogger.registerGauge(DB_COMPACT_READ_GBYTES + "_" + level, compactReadGBytesGauge);

            compactReadFromLevelNGBytesGauge = new Gauge<Double>() {
                @Override
                public Double getDefaultValue() {
                    return 0D;
                }

                @Override
                public Double getSample() {
                    return compactSupplier.get().get(level).getRnGB();
                }
            };
            statsLogger.registerGauge(DB_COMPACT_READ_FROM_LEVEL_N_GBYTES + "_" + level,
                    compactReadFromLevelNGBytesGauge);

            compactReadFromLevelNp1GBytesGauge = new Gauge<Double>() {
                @Override
                public Double getDefaultValue() {
                    return 0D;
                }

                @Override
                public Double getSample() {
                    return compactSupplier.get().get(level).getRnp1GB();
                }
            };
            statsLogger.registerGauge(DB_COMPACT_READ_FROM_LEVEL_NP1_GBYTES + "_" + level,
                    compactReadFromLevelNp1GBytesGauge);

            compactWriteGBytesGauge = new Gauge<Double>() {
                @Override
                public Double getDefaultValue() {
                    return 0D;
                }

                @Override
                public Double getSample() {
                    return compactSupplier.get().get(level).getWriteGB();
                }
            };
            statsLogger.registerGauge(DB_COMPACT_WRITE_GBYTES + "_" + level, compactWriteGBytesGauge);

            compactWriteNewGBytesGauge = new Gauge<Double>() {
                @Override
                public Double getDefaultValue() {
                    return 0D;
                }

                @Override
                public Double getSample() {
                    return compactSupplier.get().get(level).getWnewGB();
                }
            };
            statsLogger.registerGauge(DB_COMPACT_WRITE_NEW_GBYTES + "_" + level, compactWriteNewGBytesGauge);

            compactMovedGBytesGauge = new Gauge<Double>() {
                @Override
                public Double getDefaultValue() {
                    return 0D;
                }

                @Override
                public Double getSample() {
                    return compactSupplier.get().get(level).getMovedGB();
                }
            };
            statsLogger.registerGauge(DB_COMPACT_MOVED_GBYTES + "_" + level, compactMovedGBytesGauge);

            compactWriteAmpByWriteReadGauge = new Gauge<Double>() {
                @Override
                public Double getDefaultValue() {
                    return 0D;
                }

                @Override
                public Double getSample() {
                    return compactSupplier.get().get(level).getwAmp();
                }
            };
            statsLogger.registerGauge(DB_COMPACT_WRITE_AMP_BY_WRITE_READ + "_" + level,
                    compactWriteAmpByWriteReadGauge);

            compactReadMBytesPerSecGauge = new Gauge<Double>() {
                @Override
                public Double getDefaultValue() {
                    return 0D;
                }

                @Override
                public Double getSample() {
                    return compactSupplier.get().get(level).getRdMBPerSec();
                }
            };
            statsLogger.registerGauge(DB_COMPACT_READ_MBYTES_PER_SEC + "_" + level, compactReadMBytesPerSecGauge);

            compactWriteMBytesPerSecGauge = new Gauge<Double>() {
                @Override
                public Double getDefaultValue() {
                    return 0D;
                }

                @Override
                public Double getSample() {
                    return compactSupplier.get().get(level).getWrMBPerSec();
                }
            };
            statsLogger.registerGauge(DB_COMPACT_WRITE_MBYTES_PER_SEC + "_" + level,
                    compactWriteMBytesPerSecGauge);

            compactMergeCpuSecGauge = new Gauge<Double>() {
                @Override
                public Double getDefaultValue() {
                    return 0D;
                }

                @Override
                public Double getSample() {
                    return compactSupplier.get().get(level).getCompactMergeCPUSec();
                }
            };
            statsLogger.registerGauge(DB_COMPACT_MERGE_CPU_SEC + "_" + level, compactMergeCpuSecGauge);

            compactAvgSecGauge = new Gauge<Double>() {
                @Override
                public Double getDefaultValue() {
                    return 0D;
                }

                @Override
                public Double getSample() {
                    return compactSupplier.get().get(level).getCompactAvgSec();
                }
            };
            statsLogger.registerGauge(DB_COMPACT_AVG_SEC + "_" + level, compactAvgSecGauge);

            compactKeyInRecordNumsGauge = new Gauge<Double>() {
                @Override
                public Double getDefaultValue() {
                    return 0D;
                }

                @Override
                public Double getSample() {
                    return compactSupplier.get().get(level).getKeyIn();
                }
            };
            statsLogger.registerGauge(DB_COMPACT_KEY_IN_RECORD_NUMS + "_" + level, compactKeyInRecordNumsGauge);

            compactKeyDropRecordNumsGauge = new Gauge<Double>() {
                @Override
                public Double getDefaultValue() {
                    return 0D;
                }

                @Override
                public Double getSample() {
                    return compactSupplier.get().get(level).getKeyDrop();
                }
            };
            statsLogger.registerGauge(DB_COMPACT_KEY_DROP_RECORD_NUMS + "_" + level,
                    compactKeyDropRecordNumsGauge);
        }
    }
}