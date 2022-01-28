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
        }
    }
}