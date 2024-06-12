"use strict";(self.webpackChunksite_3=self.webpackChunksite_3||[]).push([[5617],{3905:function(e,t,r){r.d(t,{Zo:function(){return l},kt:function(){return m}});var n=r(67294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function u(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c=n.createContext({}),s=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},l=function(e){var t=s(e.components);return n.createElement(c.Provider,{value:t},e.children)},p="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,l=u(e,["components","mdxType","originalType","parentName"]),p=s(r),d=o,m=p["".concat(c,".").concat(d)]||p[d]||f[d]||a;return r?n.createElement(m,i(i({ref:t},l),{},{components:r})):n.createElement(m,i({ref:t},l))}));function m(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=d;var u={};for(var c in t)hasOwnProperty.call(t,c)&&(u[c]=t[c]);u.originalType=e,u[p]="string"==typeof e?e:o,i[1]=u;for(var s=2;s<a;s++)i[s]=r[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},81438:function(e,t,r){r.r(t),r.d(t,{assets:function(){return c},contentTitle:function(){return i},default:function(){return f},frontMatter:function(){return a},metadata:function(){return u},toc:function(){return s}});var n=r(83117),o=(r(67294),r(3905));const a={id:"overview",title:"BookKeeper Security"},i=void 0,u={unversionedId:"security/overview",id:"version-4.17.0/security/overview",title:"BookKeeper Security",description:"In the 4.5.0 release, the BookKeeper community added a number of features that can be used, together or separately, to secure a BookKeeper cluster.",source:"@site/versioned_docs/version-4.17.0/security/overview.md",sourceDirName:"security",slug:"/security/overview",permalink:"/docs/security/overview",draft:!1,tags:[],version:"4.17.0",frontMatter:{id:"overview",title:"BookKeeper Security"}},c={},s=[{value:"Next Steps",id:"next-steps",level:2}],l={toc:s},p="wrapper";function f(e){let{components:t,...r}=e;return(0,o.kt)(p,(0,n.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"In the 4.5.0 release, the BookKeeper community added a number of features that can be used, together or separately, to secure a BookKeeper cluster.\nThe following security measures are currently supported:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Authentication of connections to bookies from clients, using either ",(0,o.kt)("a",{parentName:"li",href:"tls"},"TLS")," or ",(0,o.kt)("a",{parentName:"li",href:"sasl"},"SASL (Kerberos)"),"."),(0,o.kt)("li",{parentName:"ol"},"Authentication of connections from clients, bookies, autorecovery daemons to ",(0,o.kt)("a",{parentName:"li",href:"zookeeper"},"ZooKeeper"),", when using zookeeper based ledger managers."),(0,o.kt)("li",{parentName:"ol"},"Encryption of data transferred between bookies and clients, between bookies and autorecovery daemons using ",(0,o.kt)("a",{parentName:"li",href:"tls"},"TLS"),".")),(0,o.kt)("p",null,"It\u2019s worth noting that security is optional - non-secured clusters are supported, as well as a mix of authenticated, unauthenticated, encrypted and non-encrypted clients."),(0,o.kt)("p",null,"NOTE: authorization is not yet available in 4.5.0. The Apache BookKeeper community is looking to add this feature in subsequent releases."),(0,o.kt)("h2",{id:"next-steps"},"Next Steps"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"tls"},"Encryption and Authentication using TLS")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"sasl"},"Authentication using SASL")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"zookeeper"},"ZooKeeper Authentication"))))}f.isMDXComponent=!0}}]);