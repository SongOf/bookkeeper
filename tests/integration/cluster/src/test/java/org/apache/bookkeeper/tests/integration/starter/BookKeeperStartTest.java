package org.apache.bookkeeper.tests.integration.starter;

import lombok.extern.slf4j.Slf4j;
import org.apache.bookkeeper.server.Main;
import org.apache.bookkeeper.shims.zk.ZooKeeperServerShim;
import org.apache.bookkeeper.stream.cluster.StandaloneStarter;
import org.apache.bookkeeper.util.IOUtils;
import org.apache.bookkeeper.util.LocalBookKeeper;
import org.junit.Test;

import java.io.File;
import java.io.IOException;

/**
 * Created by lushiji@didichuxing.com on 2021/11/04.
 * bk 所有启动方式集合
 */
@Slf4j
public class BookKeeperStartTest {

    public final static String BK_HOME = "/Users/lushiji-dd-mac/idea_projects/pulsar_all/bookkeeper";

    @Test
    public void testLocal() {
        /**
         * org.apache.bookkeeper.util.LocalBookKeeper 好多依赖的dependency的scope都为test，此类方便本地调试使用
         */
        String[] args = new String[]{"1", BK_HOME + "/conf/bookkeeper_lc.conf"};
        LocalBookKeeper.main(args);
    }

    @Test
    public void testStandalone() throws Exception {
        String[] args = new String[]{"--conf", BK_HOME + "/conf/standalone.conf"};
        StandaloneStarter.main(args);
    }

    private ZooKeeperServerShim zks = null;

    public void startZK() {
        try {
            String dirSuffix = "test";
            int zkPort = 2181;
            File zkTmpDir = null;
            File zkDataDirFile = null;
            zkTmpDir = IOUtils.createTempDir("zookeeper", dirSuffix, zkDataDirFile);
            zkTmpDir.deleteOnExit();
            zks = LocalBookKeeper.runZookeeper(1000, zkPort, zkTmpDir);
        } catch (IOException e) {
            log.error("startZK has error.", e);
        }
    }

    public void stopZK() {
        if (null != zks) {
            zks.stop();
        }
    }

    @Test
    public void testMultiCluster2() throws Exception {
        String[] args2 = new String[]{"--conf", BK_HOME + "/conf/local/bookkeeper_lc2.conf", "-bh", "localhost"};
        Main.main(args2);
        System.out.println("bk2 started...");
    }

    @Test
    public void testMultiCluster3() throws Exception {

        String[] args3 = new String[]{"--conf", BK_HOME + "/conf/local/bookkeeper_lc3.conf", "-bh", "localhost"};
        Main.main(args3);
        System.out.println("bk3 started...");
    }

    @Test
    public void testMultiCluster4() throws Exception {

        String[] args4 = new String[]{"--conf", BK_HOME + "/conf/local/bookkeeper_lc4.conf", "-bh", "localhost"};
        Main.main(args4);
        System.out.println("bk4 started...");
    }

    @Test
    public void testMultiCluster5() throws Exception {

        String[] args5 = new String[]{"--conf", BK_HOME + "/conf/local/bookkeeper_lc5.conf", "-bh", "localhost"};
        Main.main(args5);
        System.out.println("bk5 started...");
    }

    @Test
    public void testMultiCluster6() throws Exception {

        String[] args6 = new String[]{"--conf", BK_HOME + "/conf/local/bookkeeper_lc6.conf", "-bh", "localhost"};
        Main.main(args6);
        System.out.println("bk6 started...");
    }

    @Test
    public void testCluster() throws Exception {
//        startZK();
        String[] args = new String[]{"--conf", BK_HOME + "/conf/local/bookkeeper_lc1.conf", "-bh", "localhost"};
        Main.main(args);
//        stopZK();
    }

    @Test
    public void testMainHelp() throws Exception {
        String[] args = new String[]{"--help"};
        Main.main(args);
    }
}
