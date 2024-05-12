"use strict";(self.webpackChunksite_3=self.webpackChunksite_3||[]).push([[4612],{3905:function(e,t,o){o.d(t,{Zo:function(){return k},kt:function(){return u}});var n=o(67294);function a(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function r(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}function i(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?r(Object(o),!0).forEach((function(t){a(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):r(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function l(e,t){if(null==e)return{};var o,n,a=function(e,t){if(null==e)return{};var o,n,a={},r=Object.keys(e);for(n=0;n<r.length;n++)o=r[n],t.indexOf(o)>=0||(a[o]=e[o]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)o=r[n],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(a[o]=e[o])}return a}var p=n.createContext({}),s=function(e){var t=n.useContext(p),o=t;return e&&(o="function"==typeof e?e(t):i(i({},t),e)),o},k=function(e){var t=s(e.components);return n.createElement(p.Provider,{value:t},e.children)},d="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var o=e.components,a=e.mdxType,r=e.originalType,p=e.parentName,k=l(e,["components","mdxType","originalType","parentName"]),d=s(o),m=a,u=d["".concat(p,".").concat(m)]||d[m]||c[m]||r;return o?n.createElement(u,i(i({ref:t},k),{},{components:o})):n.createElement(u,i({ref:t},k))}));function u(e,t){var o=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=o.length,i=new Array(r);i[0]=m;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l[d]="string"==typeof e?e:a,i[1]=l;for(var s=2;s<r;s++)i[s]=o[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,o)}m.displayName="MDXCreateElement"},24963:function(e,t,o){o.r(t),o.d(t,{assets:function(){return p},contentTitle:function(){return i},default:function(){return c},frontMatter:function(){return r},metadata:function(){return l},toc:function(){return s}});var n=o(83117),a=(o(67294),o(3905));const r={id:"bookies",title:"BookKeeper administration"},i=void 0,l={unversionedId:"admin/bookies",id:"version-4.17.0/admin/bookies",title:"BookKeeper administration",description:"This document is a guide to deploying, administering, and maintaining BookKeeper. It also discusses best practices and common problems.",source:"@site/versioned_docs/version-4.17.0/admin/bookies.md",sourceDirName:"admin",slug:"/admin/bookies",permalink:"/docs/admin/bookies",draft:!1,tags:[],version:"4.17.0",frontMatter:{id:"bookies",title:"BookKeeper administration"},sidebar:"docsSidebar",previous:{title:"Deploying Apache BookKeeper on Kubernetes",permalink:"/docs/deployment/kubernetes"},next:{title:"Using AutoRecovery",permalink:"/docs/admin/autorecovery"}},p={},s=[{value:"Requirements",id:"requirements",level:2},{value:"Performance",id:"performance",level:3},{value:"ZooKeeper",id:"zookeeper",level:3},{value:"Starting and stopping bookies",id:"starting-and-stopping-bookies",level:2},{value:"Local bookies",id:"local-bookies",level:3},{value:"Configuring bookies",id:"configuring-bookies",level:2},{value:"Logging",id:"logging",level:2},{value:"Upgrading",id:"upgrading",level:2},{value:"Upgrade pattern",id:"upgrade-pattern",level:3},{value:"Formatting",id:"formatting",level:2},{value:"AutoRecovery",id:"autorecovery",level:2},{value:"Missing disks or directories",id:"missing-disks-or-directories",level:2}],k={toc:s},d="wrapper";function c(e){let{components:t,...o}=e;return(0,a.kt)(d,(0,n.Z)({},k,o,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"This document is a guide to deploying, administering, and maintaining BookKeeper. It also discusses best practices and common problems."),(0,a.kt)("h2",{id:"requirements"},"Requirements"),(0,a.kt)("p",null,"A typical BookKeeper installation consists of an ensemble of bookies and a ZooKeeper quorum. The exact number of bookies depends on the quorum mode that you choose, desired throughput, and the number of clients using the installation simultaneously."),(0,a.kt)("p",null,"The minimum number of bookies depends on the type of installation:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"For ",(0,a.kt)("em",{parentName:"li"},"self-verifying")," entries you should run at least three bookies. In this mode, clients store a message authentication code along with each entry."),(0,a.kt)("li",{parentName:"ul"},"For ",(0,a.kt)("em",{parentName:"li"},"generic")," entries you should run at least four")),(0,a.kt)("p",null,"There is no upper limit on the number of bookies that you can run in a single ensemble."),(0,a.kt)("h3",{id:"performance"},"Performance"),(0,a.kt)("p",null,"To achieve optimal performance, BookKeeper requires each server to have at least two disks. It's possible to run a bookie with a single disk but performance will be significantly degraded."),(0,a.kt)("h3",{id:"zookeeper"},"ZooKeeper"),(0,a.kt)("p",null,"There is no constraint on the number of ZooKeeper nodes you can run with BookKeeper. A single machine running ZooKeeper in ",(0,a.kt)("a",{parentName:"p",href:"https://zookeeper.apache.org/doc/current/zookeeperStarted.html#sc_InstallingSingleMode"},"standalone mode")," is sufficient for BookKeeper, although for the sake of higher resilience we recommend running ZooKeeper in ",(0,a.kt)("a",{parentName:"p",href:"https://zookeeper.apache.org/doc/current/zookeeperStarted.html#sc_RunningReplicatedZooKeeper"},"quorum mode")," with multiple servers."),(0,a.kt)("h2",{id:"starting-and-stopping-bookies"},"Starting and stopping bookies"),(0,a.kt)("p",null,"You can run bookies either in the foreground or in the background, using ",(0,a.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Nohup"},"nohup"),". You can also run ",(0,a.kt)("a",{parentName:"p",href:"#local-bookie"},"local bookies")," for development purposes."),(0,a.kt)("p",null,"To start a bookie in the foreground, use the ",(0,a.kt)("a",{parentName:"p",href:"../reference/cli#bookkeeper-bookie"},(0,a.kt)("inlineCode",{parentName:"a"},"bookie"))," command of the ",(0,a.kt)("a",{parentName:"p",href:"../reference/cli#bookkeeper"},(0,a.kt)("inlineCode",{parentName:"a"},"bookkeeper"))," CLI tool:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"$ bin/bookkeeper bookie\n")),(0,a.kt)("p",null,"To start a bookie in the background, use the ",(0,a.kt)("a",{parentName:"p",href:"../reference/cli#bookkeeper-daemon.sh"},(0,a.kt)("inlineCode",{parentName:"a"},"bookkeeper-daemon.sh"))," script and run ",(0,a.kt)("inlineCode",{parentName:"p"},"start bookie"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"$ bin/bookkeeper-daemon.sh start bookie\n")),(0,a.kt)("h3",{id:"local-bookies"},"Local bookies"),(0,a.kt)("p",null,"The instructions above showed you how to run bookies intended for production use. If you'd like to experiment with ensembles of bookies locally, you can use the ",(0,a.kt)("a",{parentName:"p",href:"../reference/cli#bookkeeper-localbookie"},(0,a.kt)("inlineCode",{parentName:"a"},"localbookie"))," command of the ",(0,a.kt)("inlineCode",{parentName:"p"},"bookkeeper")," CLI tool and specify the number of bookies you'd like to run."),(0,a.kt)("p",null,"This would spin up a local ensemble of 6 bookies:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"$ bin/bookkeeper localbookie 6\n")),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"When you run a local bookie ensemble, all bookies run in a single JVM process.")),(0,a.kt)("h2",{id:"configuring-bookies"},"Configuring bookies"),(0,a.kt)("p",null,"There's a wide variety of parameters that you can set in the bookie configuration file in ",(0,a.kt)("inlineCode",{parentName:"p"},"bookkeeper-server/conf/bk_server.conf")," of your ",(0,a.kt)("a",{parentName:"p",href:"../reference/config"},"BookKeeper installation"),". A full listing can be found in ",(0,a.kt)("a",{parentName:"p",href:"../reference/config"},"Bookie configuration"),"."),(0,a.kt)("p",null,"Some of the more important parameters to be aware of:"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"left"},"Parameter"),(0,a.kt)("th",{parentName:"tr",align:"left"},"Description"),(0,a.kt)("th",{parentName:"tr",align:"left"},"Default"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"bookiePort")),(0,a.kt)("td",{parentName:"tr",align:"left"},"The TCP port that the bookie listens on"),(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"3181"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"zkServers")),(0,a.kt)("td",{parentName:"tr",align:"left"},"A comma-separated list of ZooKeeper servers in ",(0,a.kt)("inlineCode",{parentName:"td"},"hostname:port")," format"),(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"localhost:2181"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"journalDirectory")),(0,a.kt)("td",{parentName:"tr",align:"left"},"The directory where the ",(0,a.kt)("a",{parentName:"td",href:"../getting-started/concepts#log-device"},"log device")," stores the bookie's write-ahead log (WAL)"),(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"/tmp/bk-txn"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"ledgerDirectories")),(0,a.kt)("td",{parentName:"tr",align:"left"},"The directories where the ",(0,a.kt)("a",{parentName:"td",href:"../getting-started/concepts#ledger-device"},"ledger device")," stores the bookie's ledger entries (as a comma-separated list)"),(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"/tmp/bk-data"))))),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"Ideally, the directories specified ",(0,a.kt)("inlineCode",{parentName:"p"},"journalDirectory")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"ledgerDirectories")," should be on difference devices.")),(0,a.kt)("h2",{id:"logging"},"Logging"),(0,a.kt)("p",null,"BookKeeper uses ",(0,a.kt)("a",{parentName:"p",href:"http://www.slf4j.org/"},"slf4j")," for logging, with ",(0,a.kt)("a",{parentName:"p",href:"https://logging.apache.org/log4j/2.x/"},"log4j")," bindings enabled by default."),(0,a.kt)("p",null,"To enable logging for a bookie, create a ",(0,a.kt)("inlineCode",{parentName:"p"},"log4j.properties")," file and point the ",(0,a.kt)("inlineCode",{parentName:"p"},"BOOKIE_LOG_CONF")," environment variable to the configuration file. Here's an example:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"$ export BOOKIE_LOG_CONF=/some/path/log4j.properties\n$ bin/bookkeeper bookie\n")),(0,a.kt)("h2",{id:"upgrading"},"Upgrading"),(0,a.kt)("p",null,"From time to time you may need to make changes to the filesystem layout of bookies---changes that are incompatible with previous versions of BookKeeper and require that directories used with previous versions are upgraded. If a filesystem upgrade is required when updating BookKeeper, the bookie will fail to start and return an error like this:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"2017-05-25 10:41:50,494 - ERROR - [main:Bookie@246] - Directory layout version is less than 3, upgrade needed\n")),(0,a.kt)("p",null,"BookKeeper provides a utility for upgrading the filesystem. You can perform an upgrade using the ",(0,a.kt)("a",{parentName:"p",href:"../reference/cli#bookkeeper-upgrade"},(0,a.kt)("inlineCode",{parentName:"a"},"upgrade"))," command of the ",(0,a.kt)("inlineCode",{parentName:"p"},"bookkeeper")," CLI tool. When running ",(0,a.kt)("inlineCode",{parentName:"p"},"bookkeeper upgrade")," you need to specify one of three flags:"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"left"},"Flag"),(0,a.kt)("th",{parentName:"tr",align:"left"},"Action"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"--upgrade")),(0,a.kt)("td",{parentName:"tr",align:"left"},"Performs an upgrade")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"--rollback")),(0,a.kt)("td",{parentName:"tr",align:"left"},"Performs a rollback to the initial filesystem version")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"--finalize")),(0,a.kt)("td",{parentName:"tr",align:"left"},"Marks the upgrade as complete")))),(0,a.kt)("h3",{id:"upgrade-pattern"},"Upgrade pattern"),(0,a.kt)("p",null,"A standard upgrade pattern is to run an upgrade..."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"$ bin/bookkeeper upgrade --upgrade\n")),(0,a.kt)("p",null,"...then check that everything is working normally, then kill the bookie. If everything is okay, finalize the upgrade..."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"$ bin/bookkeeper upgrade --finalize\n")),(0,a.kt)("p",null,"...and then restart the server:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"$ bin/bookkeeper bookie\n")),(0,a.kt)("p",null,"If something has gone wrong, you can always perform a rollback:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"$ bin/bookkeeper upgrade --rollback\n")),(0,a.kt)("h2",{id:"formatting"},"Formatting"),(0,a.kt)("p",null,"You can format bookie metadata in ZooKeeper using the ",(0,a.kt)("a",{parentName:"p",href:"../reference/cli#bookkeeper-shell-metaformat"},(0,a.kt)("inlineCode",{parentName:"a"},"metaformat"))," command of the ",(0,a.kt)("a",{parentName:"p",href:"../reference/cli#the-bookkeeper-shell"},"BookKeeper shell"),"."),(0,a.kt)("p",null,"By default, formatting is done in interactive mode, which prompts you to confirm the format operation if old data exists. You can disable confirmation using the ",(0,a.kt)("inlineCode",{parentName:"p"},"-nonInteractive")," flag. If old data does exist, the format operation will abort ",(0,a.kt)("em",{parentName:"p"},"unless")," you set the ",(0,a.kt)("inlineCode",{parentName:"p"},"-force")," flag. Here's an example:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"$ bin/bookkeeper shell metaformat\n")),(0,a.kt)("p",null,"You can format the local filesystem data on a bookie using the ",(0,a.kt)("a",{parentName:"p",href:"../reference/cli#bookkeeper-shell-bookieformat"},(0,a.kt)("inlineCode",{parentName:"a"},"bookieformat"))," command on each bookie. Here's an example:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"$ bin/bookkeeper shell bookieformat\n")),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"The ",(0,a.kt)("inlineCode",{parentName:"p"},"-force")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"-nonInteractive")," flags are also available for the ",(0,a.kt)("inlineCode",{parentName:"p"},"bookieformat")," command.")),(0,a.kt)("h2",{id:"autorecovery"},"AutoRecovery"),(0,a.kt)("p",null,"For a guide to AutoRecovery in BookKeeper, see ",(0,a.kt)("a",{parentName:"p",href:"autorecovery"},"this doc"),"."),(0,a.kt)("h2",{id:"missing-disks-or-directories"},"Missing disks or directories"),(0,a.kt)("p",null,"Accidentally replacing disks or removing directories can cause a bookie to fail while trying to read a ledger fragment that, according to the ledger metadata, exists on the bookie. For this reason, when a bookie is started for the first time, its disk configuration is fixed for the lifetime of that bookie. Any change to its disk configuration, such as a crashed disk or an accidental configuration change, will result in the bookie being unable to start. That will throw an error like this:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"2017-05-29 18:19:13,790 - ERROR - [main:BookieServer314] \u2013 Exception running bookie server : @\norg.apache.bookkeeper.bookie.BookieException$InvalidCookieException\n.......at org.apache.bookkeeper.bookie.Cookie.verify(Cookie.java:82)\n.......at org.apache.bookkeeper.bookie.Bookie.checkEnvironment(Bookie.java:275)\n.......at org.apache.bookkeeper.bookie.Bookie.<init>(Bookie.java:351)\n")),(0,a.kt)("p",null,"If the change was the result of an accidental configuration change, the change can be reverted and the bookie can be restarted. However, if the change ",(0,a.kt)("em",{parentName:"p"},"cannot")," be reverted, such as is the case when you want to add a new disk or replace a disk, the bookie must be wiped and then all its data re-replicated onto it."),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Increment the ",(0,a.kt)("a",{parentName:"p",href:"../reference/config#bookiePort"},(0,a.kt)("inlineCode",{parentName:"a"},"bookiePort"))," parameter in the ",(0,a.kt)("a",{parentName:"p",href:"../reference/config"},(0,a.kt)("inlineCode",{parentName:"a"},"bk_server.conf")))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Ensure that all directories specified by ",(0,a.kt)("a",{parentName:"p",href:"../reference/config#journalDirectory"},(0,a.kt)("inlineCode",{parentName:"a"},"journalDirectory"))," and ",(0,a.kt)("a",{parentName:"p",href:"../reference/config#ledgerDirectories"},(0,a.kt)("inlineCode",{parentName:"a"},"ledgerDirectories"))," are empty.")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("a",{parentName:"p",href:"#starting-and-stopping-bookies"},"Start the bookie"),".")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Run the following command to re-replicate the data:"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"$ bin/bookkeeper shell recover <oldbookie> \n")),(0,a.kt)("p",{parentName:"li"},"The ZooKeeper server, old bookie, and new bookie, are all identified by their external IP and ",(0,a.kt)("inlineCode",{parentName:"p"},"bookiePort")," (3181 by default). Here's an example:"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"$ bin/bookkeeper shell recover  192.168.1.10:3181\n")),(0,a.kt)("p",{parentName:"li"},"See the ",(0,a.kt)("a",{parentName:"p",href:"autorecovery"},"AutoRecovery")," documentation for more info on the re-replication process."))))}c.isMDXComponent=!0}}]);