package org.apache.bookkeeper.tests.integration.starter;

import org.apache.bookkeeper.client.AsyncCallback.OpenCallback;
import org.apache.bookkeeper.client.BookKeeper;
import org.apache.bookkeeper.client.LedgerEntry;
import org.apache.bookkeeper.client.LedgerHandle;
import org.apache.bookkeeper.conf.ClientConfiguration;
import org.junit.AfterClass;
import org.testng.annotations.Test;

import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.util.Enumeration;


public class BKClientLoadTest {
    static ClientConfiguration cc = null;
    static BookKeeper bkc = null;
    static LedgerHandle lh = null;
    static int numberOfEntries = 5;
    static int ensSize = 3, writeQuorumSize = 2, ackQuorumSize = 2;
    static byte[] ledgerPassword;
    static long ledgerId = 14; //lh.getId();
    OpenCallback opencb=null;

    public void initOpenCallback(){
        opencb = (rc, lh, ctx1) -> {
            System.out.println("test");
        };
    }

    @Test
    public void clientAddTest() throws Exception {
        try {
            // Create a client object for the local ensemble. This
            // operation throws multiple exceptions, so make sure to
            // use a try/catch block when instantiating client objects.
            String servers = "localhost:2181";
//            String servers = "10.179.45.65:2181,10.179.45.66:2181,10.179.45.67:2181/iot-bk";

            int timeout = 60 * 1000;
            cc = new ClientConfiguration().setMetadataServiceUri("zk+null://" + servers + "/ledgers");
            cc.setZkTimeout(timeout);
            cc.setAddEntryQuorumTimeout(timeout);

            bkc = new BookKeeper(cc);
            // A password for the new ledger
            ledgerPassword = "".getBytes(StandardCharsets.UTF_8); /* some sequence of bytes, perhaps random */
            lh = bkc.createLedger(ensSize, writeQuorumSize, ackQuorumSize, BookKeeper.DigestType.MAC, ledgerPassword);
            long ledgerId = lh.getId();
            // Add entries to the ledger, then close it
            for (int i = 0; i < numberOfEntries; i++) {
                long addEntry = lh.addEntry(("Some entry data" + i).getBytes(StandardCharsets.UTF_8));
                System.out.println("addEntry==" + addEntry);
            }
            lh.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void dataRecoveryLedgerTest() throws Exception {
        BookKeeper bkc2 = null;
        try {
            initOpenCallback();
            String servers = "localhost:2181";
////            String servers = "10.179.45.65:2181,10.179.45.66:2181,10.179.45.67:2181/iot-bk";
//
            int timeout = 600 * 1000;
            cc = new ClientConfiguration().setMetadataServiceUri("zk+null://" + servers + "/ledgers");
            cc.setZkTimeout(timeout);
            cc.setAddEntryTimeout(timeout);
            cc.setAddEntryQuorumTimeout(timeout);
            bkc = new BookKeeper(cc);
//            // A password for the new ledger
            ledgerPassword = "".getBytes(StandardCharsets.UTF_8); /* some sequence of bytes, perhaps random */
            lh = bkc.createLedger(ensSize, writeQuorumSize, ackQuorumSize, BookKeeper.DigestType.MAC, ledgerPassword);
            long ledgerId = lh.getId();
            for (int i = 0; i < numberOfEntries; i++) {
                long addEntry = lh.addEntry(("Some entry data" + i).getBytes(StandardCharsets.UTF_8));
                System.out.println("addEntry==" + addEntry);
            }

            ClientConfiguration cc2 = new ClientConfiguration().setMetadataServiceUri("zk+null://" + servers + "/ledgers");
            cc2.setZkTimeout(timeout);
            cc2.setAddEntryTimeout(timeout);
            cc2.setAddEntryQuorumTimeout(timeout);
            cc2.setReadEntryTimeout(timeout);
            Thread.sleep(5000);
            bkc2 = new BookKeeper(cc2);
//            long ledgerId =9;
            bkc2.asyncOpenLedger(ledgerId, BookKeeper.DigestType.MAC, ledgerPassword, opencb, null);
            Thread.sleep(100000000);

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            lh.close();
            bkc.close();
            if (bkc2!=null) {
                bkc2.close();
            }
        }
    }

    @Test
    public void noDataRecoveryLedgerTest() throws Exception {
        BookKeeper bkc2 = null;
        try {
            initOpenCallback();
            String servers = "localhost:2181";
////            String servers = "10.179.45.65:2181,10.179.45.66:2181,10.179.45.67:2181/iot-bk";
//
            int timeout = 600 * 1000;
            cc = new ClientConfiguration().setMetadataServiceUri("zk+null://" + servers + "/ledgers");
            cc.setZkTimeout(timeout);
            cc.setAddEntryTimeout(timeout);
            cc.setAddEntryQuorumTimeout(timeout);
            bkc = new BookKeeper(cc);
//            // A password for the new ledger
            ledgerPassword = "".getBytes(StandardCharsets.UTF_8); /* some sequence of bytes, perhaps random */
            lh = bkc.createLedger(ensSize, writeQuorumSize, ackQuorumSize, BookKeeper.DigestType.MAC, ledgerPassword);
            long ledgerId = lh.getId();
//            for (int i = 0; i < numberOfEntries; i++) {
//                long addEntry = lh.addEntry(("Some entry data" + i).getBytes(StandardCharsets.UTF_8));
//                System.out.println("addEntry==" + addEntry);
//            }

            ClientConfiguration cc2 = new ClientConfiguration().setMetadataServiceUri("zk+null://" + servers + "/ledgers");
            cc2.setZkTimeout(timeout);
            cc2.setAddEntryTimeout(timeout);
            cc2.setAddEntryQuorumTimeout(timeout);
            cc2.setReadEntryTimeout(timeout);
            Thread.sleep(5000);
            bkc2 = new BookKeeper(cc2);
//            long ledgerId =9;
            bkc2.asyncOpenLedger(ledgerId, BookKeeper.DigestType.MAC, ledgerPassword, opencb, null);
            Thread.sleep(100000000);

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            lh.close();
            bkc.close();
            if (bkc2!=null) {
                bkc2.close();
            }
        }
    }

    @Test
    public void clientReadTest() throws Exception {
        try {
            // Create a client object for the local ensemble. This
            // operation throws multiple exceptions, so make sure to
            // use a try/catch block when instantiating client objects.
            String servers = "localhost:2181";
            int timeout = 60 * 1000;
            cc = new ClientConfiguration().setMetadataServiceUri("zk+null://" + servers + "/ledgers");
            cc.setZkTimeout(timeout);
            cc.setReadEntryTimeout(timeout);

            bkc = new BookKeeper(cc);
            // A password for the new ledger
            ledgerPassword = "".getBytes(StandardCharsets.UTF_8); /* some sequence of bytes, perhaps random */
            // Open the ledger for reading
            lh = bkc.openLedger(ledgerId, BookKeeper.DigestType.MAC, ledgerPassword);
            // Read all available entries
            Enumeration<LedgerEntry> entries = lh.readEntries(0, numberOfEntries - 1);
            while (entries.hasMoreElements()) {
                ByteBuffer result = ByteBuffer.wrap(entries.nextElement().getEntry());
                Integer retrEntry = result.getInt();

                // Print the integer stored in each entry
                System.out.println(String.format("Result: %s", retrEntry));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @AfterClass
    public void close() throws Exception {
        // Close the ledger and the client
        if (lh != null) {
            lh.close();
        }
        if (bkc != null) {
            bkc.close();
        }
    }
}