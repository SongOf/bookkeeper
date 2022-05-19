"use strict";(self.webpackChunksite_3=self.webpackChunksite_3||[]).push([[886],{9367:function(e){e.exports=JSON.parse('{"pluginId":"default","version":"4.14.5","label":"4.14.5","banner":"unmaintained","badge":true,"className":"docs-version-4.14.5","isLast":false,"docsSidebars":{"version-4.14.5/docsSidebar":[{"type":"link","label":"Overview","href":"/docs/4.14.5/overview/","docId":"overview/overview"},{"type":"category","label":"Getting started","items":[{"type":"link","label":"Installation","href":"/docs/4.14.5/getting-started/installation","docId":"getting-started/installation"},{"type":"link","label":"Run bookies locally","href":"/docs/4.14.5/getting-started/run-locally","docId":"getting-started/run-locally"},{"type":"link","label":"Concepts and architecture","href":"/docs/4.14.5/getting-started/concepts","docId":"getting-started/concepts"}],"collapsed":true,"collapsible":true},{"type":"category","label":"Deployment","items":[{"type":"link","label":"Manual deployment","href":"/docs/4.14.5/deployment/manual","docId":"deployment/manual"},{"type":"link","label":"BookKeeper on Kubernetes","href":"/docs/4.14.5/deployment/kubernetes","docId":"deployment/kubernetes"}],"collapsed":true,"collapsible":true},{"type":"category","label":"Administration","items":[{"type":"link","label":"BookKeeper administration","href":"/docs/4.14.5/admin/bookies","docId":"admin/bookies"},{"type":"link","label":"AutoRecovery","href":"/docs/4.14.5/admin/autorecovery","docId":"admin/autorecovery"},{"type":"link","label":"Metrics collection","href":"/docs/4.14.5/admin/metrics","docId":"admin/metrics"},{"type":"link","label":"Upgrade","href":"/docs/4.14.5/admin/upgrade","docId":"admin/upgrade"},{"type":"link","label":"Admin REST API","href":"/docs/4.14.5/admin/http","docId":"admin/http"},{"type":"link","label":"Decommissioning Bookies","href":"/docs/4.14.5/admin/decomission","docId":"admin/decomission"}],"collapsed":true,"collapsible":true},{"type":"category","label":"API","items":[{"type":"link","label":"Overview","href":"/docs/4.14.5/api/overview","docId":"api/overview"},{"type":"link","label":"Ledger API","href":"/docs/4.14.5/api/ledger-api","docId":"api/ledger-api"},{"type":"link","label":"Advanced Ledger API","href":"/docs/4.14.5/api/ledger-adv-api","docId":"api/ledger-adv-api"},{"type":"link","label":"DistributedLog","href":"/docs/4.14.5/api/distributedlog-api","docId":"api/distributedlog-api"}],"collapsed":true,"collapsible":true},{"type":"category","label":"Security","items":[{"type":"link","label":"Overview","href":"/docs/4.14.5/security/overview","docId":"security/overview"},{"type":"link","label":"TLS Authentication","href":"/docs/4.14.5/security/tls","docId":"security/tls"},{"type":"link","label":"SASL Authentication","href":"/docs/4.14.5/security/sasl","docId":"security/sasl"},{"type":"link","label":"ZooKeeper Authentication","href":"/docs/4.14.5/security/zookeeper","docId":"security/zookeeper"}],"collapsed":true,"collapsible":true},{"type":"category","label":"Development","items":[{"type":"link","label":"BookKeeper protocol","href":"/docs/4.14.5/development/protocol","docId":"development/protocol"}],"collapsed":true,"collapsible":true},{"type":"category","label":"Reference","items":[{"type":"link","label":"Configuration","href":"/docs/4.14.5/reference/config","docId":"reference/config"},{"type":"link","label":"Command-line tools","href":"/docs/4.14.5/reference/cli","docId":"reference/cli"}],"collapsed":true,"collapsible":true}]},"docs":{"admin/autorecovery":{"id":"admin/autorecovery","title":"Using AutoRecovery","description":"When a bookie crashes, all ledgers on that bookie become under-replicated. In order to bring all ledgers in your BookKeeper cluster back to full replication, you\'ll need to recover the data from any offline bookies. There are two ways to recover bookies\' data:","sidebar":"version-4.14.5/docsSidebar"},"admin/bookies":{"id":"admin/bookies","title":"BookKeeper administration","description":"This document is a guide to deploying, administering, and maintaining BookKeeper. It also discusses best practices and common problems.","sidebar":"version-4.14.5/docsSidebar"},"admin/decomission":{"id":"admin/decomission","title":"Decommission Bookies","description":"In case the user wants to decommission a bookie, the following process is useful to follow in order to verify if the","sidebar":"version-4.14.5/docsSidebar"},"admin/geo-replication":{"id":"admin/geo-replication","title":"Geo-replication","description":"Geo-replication is the replication of data across BookKeeper clusters. In order to enable geo-replication for a group of BookKeeper clusters,"},"admin/http":{"id":"admin/http","title":"BookKeeper Admin REST API","description":"This document introduces BookKeeper HTTP endpoints, which can be used for BookKeeper administration.","sidebar":"version-4.14.5/docsSidebar"},"admin/metrics":{"id":"admin/metrics","title":"Metric collection","description":"BookKeeper enables metrics collection through a variety of stats providers.","sidebar":"version-4.14.5/docsSidebar"},"admin/perf":{"id":"admin/perf","title":"Performance tuning","description":""},"admin/placement":{"id":"admin/placement","title":"Customized placement policies","description":""},"admin/upgrade":{"id":"admin/upgrade","title":"Upgrade","description":"If you have questions about upgrades (or need help), please feel free to reach out to us by mailing list or Slack Channel.","sidebar":"version-4.14.5/docsSidebar"},"api/distributedlog-api":{"id":"api/distributedlog-api","title":"DistributedLog","description":"DistributedLog began its life as a separate project under the Apache Foundation. It was merged into BookKeeper in 2017.","sidebar":"version-4.14.5/docsSidebar"},"api/ledger-adv-api":{"id":"api/ledger-adv-api","title":"The Advanced Ledger API","description":"In release 4.5.0, Apache BookKeeper introduces a few advanced API for advanced usage.","sidebar":"version-4.14.5/docsSidebar"},"api/ledger-api":{"id":"api/ledger-api","title":"The Ledger API","description":"The ledger API is a lower-level API for BookKeeper that enables you to interact with ledgers directly.","sidebar":"version-4.14.5/docsSidebar"},"api/overview":{"id":"api/overview","title":"BookKeeper API","description":"BookKeeper offers a few APIs that applications can use to interact with it:","sidebar":"version-4.14.5/docsSidebar"},"deployment/kubernetes":{"id":"deployment/kubernetes","title":"Deploying Apache BookKeeper on Kubernetes","description":"Apache BookKeeper can be easily deployed in Kubernetes clusters. The managed clusters on Google Container Engine is the most convenient way.","sidebar":"version-4.14.5/docsSidebar"},"deployment/manual":{"id":"deployment/manual","title":"Manual deployment","description":"A BookKeeper cluster consists of two main components:","sidebar":"version-4.14.5/docsSidebar"},"development/codebase":{"id":"development/codebase","title":"The BookKeeper codebase","description":""},"development/protocol":{"id":"development/protocol","title":"The BookKeeper protocol","description":"BookKeeper uses a special replication protocol for guaranteeing persistent storage of entries in an ensemble of bookies.","sidebar":"version-4.14.5/docsSidebar"},"getting-started/concepts":{"id":"getting-started/concepts","title":"BookKeeper concepts and architecture","description":"BookKeeper is a service that provides persistent storage of streams of log entries---aka records---in sequences called ledgers. BookKeeper replicates stored entries across multiple servers.","sidebar":"version-4.14.5/docsSidebar"},"getting-started/installation":{"id":"getting-started/installation","title":"BookKeeper installation","description":"You can install BookKeeper either by downloading a GZipped tarball package or cloning the BookKeeper repository.","sidebar":"version-4.14.5/docsSidebar"},"getting-started/run-locally":{"id":"getting-started/run-locally","title":"Run bookies locally","description":"Bookies are individual BookKeeper servers. You can run an ensemble of bookies locally on a single machine using the localbookie command of the bookkeeper CLI tool and specifying the number of bookies you\'d like to include in the ensemble.","sidebar":"version-4.14.5/docsSidebar"},"overview/overview":{"id":"overview/overview","title":"Apache BookKeeper 4.14.5","description":"\x3c!--","sidebar":"version-4.14.5/docsSidebar"},"reference/cli":{"id":"reference/cli","title":"BookKeeper CLI tool reference","description":"bookkeeper command","sidebar":"version-4.14.5/docsSidebar"},"reference/config":{"id":"reference/config","title":"BookKeeper configuration","description":"The table below lists parameters that you can set to configure bookies. All configuration takes place in the bk_server.conf file in the bookkeeper-server/conf directory of your BookKeeper installation.","sidebar":"version-4.14.5/docsSidebar"},"reference/metrics":{"id":"reference/metrics","title":"BookKeeper metrics reference","description":""},"security/overview":{"id":"security/overview","title":"BookKeeper Security","description":"In the 4.5.0 release, the BookKeeper community added a number of features that can be used, together or separately, to secure a BookKeeper cluster.","sidebar":"version-4.14.5/docsSidebar"},"security/sasl":{"id":"security/sasl","title":"Authentication using SASL","description":"Bookies support client authentication via SASL. Currently we only support GSSAPI (Kerberos). We will start","sidebar":"version-4.14.5/docsSidebar"},"security/tls":{"id":"security/tls","title":"Encryption and Authentication using TLS","description":"Apache BookKeeper allows clients and autorecovery daemons to communicate over TLS, although this is not enabled by default.","sidebar":"version-4.14.5/docsSidebar"},"security/zookeeper":{"id":"security/zookeeper","title":"ZooKeeper Authentication","description":"New Clusters","sidebar":"version-4.14.5/docsSidebar"}}}')}}]);