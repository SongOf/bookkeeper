"use strict";(self.webpackChunksite_3=self.webpackChunksite_3||[]).push([[792],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return m}});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),d=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=d(e.components);return a.createElement(l.Provider,{value:t},e.children)},h="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),h=d(n),u=r,m=h["".concat(l,".").concat(u)]||h[u]||p[u]||o;return n?a.createElement(m,i(i({ref:t},c),{},{components:n})):a.createElement(m,i({ref:t},c))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=u;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[h]="string"==typeof e?e:r,i[1]=s;for(var d=2;d<o;d++)i[d]=n[d];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},67250:function(e,t,n){n.r(t),n.d(t,{contentTitle:function(){return i},default:function(){return h},frontMatter:function(){return o},metadata:function(){return s},toc:function(){return l}});var a=n(83117),r=(n(67294),n(3905));const o={},i="BP-62 New API for batched reads",s={type:"mdx",permalink:"/bps/BP-62-new-API-for-batched-reads",source:"@site/src/pages/bps/BP-62-new-API-for-batched-reads.md",title:"BP-62 New API for batched reads",description:"The BookKeeper client has provided an API [0] that allows for the efficient reading of entries [1] from bookies.",frontMatter:{}},l=[{value:"BookKeeper Client API",id:"bookkeeper-client-api",level:2},{value:"Wire protocol changes",id:"wire-protocol-changes",level:2},{value:"V2 Protocol",id:"v2-protocol",level:3},{value:"V3 Protocol",id:"v3-protocol",level:3},{value:"Loose constraints",id:"loose-constraints",level:2},{value:"Not supporting striped Ledger",id:"not-supporting-striped-ledger",level:2}],d={toc:l},c="wrapper";function h(e){let{components:t,...o}=e;return(0,r.kt)(c,(0,a.Z)({},d,o,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"bp-62-new-api-for-batched-reads"},"BP-62 New API for batched reads"),(0,r.kt)("h1",{id:"motivation"},"Motivation"),(0,r.kt)("p",null,"The BookKeeper client has provided an API ","[0]"," that allows for the efficient reading of entries ","[1]"," from bookies.\nWhile users can specify a start and end entry ID for a ledger ","[2]"," according to the API's definition,\nthe reality is that the bookie server can only read a single entry at a time. Consequently, the BookKeeper client is\nrequired to send a request for each entry to the bookies based on the user-specified start and end entry IDs.\nThis approach is highly inefficient and can result in significant CPU resource consumption, especially when reading a\nlarge number of entries. The frequent RPC calls to the bookies also put a heavy burden on the bookie server, which must\nprocess read requests from the IO thread and subsequently jump to the entry read thread pool.\n",(0,r.kt)("img",{alt:"single_read.png",src:n(67682).Z,width:"2000",height:"866"})),(0,r.kt)("p",null,"A more effective way to read entries is to use one RPC request to read multiple entries at once. This approach will\nsignificantly reduce the number of RPC calls, thread jumps, and enqueue and dequeue operations of the thread pool.\n",(0,r.kt)("img",{alt:"batch_read.png",src:n(15552).Z,width:"2000",height:"901"})),(0,r.kt)("p",null,"To demonstrate this point, I have conducted a simple benchmark test using the BookKeeper perf tool to compare batch\nand individual entry readings. The test case was repeated to read the data from the same ledger and to avoid the impact\nof disk performance on test results, the entries were read from the cache since the batch read protocol change would not\nintroduce any disk read improvements. The results show that using the batched entry read API provides a remarkable\n10x performance improvement."),(0,r.kt)("p",null,"Here is the output of the BookKeeper perf tool with ensemble=1, write=1, and ack=1."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},"Batch(100): Read 1000100 entries in 8904ms\nBatch(500): Read 1000500 entries in 12182ms\nNon-Batch: Read 1000130 entries in 199928ms\n")),(0,r.kt)("p",null,"The key difference with the batch read is that the BookKeeper client sends only 10,000 requests to the server\n(compared to 1,000,000 in non-batch read), and the server sends 10,000 responses back to the client (versus 1,000,000 in non-batch read).\nThis approach reduces the number of RPC calls made and eliminates the need for the server to process a large number of\nrequests from the IO thread and the entry read thread pool, resulting in a significant improvement in performance."),(0,r.kt)("p",null,"Hence, the objective of this proposal is to enhance the performance of entry reading by introducing a batch entry reading protocol\nthat takes into account the expected count and size of entries."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Optimize entry reading performance:")," By reading multiple entries in a single RPC request, the network communication and RPC call overhead can be reduced, thereby optimizing the reading performance."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Minimize CPU resource consumption:")," The aggregation of multiple entries into a single RPC request can help in reducing the number of requests and responses, which in turn can lower the CPU resource consumption."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Streamline client code:")," The ability to read entries based on the anticipated count or size, such as Apache Pulsar's approach of calculating the start and end entry IDs for each read request based on the average size of past entries, can add unnecessary complexity to the implementation and can't guarantee reliable behavioral outcomes.")),(0,r.kt)("h1",{id:"public-interfaces"},"Public Interfaces"),(0,r.kt)("h2",{id:"bookkeeper-client-api"},"BookKeeper Client API"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"The new APIs will be added to BookieClient.java")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},"default void readEntries(BookieId address, long ledgerId, long startEntryId,\n        int maxCount, long maxSize, BatchedReadEntryCallback cb, Object ctx,\n        int flags) {\n        readEntries(address, ledgerId, startEntryId, maxCount, maxSize, cb, ctx, flags, null);\n        }\ndefault void readEntries(BookieId address, long ledgerId, long startEntryId,\n        int maxCount, long maxSize, BatchedReadEntryCallback cb, Object ctx,\n        int flags, byte[] masterKey) {\n        readEntries(address, ledgerId, startEntryId, maxCount, maxSize, cb, ctx, flags, masterKey, false);\n        }\n        \n        void readEntries(BookieId address, long ledgerId, long startEntryId,\n        int maxCount, long maxSize, BatchedReadEntryCallback cb, Object ctx,\n        int flags, byte[] masterKey, boolean allowFastFail);\n        \n        void readEntiesWithFallback(BookieId address, long ledgerId, long startEntryId,\n        int maxCount, long maxSize, BatchedReadEntryCallback cb, Object ctx,\n        int flags, byte[] masterKey, boolean allowFastFail) \n")),(0,r.kt)("ol",{start:2},(0,r.kt)("li",{parentName:"ol"},"The new class BatchedReadEntryCallback will be added to BookkeeperInternalCallbacks.java")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},"public interface BatchedReadEntryCallback {\n    void readEntriesComplete(int rc, long ledgerId, long startEntryId, ByteBufList bufList, Object ctx);\n}\n")),(0,r.kt)("ol",{start:3},(0,r.kt)("li",{parentName:"ol"},"The new APIs will be added to ReadHandle.java")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},"CompletableFuture<LedgerEntries> readAsync(long startEntry, int maxCount, long maxSize);\n\ndefault LedgerEntries read(long startEntry, int maxCount, long maxSize) throws BKException, InterruptedException {\n        return FutureUtils.result(readAsync(startEntry, maxCount, maxSize),\n        BKException.HANDLER);\n        }\n")),(0,r.kt)("h2",{id:"wire-protocol-changes"},"Wire protocol changes"),(0,r.kt)("p",null,"In BookKeeper, the V2 protocol uses a custom encoding format. So we need to handle the data encoding and decoding.\nThe V3 protocol uses the ProtoBuf for encoding and decoding."),(0,r.kt)("h3",{id:"v2-protocol"},"V2 Protocol"),(0,r.kt)("p",null,"The new command type ",(0,r.kt)("em",{parentName:"p"},(0,r.kt)("inlineCode",{parentName:"em"},"BATCH_READ_ENTRY"))," will be added to ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/apache/bookkeeper/blob/master/bookkeeper-server/src/main/java/org/apache/bookkeeper/proto/BookieProtocol.java"},"BookieProtocol.java")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},"byte BATCH_READ_ENTRY = 7;\n")),(0,r.kt)("p",null,"The new command BatchedReadRequest will be added to BookieProtocol.java"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},"class BatchedReadRequest extends ReadRequest {\n    long requestId;\n    int maxCount;\n    long maxSize;\n}\n")),(0,r.kt)("p",null,"And the command BatchedReadRequest will be encoded as"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},"| 4 bytes (frame_size) | 4 bytes (header_size) | 4 bytes (packet_header) | 8 bytes (ledger_id) | 8 bytes (start_entry_id) | 8 bytes (request_id) | 4 bytes (max_count) | 8 bytes (max_size) |\n")),(0,r.kt)("p",null,"The new command ",(0,r.kt)("inlineCode",{parentName:"p"},"BatchedReadResponse")," will be added to ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/apache/bookkeeper/blob/master/bookkeeper-server/src/main/java/org/apache/bookkeeper/proto/BookieProtocol.java"},"BookieProtocol.java")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},"class BatchedReadResponse extends Response implements ReferenceCounted {\n\n    final long requestId;\n    final ByteBufList data;\n}\n")),(0,r.kt)("p",null,"The new command ",(0,r.kt)("inlineCode",{parentName:"p"},"BatchedReadResponse")," will be encoded as"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},"| 4 bytes (frame_size) | 4 bytes (response_size) | 4 bytes (packet_header) | 4 bytes (error_code) | 8 bytes (ledger_id) | 8 bytes (start_entry_id) | 8 bytes (request_id) | 4 bytes (payload_size) | payload |  4 bytes (payload_size) | payload | ... |\n")),(0,r.kt)("h3",{id:"v3-protocol"},"V3 Protocol"),(0,r.kt)("p",null,"The new Operation Type ",(0,r.kt)("em",{parentName:"p"},(0,r.kt)("inlineCode",{parentName:"em"},"BATCH_READ_ENTRY")),"  will be added to the ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/apache/bookkeeper/blob/master/bookkeeper-proto/src/main/proto/BookkeeperProtocol.proto#L55-L69"},"OperationType enum")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},"BATCH_READ_ENTRY = 12;\n")),(0,r.kt)("p",null,"The new command will be added to ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/apache/bookkeeper/blob/master/bookkeeper-proto/src/main/proto/BookkeeperProtocol.proto"},"BookkeeperProtocol.proto")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},"message BatchReadRequest {\n    enum Flag {\n        FENCE_LEDGER = 1;\n        ENTRY_PIGGYBACK = 2;\n    }\n    optional Flag flag = 100;\n    required int64 ledgerId = 1;\n    // entryId will be -1 for reading the LAST_ADD_CONFIRMED entry.\n    required int64 startEntryId = 2;\n    required int32 maxCount = 3;\n    required int64 maxSize = 4;\n    // Used while fencing a ledger.\n    optional bytes masterKey = 5;\n    // Used for waiting on last add confirmed update\n    optional int64 previousLAC = 6;\n    // Used as a timeout (in milliseconds) for the long polling request\n    optional int64 timeOut = 7;\n}\n\nmessage BatchReadResponse {\n    required StatusCode status = 1;\n    required int64 ledgerId = 2;\n    required int64 startEntryId = 3;\n    repeated bytes body = 4;\n    // Piggyback LAC\n    optional int64 maxLAC = 5;\n    optional int64 lacUpdateTimestamp = 6;\n}\n")),(0,r.kt)("h1",{id:"proposed-changes"},"Proposed Changes"),(0,r.kt)("h2",{id:"loose-constraints"},"Loose constraints"),(0,r.kt)("p",null,"The definition of the batched read API does not strictly adhere to the maximum count and size constraints defined by the\nrequest parameters. Rather, the API may return fewer entries than what was requested within the bounds of the established range.\nFor instance, if the caller requests to read 100 entries from the bookie server, the API may return any number of entries\nup to and including 100. The API is designed as loose constraints for the following reasons"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("strong",{parentName:"li"},"Ensemble change:")," The read entries may be distributed across different bookies after ",(0,r.kt)("em",{parentName:"li"},"Ensemble Change")," ","[3]",".\nTo cope with the impact of ensemble change, the BookKeeper client has to send multiple requests to different bookies when\nreading entries and then merge the returned results to return to the user. If a request times out, the BookKeeper\nclient has to discard the other returned results and provide feedback to the caller. Compared to the complexity introduced for the client,\nthe benefits are almost negligible since ensemble change is not happening all the time."),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("strong",{parentName:"li"},"A < W:")," If ",(0,r.kt)("em",{parentName:"li"},"Ack Quorum")," < ",(0,r.kt)("em",{parentName:"li"},"Write Quorum")," ","[3]",", some of the bookies may not have all the data that was successfully\nwritten by the clients. Therefore, if a request is sent to bookies that do not have all the data the client successfully\nwrote, the returned entries may also be missing some of the trailing data. We can have two ways to try to satisfy the\nread size requirement\nas much as possible\na. Discard the already read data and send the request to another bookie.\nb. Read the missing parts from another bookie and then merge the results to return to the caller.")),(0,r.kt)("p",null,"But both options come with additional costs or added complexity for the bookkeeper client. And the API will not\nreturn 0 entries or EntryNotFoundException to the caller if the first request entry ID is lower than the ",(0,r.kt)("em",{parentName:"p"},"LAC")," ","[3]",".\nThe bookie client would retry to another bookie to read the entries if the requested bookie returned EntryNotFoundException."),(0,r.kt)("ol",{start:3},(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("strong",{parentName:"li"},"Exceeds the Netty\u2019s frame size:")," The bookie server cannot send data larger than the Netty\u2019s frame size.")),(0,r.kt)("p",null,"In conclusion, defining the maximum read entries count and size in the new API as loose constraints would simplify the client.\nFor the API caller, it is only necessary to decide which entry to read from the entries that have already been read without\nworrying about whether the read entries meet the expected entries count or size of the request."),(0,r.kt)("h2",{id:"not-supporting-striped-ledger"},"Not supporting striped Ledger"),(0,r.kt)("p",null,"Regarding what bookkeeper striped writes are, please refer to the section of ",(0,r.kt)("em",{parentName:"p"},"Layer 2 - Logical Storage Model of the post")," ","[4]",".\nAs no single bookie can have the complete set of written data, it poses a significant challenge to perform batch reads.\nThe client has to read from multiple bookies and merge the results to return to the caller. One possibility is the API\ncan be defined as reading multiple entry IDs. The caller provides a list of entry IDs. The bookie client splits into\nmultiple requests based on provided entry IDs for each bookie and then merges the returned results from multiple bookies\nbefore returning them to the caller. Considering the following reasons, we should not define the API like this."),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"The implementation of the client becomes more complicated."),(0,r.kt)("li",{parentName:"ol"},"From my experience, striped writing is not commonly used. We should not add overhead to common scenarios for less\nfrequently used ones, especially if it means that the request body containing the entry ID list becomes larger.\nThis mainly refers to the fact that including an entry ID list in the request will inflate the network transmission."),(0,r.kt)("li",{parentName:"ol"},"The bookie server must return the data according to the defined entry IDs. If one entry is missed on the bookie,\nthe bookie must return EntryNotFoundException to the bookie client so that the bookie client can request another bookie.\nOtherwise, the API definition will become confusing.")),(0,r.kt)("p",null,"So, the bookie client will fall back to the current way of reading a single entry at a time to a bookie and merging all\nthe results from the bookies if the ",(0,r.kt)("em",{parentName:"p"},"Ensemble size")," is greater than the ",(0,r.kt)("em",{parentName:"p"},"Write Quorum"),"."),(0,r.kt)("p",null,"For the fallback, we have two options:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Use the batch-read API to read entries, but bookie servers will return one entry in each read request. After the entry\nis returned, the client will send the next read request to the bookie servers. This way can unify caller API to batch-read\nbut will introduce a huge read performance impact due to the next read request won\u2019t be sent to the bookies until the\nprevious read response is returned."),(0,r.kt)("li",{parentName:"ul"},"Provide a fallback extended batch-read API. If the ledger is stripped, the batch-read API will automatically fall back\nto the single-read API internally. The fallback batch-read API is an extension of the batch-read API, and it can fall\nback to single-read API internally on demand.")),(0,r.kt)("p",null,"We will choose the fallback batch-read API solution. This solution can provide the simplest way to support reading stripped\nledgers in the unified batch-read API and users don\u2019t need to care about the compatibility issues."),(0,r.kt)("h1",{id:"compatibility"},"Compatibility"),(0,r.kt)("p",null,"Considering the introduction of wire protocol changes in the proposal, there is a possibility of compatibility issues arising\nif the client is upgraded without upgrading the server. This could result in potential errors and unexpected behavior.\nTo prevent any losses for the users, there are two options available. However, it is important to note that this is a newly\nintroduced API and not a modification of any existing APIs. The compatibility issue being referred to is specifically\nrelated to the definition of the new API when used with an old version bookie server. It is worth mentioning that the\nproposed changes will not break any existing APIs or alter the behavior of any existing APIs."),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("strong",{parentName:"li"},"Default batch-read API returns error codes directly."),' The BookKeeper protocol has established the "invalid request type"\nerror ',"[5]",' to handle cases where a client sends a request to a bookie server that does not support batch reading. Consequently,\nthe client will receive a "NotSupport" error and must decide whether to switch to single-entry read mode. While this approach\noffers more deterministic behavior for the new API, ensuring that callers are informed of the ultimate behavior whether or not\nthe server supports it, it does require all callers to handle the issue of unsupported API.'),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("strong",{parentName:"li"},"Fallback-supported batch-read API will fallback to single-entry read automatically.")," By letting the bookie client\nhandle the issue of server support for the batch read protocol, the batch read API will not fail when the server does not\nsupport it. This decouples the client batch API from the server protocol, meaning that users do not need to worry about\nwhether the bookie server supports batch reading or not. However, this may be confusing for users as they may not receive\na clear indication that the server does not support the new API. Users expect to achieve better performance by using the new API,\nbut if the server has not been upgraded, the new API may not perform as expected.")),(0,r.kt)("p",null,"In order to make batch-read API definition and behavior clear, we provide the batch-read API and fallback-support batch-read API.\nThe default batch-read API returns error codes to the user directly and let the user determine what action to do. The fallback-supported\nbatch-read API will handle the unsupported cases internally and the user won\u2019t receive any alerts if the bookie server does not support\nbatch-read API or reading to the stripped ledgers."),(0,r.kt)("p",null,"The proposal aims to define the behavior of the new API through the ",(0,r.kt)("strong",{parentName:"p"},"second approach"),", primarily due to the following reasons:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"The responsibility of handling fallback to single-entry read mode for Ledgers with stripped writing should belong to\nthe bookie client, as stripped writing is not part of the public API of BookKeeper. Therefore, it is necessary to maintain\nconsistent behavior across all BookKeeper clients."),(0,r.kt)("li",{parentName:"ol"},"To avoid users from making redundant efforts to handle protocol compatibility, the client should handle the issue of\nunsupported API rather than leave it to the users."),(0,r.kt)("li",{parentName:"ol"},"If applications such as Pulsar want to migrate from single-read API to batch-read API, they need to change the whole\nread logic because the batch read API is different from the single read API, because the constraints of the batch read API\nare loose, and single read API is strict. If the applications switched from single-read API to batch-read API by changing\nthe code logic, we need a way to switch back to single-read API. One solution is to maintain both single-read API and\nbatch-read API on the application side, and another solution is to provide a flag on the BookKeeper client side, and fallback\nto single-read API if the flag is enabled. We prefer to control it on the BookKeeper client side because it will simplify the\napplication logic a lot when switching from single-read API to bath-read API.")),(0,r.kt)("p",null,"In conclusion, detailed documentation should be provided to explain the API's behavior, particularly in cases where it\nfalls back to single-item read mode. This will help users set reasonable expectations for the new API and avoid confusion."),(0,r.kt)("h1",{id:"operability-considerations"},"Operability Considerations"),(0,r.kt)("p",null,"Even if users have upgraded the BookKeeper server and client, modified their code to use the new API for better read\nperformance. However, the new API may also introduce new risks. It could be an increased resource consumption in specific\nscenarios or a bug that causes the API to malfunction in certain cases. Therefore, users need to have a quick option to\ngo back to the old way when problems arise, rather than only being able to resolve them through rollbacking the application."),(0,r.kt)("p",null,"The fallback-supported batch-read API provided a flag to fall back to the old behavior. We control the flag on the\nBookKeeper client side can simplify the application logic a lot when switching from single-read API to bath-read API."),(0,r.kt)("h1",{id:"security-considerations"},"Security Considerations"),(0,r.kt)("p",null,"No security issues that we need to consider for this proposal. It will follow the existing security pattern."),(0,r.kt)("h1",{id:"observability"},"Observability"),(0,r.kt)("p",null,"To increase visibility into the new functionality of the bookie server, we need to add the following metrics to the bookie server"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Indicator"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"bookkeeper_server_BATCH_READ_ENTRY_REQUEST"),(0,r.kt)("td",{parentName:"tr",align:null},"Histogram"),(0,r.kt)("td",{parentName:"tr",align:null},"The histogram of the batch read requests")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"latency buckets: ","[0-5]",", ","[5-10]",", ","[10, 20]",", ","[20-50]",", ","[50-100]",", ","[100-200]",",","[200-500]",",","[500-1000]",", ","[1000-3000]",", ","[>3000]"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"bookkeeper_server_BATCH_READ_ENTRY_RESPONSE_SIZE"),(0,r.kt)("td",{parentName:"tr",align:null},"Histogram"),(0,r.kt)("td",{parentName:"tr",align:null},"The histogram of the batch read response size")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Size buckets: ","[0-128]",", ","[128-512]",",","[512-1k]",",","[1k-2k]",",","[2k-4k]",",","[4k,16k]",",","[16k-128k]",",","[128k-1MB]",", ","[> 1MB]"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null})))),(0,r.kt)("h1",{id:"references"},"References"),(0,r.kt)("p",null,"[0]"," ",(0,r.kt)("a",{parentName:"p",href:"https://bookkeeper.apache.org/docs/api/ledger-api#reading-entries-from-ledgers"},"https://bookkeeper.apache.org/docs/api/ledger-api#reading-entries-from-ledgers"),"\n","[1]"," ",(0,r.kt)("a",{parentName:"p",href:"https://bookkeeper.apache.org/docs/getting-started/concepts#entries"},"https://bookkeeper.apache.org/docs/getting-started/concepts#entries"),"\n","[2]"," ",(0,r.kt)("a",{parentName:"p",href:"https://bookkeeper.apache.org/docs/getting-started/concepts#ledgers"},"https://bookkeeper.apache.org/docs/getting-started/concepts#ledgers"),"\n","[3]"," ",(0,r.kt)("a",{parentName:"p",href:"https://jack-vanlightly.com/blog/2021/12/7/tweaking-the-bookkeeper-protocol-guaranteeing-write-quorum"},"https://jack-vanlightly.com/blog/2021/12/7/tweaking-the-bookkeeper-protocol-guaranteeing-write-quorum"),"\n","[4]"," ",(0,r.kt)("a",{parentName:"p",href:"https://jack-vanlightly.com/blog/2018/10/2/understanding-how-apache-pulsar-works"},"https://jack-vanlightly.com/blog/2018/10/2/understanding-how-apache-pulsar-works"),"\n","[5]"," ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/apache/bookkeeper/blob/master/bookkeeper-server/src/main/java/org/apache/bookkeeper/proto/BookieProtocol.java#L151"},"https://github.com/apache/bookkeeper/blob/master/bookkeeper-server/src/main/java/org/apache/bookkeeper/proto/BookieProtocol.java#L151")))}h.isMDXComponent=!0},15552:function(e,t,n){t.Z=n.p+"assets/images/batch_read-6e348aa74b5b6d58019147a8007827d7.png"},67682:function(e,t,n){t.Z=n.p+"assets/images/single_read-41227c40cb1afd8bf5c1eddb1c78f287.png"}}]);