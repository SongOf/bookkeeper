package org.apache.bookkeeper.bookie.storage.ldb;

import org.junit.Assert;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Map;

public class RocksDBStatsTest {
    private static Logger LOGGER = LoggerFactory.getLogger("BKRocksDBStatsTest");

    @Test
    public void report() {
        String restult =
                "** Compaction Stats [default] **\n" +
                        "Level    Files   Size     Score Read(GB)  Rn(GB) Rnp1(GB) Write(GB) Wnew(GB) Moved(GB) W-Amp Rd(MB/s) Wr(MB/s) Comp(sec) CompMergeCPU(sec) Comp(cnt) Avg(sec) KeyIn KeyDrop\n" +
                        "----------------------------------------------------------------------------------------------------------------------------------------------------------------------------\n" +
                        "  L0      1/0   11.55 MB   0.2      0.0     0.0      0.0       0.3      0.3       0.0   1.0      0.0      2.6    140.03             31.25        37    3.785       0      0\n" +
                        "  L4      2/0   152.54 MB   0.9      1.1     0.3      0.8       1.1      0.3       0.0   3.4      2.4      2.4    472.87            144.95         8   59.109    149M   187K\n" +
                        "  L5      6/0   323.75 MB   0.9      0.4     0.2      0.2       0.4      0.2       0.2   2.0      2.8      2.8    137.28             42.56         9   15.254     45M    33K\n" +
                        "  L6     65/0    4.61 GB   0.0      4.1     0.3      3.7       3.5     -0.2       0.0  11.0      3.1      2.7   1352.33            443.33         9  150.259    559M    68M\n" +
                        " Sum     74/0    5.09 GB   0.0      5.5     0.8      4.7       5.4      0.7       0.2  15.4      2.7      2.6   2102.51            662.08        63   33.373    754M    68M\n" +
                        " Int      0/0    0.00 KB   0.0      0.0     0.0      0.0       0.0      0.0       0.0   1.0      0.0      2.9      3.95              0.97         1    3.948       0      0\n" +
                        "\n" +
                        "** Compaction Stats [default] **\n" +
                        "Priority    Files   Size     Score Read(GB)  Rn(GB) Rnp1(GB) Write(GB) Wnew(GB) Moved(GB) W-Amp Rd(MB/s) Wr(MB/s) Comp(sec) CompMergeCPU(sec) Comp(cnt) Avg(sec) KeyIn KeyDrop\n" +
                        "-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------\n" +
                        " Low      0/0    0.00 KB   0.0      5.5     0.8      4.7       5.0      0.3       0.0   0.0      2.9      2.6   1962.48            630.83        26   75.480    754M    68M\n" +
                        "High      0/0    0.00 KB   0.0      0.0     0.0      0.0       0.3      0.3       0.0   0.0      0.0      2.6    140.01             31.25        36    3.889       0      0\n" +
                        "User      0/0    0.00 KB   0.0      0.0     0.0      0.0       0.0      0.0       0.0   0.0      0.0      8.0      0.01              0.00         1    0.014       0      0\n" +
                        "Uptime(secs): 25330.5 total, 127.2 interval\n" +
                        "Flush(GB): cumulative 0.349, interval 0.011\n" +
                        "AddFile(GB): cumulative 0.000, interval 0.000\n" +
                        "AddFile(Total Files): cumulative 0, interval 0\n" +
                        "AddFile(L0 Files): cumulative 0, interval 0\n" +
                        "AddFile(Keys): cumulative 0, interval 0\n" +
                        "Cumulative compaction: 5.36 GB write, 0.22 MB/s write, 5.52 GB read, 0.22 MB/s read, 2102.5 seconds\n" +
                        "Interval compaction: 0.01 GB write, 0.09 MB/s write, 0.00 GB read, 0.00 MB/s read, 3.9 seconds\n" +
                        "Stalls(count): 0 level0_slowdown, 0 level0_slowdown_with_compaction, 0 level0_numfiles, 0 level0_numfiles_with_compaction, 0 stop for pending_compaction_bytes, 0 slowdown for pending_compaction_bytes, 0 memtable_compaction, 0 memtable_slowdown, interval 0 total count\n" +
                        "\n" +
                        "** File Read Latency Histogram By Level [default] **\n" +
                        "\n" +
                        "** DB Stats **\n" +
                        "Uptime(secs): 25330.5 total, 127.2 interval\n" +
                        "Cumulative writes: 47M writes, 47M keys, 47M commit groups, 1.0 writes per commit group, ingest: 1.35 GB, 0.05 MB/s\n" +
                        "Cumulative WAL: 47M writes, 0 syncs, 47408747.00 writes per sync, written: 1.35 GB, 0.05 MB/s\n" +
                        "Cumulative stall: 00:00:0.000 H:M:S, 0.0 percent\n" +
                        "Interval writes: 2049K writes, 2049K keys, 1966K commit groups, 1.0 writes per commit group, ingest: 58.82 MB, 0.46 MB/s\n" +
                        "Interval WAL: 2049K writes, 0 syncs, 2049345.00 writes per sync, written: 0.06 MB, 0.46 MB/s\n" +
                        "Interval stall: 00:00:0.000 H:M:S, 0.0 percent";

        RocksDBStatsParser parser = new RocksDBStatsParser();
        Map<String, RocksDBStatsParser.RocksDBCompactionStats> stats = parser.parseDBMetric(restult);
        Assert.assertEquals("level not right", stats.get("L0").getLevel(), "L0");
        Assert.assertEquals("compactSumCnt not right", stats.get("L0").getCompactSumCnt(), 37, 0);
        Assert.assertEquals("compactSumSec not right", stats.get("L0").getCompactSumSec(), 140.03, 2);

        Assert.assertEquals("formatStr2byteUnit not right", parser.formatStr2byteUnit("11.55"), 11.55, 2);

        Assert.assertEquals("formatStr2byteUnit not right", parser.formatStr2byteUnit("11.55 KB"), 11.55 * 1024, 2);
        Assert.assertEquals("formatStr2byteUnit not right", parser.formatStr2byteUnit("11.55 K"), 11.55 * 1024, 2);
        Assert.assertEquals("formatStr2byteUnit not right", parser.formatStr2byteUnit("11.55 MB"), 11.55 * 1024 * 1024, 2);
        Assert.assertEquals("formatStr2byteUnit not right", parser.formatStr2byteUnit("11.55 M"), 11.55 * 1024 * 1024, 2);
        Assert.assertEquals("formatStr2byteUnit not right", parser.formatStr2byteUnit("11.55 GB"), 11.55 * 1024 * 1024 * 1024, 2);
        Assert.assertEquals("formatStr2byteUnit not right", parser.formatStr2byteUnit("11.55 G"), 11.55 * 1024 * 1024 * 1024, 2);

        Assert.assertEquals("formatStr2byteUnit not right", parser.formatStr2byteUnit("11.55KB"), 11.55 * 1024, 2);
        Assert.assertEquals("formatStr2byteUnit not right", parser.formatStr2byteUnit("11.55K"), 11.55 * 1024, 2);
        Assert.assertEquals("formatStr2byteUnit not right", parser.formatStr2byteUnit("11.55MB"), 11.55 * 1024 * 1024, 2);
        Assert.assertEquals("formatStr2byteUnit not right", parser.formatStr2byteUnit("11.55M"), 11.55 * 1024 * 1024, 2);
        Assert.assertEquals("formatStr2byteUnit not right", parser.formatStr2byteUnit("11.55GB"), 11.55 * 1024 * 1024 * 1024, 2);
        Assert.assertEquals("formatStr2byteUnit not right", parser.formatStr2byteUnit("11.55G"), 11.55 * 1024 * 1024 * 1024, 2);
    }
}