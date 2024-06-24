"use strict";(self.webpackChunksite_3=self.webpackChunksite_3||[]).push([[3682],{3905:function(e,t,n){n.d(t,{Zo:function(){return s},kt:function(){return d}});var r=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var u=r.createContext({}),p=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},s=function(e){var t=p(e.components);return r.createElement(u.Provider,{value:t},e.children)},c="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},k=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,u=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),c=p(n),k=o,d=c["".concat(u,".").concat(k)]||c[k]||m[k]||a;return n?r.createElement(d,l(l({ref:t},s),{},{components:n})):r.createElement(d,l({ref:t},s))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,l=new Array(a);l[0]=k;var i={};for(var u in t)hasOwnProperty.call(t,u)&&(i[u]=t[u]);i.originalType=e,i[c]="string"==typeof e?e:o,l[1]=i;for(var p=2;p<a;p++)l[p]=n[p];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}k.displayName="MDXCreateElement"},9968:function(e,t,n){n.r(t),n.d(t,{assets:function(){return u},contentTitle:function(){return l},default:function(){return m},frontMatter:function(){return a},metadata:function(){return i},toc:function(){return p}});var r=n(83117),o=(n(67294),n(3905));const a={id:"manual",title:"Manual deployment"},l=void 0,i={unversionedId:"deployment/manual",id:"version-4.17.1/deployment/manual",title:"Manual deployment",description:"A BookKeeper cluster consists of two main components:",source:"@site/versioned_docs/version-4.17.1/deployment/manual.md",sourceDirName:"deployment",slug:"/deployment/manual",permalink:"/docs/deployment/manual",draft:!1,tags:[],version:"4.17.1",frontMatter:{id:"manual",title:"Manual deployment"},sidebar:"docsSidebar",previous:{title:"BookKeeper concepts and architecture",permalink:"/docs/getting-started/concepts"},next:{title:"Deploying Apache BookKeeper on Kubernetes",permalink:"/docs/deployment/kubernetes"}},u={},p=[{value:"ZooKeeper setup",id:"zookeeper-setup",level:2},{value:"Cluster metadata setup",id:"cluster-metadata-setup",level:2},{value:"Starting up bookies",id:"starting-up-bookies",level:2},{value:"System requirements",id:"system-requirements",level:3}],s={toc:p},c="wrapper";function m(e){let{components:t,...n}=e;return(0,o.kt)(c,(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"A BookKeeper cluster consists of two main components:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"A ",(0,o.kt)("a",{parentName:"li",href:"#zookeeper-setup"},"ZooKeeper")," cluster that is used for configuration- and coordination-related tasks"),(0,o.kt)("li",{parentName:"ul"},"An ",(0,o.kt)("a",{parentName:"li",href:"#starting-up-bookies"},"ensemble")," of bookies")),(0,o.kt)("h2",{id:"zookeeper-setup"},"ZooKeeper setup"),(0,o.kt)("p",null,"We won't provide a full guide to setting up a ZooKeeper cluster here. We recommend that you consult ",(0,o.kt)("a",{parentName:"p",href:"https://zookeeper.apache.org/doc/current/zookeeperAdmin.html"},"this guide")," in the official ZooKeeper documentation."),(0,o.kt)("h2",{id:"cluster-metadata-setup"},"Cluster metadata setup"),(0,o.kt)("p",null,"Once your ZooKeeper cluster is up and running, there is some metadata that needs to be written to ZooKeeper, so you need to modify the bookie's configuration to make sure that it points to the right ZooKeeper cluster."),(0,o.kt)("p",null,"On each bookie host, you need to ",(0,o.kt)("a",{parentName:"p",href:"../getting-started/installation#download"},"download")," the BookKeeper package as a tarball. Once you've done that, you need to configure the bookie by setting values in the ",(0,o.kt)("inlineCode",{parentName:"p"},"bookkeeper-server/conf/bk_server.conf")," config file. The one parameter that you will absolutely need to change is the ",(0,o.kt)("inlineCode",{parentName:"p"},"metadataServiceUri")," parameter, which you will need to set to the ZooKeeper connection string for your ZooKeeper cluster. Here's an example:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-properties"},"metadataServiceUri=zk+hierarchical://100.0.0.1:2181;100.0.0.2:2181;100.0.0.3:2181/ledgers\n")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"A full listing of configurable parameters available in ",(0,o.kt)("inlineCode",{parentName:"p"},"bookkeeper-server/conf/bk_server.conf")," can be found in the ",(0,o.kt)("a",{parentName:"p",href:"../reference/config"},"Configuration")," reference manual.")),(0,o.kt)("p",null,"Once the bookie's configuration is set, you can set up cluster metadata for the cluster by running the following command from any bookie in the cluster:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"$ bookkeeper-server/bin/bookkeeper shell metaformat\n")),(0,o.kt)("p",null,"You can run in the formatting "),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"The ",(0,o.kt)("inlineCode",{parentName:"p"},"metaformat")," command performs all the necessary ZooKeeper cluster metadata tasks and thus only needs to be run ",(0,o.kt)("em",{parentName:"p"},"once")," and from ",(0,o.kt)("em",{parentName:"p"},"any")," bookie in the BookKeeper cluster.")),(0,o.kt)("p",null,"Once cluster metadata formatting has been completed, your BookKeeper cluster is ready to go!"),(0,o.kt)("h2",{id:"starting-up-bookies"},"Starting up bookies"),(0,o.kt)("p",null,"Before you start up your bookies, you should make sure that all bookie hosts have the correct configuration, then you can start up as many bookies as you'd like to form a cluster by using the ",(0,o.kt)("a",{parentName:"p",href:"../reference/cli#bookkeeper-bookie"},(0,o.kt)("inlineCode",{parentName:"a"},"bookie"))," command of the ",(0,o.kt)("a",{parentName:"p",href:"../reference/cli#bookkeeper"},(0,o.kt)("inlineCode",{parentName:"a"},"bookkeeper"))," CLI tool:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"$ bookkeeper-server/bin/bookkeeper bookie\n")),(0,o.kt)("h3",{id:"system-requirements"},"System requirements"),(0,o.kt)("p",null,"The number of bookies you should run in a BookKeeper cluster depends on the quorum mode that you've chosen, the desired throughput, and the number of clients using the cluster simultaneously."),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:"left"},"Quorum type"),(0,o.kt)("th",{parentName:"tr",align:"left"},"Number of bookies"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},"Self-verifying quorum"),(0,o.kt)("td",{parentName:"tr",align:"left"},"3")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},"Generic"),(0,o.kt)("td",{parentName:"tr",align:"left"},"4")))),(0,o.kt)("p",null,"Increasing the number of bookies will enable higher throughput, and there is ",(0,o.kt)("strong",{parentName:"p"},"no upper limit")," on the number of bookies. "))}m.isMDXComponent=!0}}]);