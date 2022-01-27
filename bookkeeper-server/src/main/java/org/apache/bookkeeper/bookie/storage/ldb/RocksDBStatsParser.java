package org.apache.bookkeeper.bookie.storage.ldb;


import com.google.common.collect.Lists;
import org.rocksdb.RocksDB;
import org.rocksdb.RocksDBException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RocksDBStatsParser {
    private static final Logger log = LoggerFactory.getLogger(RocksDBStatsParser.class);
    private final Pattern levelStatsPattern = Pattern.compile("^L[0-9_].*");
    private final Pattern userPriorityStatsPattern = Pattern.compile("User.*");
    private final RocksDB db;

    public RocksDBStatsParser() {
        this.db = null;
    }

    public RocksDBStatsParser(RocksDB rocksdb) {
        this.db = rocksdb;
    }

    public List<RocksDBCompactionStats> parseDBMetric() {
        try {
            String rocksdbStats = this.db.getProperty("rocksdb.stats");
            log.debug("rocksdbStats: {}", rocksdbStats);
            return parseDBMetric(rocksdbStats);
        } catch (RocksDBException e) {
            log.error("get rocksdb.stats failed.", e);
            return Lists.newArrayList();
        }
    }

    public List<RocksDBCompactionStats> parseDBMetric(String rocksdbStats) {
        List<RocksDBCompactionStats> levelStatsList = Lists.newArrayList();
        try {
            String[] rocksdbStatsSplit = rocksdbStats.split("\n");
            for (String rocksdbOneLineData : rocksdbStatsSplit) {
                rocksdbOneLineData = convertData2Standard(rocksdbOneLineData);
                Matcher levelStatMatcher = levelStatsPattern.matcher(rocksdbOneLineData);
                while (levelStatMatcher.find()) {
                    String levelStat = levelStatMatcher.group();
                    levelStatsList.add(string2Bean(levelStat));
                }
                Matcher userPriorityStatMatcher = userPriorityStatsPattern.matcher(rocksdbOneLineData);
                if (userPriorityStatMatcher.find()) {
                    String levelStat = userPriorityStatMatcher.group();
                    levelStatsList.add(string2Bean(levelStat));
                }
            }
        } catch (Exception e) {
            log.error("parse DB metric failed.", e);
        }
        return levelStatsList;
    }

    private String convertData2Standard(String data) {
        data = data.replace("\"", "");
        List<String> sizeUnits = Lists.newArrayList("KB", "MB", "GB", "TB");
        for (String unit : sizeUnits) {
            data = data.replaceAll("\\s+" + unit, unit);
        }
        data = data.trim();
        return data;
    }

    private RocksDBCompactionStats string2Bean(String levelStats) {
        RocksDBCompactionStats stats = new RocksDBCompactionStats();
        String[] rocksdbStatSplit = levelStats.split("\\s+");
        stats.setLevel(rocksdbStatSplit[0]);
        stats.setFilesCnt(Integer.parseInt(rocksdbStatSplit[1].split("/")[0]));
        stats.setFilesCompactCnt(Integer.parseInt(rocksdbStatSplit[1].split("/")[1]));
        stats.setSize(rocksdbStatSplit[2]);
        stats.setScore(Double.valueOf(rocksdbStatSplit[3]));
        stats.setReadGB(Double.valueOf(rocksdbStatSplit[4]));
        stats.setRnGB(Double.valueOf(rocksdbStatSplit[5]));
        stats.setRnp1GB(Double.valueOf(rocksdbStatSplit[6]));
        stats.setWriteGB(Double.valueOf(rocksdbStatSplit[7]));
        stats.setWnewGB(Double.valueOf(rocksdbStatSplit[8]));
        stats.setMovedGB(Double.valueOf(rocksdbStatSplit[9]));
        stats.setwAmp(Double.valueOf(rocksdbStatSplit[10]));
        stats.setRdMBPerSec(Double.valueOf(rocksdbStatSplit[11]));
        stats.setWrMBPerSec(Double.valueOf(rocksdbStatSplit[12]));
        stats.setCompactSumSec(Double.valueOf(rocksdbStatSplit[13]));
        stats.setCompactMergeCPUSec(Double.valueOf(rocksdbStatSplit[14]));
        stats.setCompactSumCnt(Double.valueOf(rocksdbStatSplit[15]));
        stats.setCompactAvgSec(Double.valueOf(rocksdbStatSplit[16]));
        stats.setKeyIn(rocksdbStatSplit[17]);
        stats.setKeyDrop(rocksdbStatSplit[18]);
        return stats;
    }

    public class RocksDBCompactionStats {
        private String level;
        private long filesCnt;
        private long filesCompactCnt;
        private String size;
        private double score;
        private double readGB;
        private double rnGB;
        private double rnp1GB;
        private double writeGB;
        private double wnewGB;
        private double movedGB;
        private double wAmp;
        private double rdMBPerSec;
        private double wrMBPerSec;
        private double compactSumSec;
        private double compactMergeCPUSec;
        private double compactSumCnt;
        private double compactAvgSec;
        private String keyIn;
        private String keyDrop;

        public String getLevel() {
            return level;
        }

        public void setLevel(String level) {
            this.level = level;
        }

        public long getFilesCnt() {
            return filesCnt;
        }

        public void setFilesCnt(long filesCnt) {
            this.filesCnt = filesCnt;
        }

        public long getFilesCompactCnt() {
            return filesCompactCnt;
        }

        public void setFilesCompactCnt(long filesCompactCnt) {
            this.filesCompactCnt = filesCompactCnt;
        }

        public String getSize() {
            return size;
        }

        public void setSize(String size) {
            this.size = size;
        }

        public double getScore() {
            return score;
        }

        public void setScore(double score) {
            this.score = score;
        }

        public double getReadGB() {
            return readGB;
        }

        public void setReadGB(double readGB) {
            this.readGB = readGB;
        }

        public double getRnGB() {
            return rnGB;
        }

        public void setRnGB(double rnGB) {
            this.rnGB = rnGB;
        }

        public double getRnp1GB() {
            return rnp1GB;
        }

        public void setRnp1GB(double rnp1GB) {
            this.rnp1GB = rnp1GB;
        }

        public double getWriteGB() {
            return writeGB;
        }

        public void setWriteGB(double writeGB) {
            this.writeGB = writeGB;
        }

        public double getWnewGB() {
            return wnewGB;
        }

        public void setWnewGB(double wnewGB) {
            this.wnewGB = wnewGB;
        }

        public double getMovedGB() {
            return movedGB;
        }

        public void setMovedGB(double movedGB) {
            this.movedGB = movedGB;
        }

        public double getwAmp() {
            return wAmp;
        }

        public void setwAmp(double wAmp) {
            this.wAmp = wAmp;
        }

        public double getRdMBPerSec() {
            return rdMBPerSec;
        }

        public void setRdMBPerSec(double rdMBPerSec) {
            this.rdMBPerSec = rdMBPerSec;
        }

        public double getWrMBPerSec() {
            return wrMBPerSec;
        }

        public void setWrMBPerSec(double wrMBPerSec) {
            this.wrMBPerSec = wrMBPerSec;
        }

        public double getCompactSumSec() {
            return compactSumSec;
        }

        public void setCompactSumSec(double compactSumSec) {
            this.compactSumSec = compactSumSec;
        }

        public double getCompactMergeCPUSec() {
            return compactMergeCPUSec;
        }

        public void setCompactMergeCPUSec(double compactMergeCPUSec) {
            this.compactMergeCPUSec = compactMergeCPUSec;
        }

        public double getCompactSumCnt() {
            return compactSumCnt;
        }

        public void setCompactSumCnt(double compactSumCnt) {
            this.compactSumCnt = compactSumCnt;
        }

        public double getCompactAvgSec() {
            return compactAvgSec;
        }

        public void setCompactAvgSec(double compactAvgSec) {
            this.compactAvgSec = compactAvgSec;
        }

        public String getKeyIn() {
            return keyIn;
        }

        public void setKeyIn(String keyIn) {
            this.keyIn = keyIn;
        }

        public String getKeyDrop() {
            return keyDrop;
        }

        public void setKeyDrop(String keyDrop) {
            this.keyDrop = keyDrop;
        }
    }
}
