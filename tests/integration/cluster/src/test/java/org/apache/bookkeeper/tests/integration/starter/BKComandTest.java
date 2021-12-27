package org.apache.bookkeeper.tests.integration.starter;

import org.apache.bookkeeper.bookie.BookieShell;
import org.testng.annotations.Test;

public class BKComandTest {
    @Test
    public void recoverTest() {
//        String[] args = new String[]{"-conf", "/Users/lushiji-dd-mac/idea_projects/bookkeeper-commandUpdate/conf/local/bookkeeper_lc1.conf", "recover", "-d", "localhost:23181", "-f" ,"-skbs"};
//        String[] args = new String[]{"-conf", "/Users/lushiji-dd-mac/idea_projects/bookkeeper-commandUpdate/conf/local/bookkeeper_lc1.conf", "recover", "-d", "localhost:33181", "-f" ,"-skbs"};
        String[] args = new String[]{"-conf", "/Users/lushiji-dd-mac/idea_projects/bookkeeper-commandUpdate/conf/local/bookkeeper_lc1.conf", "recover", "-d", "localhost:43181", "-f" ,"-skbs"};
        try {
            BookieShell.doMain(args);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void decommissionbookieTest() {
        String[] args = new String[]{"-conf", "/Users/lushiji-dd-mac/idea_projects/bookkeeper-commandUpdate/conf/local/bookkeeper_lc1.conf", "decommissionbookie", "-bookieid", "localhost:23181"};
        try {
            BookieShell.doMain(args);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void readledgerTest() {
        int ledgerId = 0;
        String bookieID="localhost:63181";
        String[] args = new String[]{"-conf", "/Users/lushiji-dd-mac/idea_projects/bookkeeper-commandUpdate/conf/local/bookkeeper_lc1.conf", "readledger", "-bookie", "localhost:63181", "-msg", "-ledgerid", "0", "-firstentryid", "0", "-lastentryid", "1"};
        try {
            BookieShell.doMain(args);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void ledgermetadataTest() {
        String ledgerId = "0";
        String[] args = new String[]{"-conf", "/Users/lushiji-dd-mac/idea_projects/bookkeeper-commandUpdate/conf/local/bookkeeper_lc1.conf", "ledgermetadata", "-ledgerid", ledgerId};
        try {
            BookieShell.doMain(args);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
