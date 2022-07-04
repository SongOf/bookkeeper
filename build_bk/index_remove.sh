#!/bin/bash
#
# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.
#

BOOKIE_HOME=$(cd $(dirname $0) && pwd -P)

# bin/bookkeeper的全局参量
export BOOKIE_CONF="${BOOKIE_HOME}/conf/bookkeeper.conf"
export index_remove_result_dir=/home/xiaoju/data0/index_remove
export index_remove_result=${index_remove_result_dir}/result

function index_remove() {
    # SERVICE_NAME: e.g, cproxy-1.binlog.fd.rocketmq.fd.didi.com
    SERVICE_NAME="test"
    if [ -f "${BOOKIE_HOME}/.deploy/service.service_name.txt" ]; then
        SERVICE_NAME=$(cat "${BOOKIE_HOME}/.deploy/service.service_name.txt")
    elif [ $DIDIENV_ODIN_SERVICE_NAME ];then
        SERVICE_NAME=$DIDIENV_ODIN_SERVICE_NAME
    fi

     # CLUSTER_NAME: e.g, gz01
     CLUSTER_NAME="test"
      if [ -f "${PROXY_HOME}/.deploy/service.cluster.txt" ]; then
         CLUSTER_NAME=$(cat .deploy/service.cluster.txt)
     elif [ $DIDIENV_ODIN_CLUSTER ]; then
         CLUSTER_NAME=$DIDIENV_ODIN_CLUSTER
     fi

     # SERVICE_CLUSTER_NAME: e.g, gz01.cproxy-1.binlog.fd.rocketmq.fd.didi.com
     SERVICE_CLUSTER_NAME=${CLUSTER_NAME}"."${SERVICE_NAME}
     if [[ ${SERVICE_CLUSTER_NAME} == hnb-pre-v.preview.preview-bookkeeper.dop.ddmq.didi.com ]]; then
         export BOOKIE_CONF="${BOOKIE_HOME}/conf/bk_conf/bookkeeper.preview.conf"
         simple_index_remove
     elif [[ ${SERVICE_CLUSTER_NAME} == hnb-v.level1.bookkeeper.dop.ddmq.didi.com ]]; then
         export BOOKIE_CONF="${BOOKIE_HOME}/conf/bk_conf/bookkeeper.level1.conf"
     elif [[ ${SERVICE_CLUSTER_NAME} == hnb-v.level2.bookkeeper.dop.ddmq.didi.com ]]; then
         case $HOSTNAME in
            level2-bookkeeper-ys-sf-46ced-1[0-9].docker.ys)
                # map旧的10个节点放到这里, bookie 暂时无充足的机器，无法全部迁移到新节点，此机器保留使用
                export BOOKIE_CONF="${BOOKIE_HOME}/conf/bk_conf/bookkeeper.map.conf"
                echo 'this region is igored...........';;
            *)
                export BOOKIE_CONF="${BOOKIE_HOME}/conf/bk_conf/bookkeeper.level2.conf"
                simple_index_remove;;
         esac
     elif [[ ${SERVICE_CLUSTER_NAME} == hnb-v.map.bookkeeper.dop.ddmq.didi.com ]]; then
         # map后续新扩容的节点放到新的服务树
         export BOOKIE_CONF="${BOOKIE_HOME}/conf/bk_conf/bookkeeper.map.conf"
         echo 'this region is igored...........'
     elif [[ ${SERVICE_CLUSTER_NAME} == hnb-v.level3.bookkeeper.dop.ddmq.didi.com ]]; then
         export BOOKIE_CONF="${BOOKIE_HOME}/conf/bk_conf/bookkeeper.level3.conf"
         simple_index_remove
     elif [[ ${SERVICE_CLUSTER_NAME} == hna-v.level1.bookkeeper.dop.ddmq.didi.com ]]; then
        export BOOKIE_CONF="${BOOKIE_HOME}/conf/bk_conf/bookkeeper.level1.gz01.conf"
    elif [[ ${SERVICE_CLUSTER_NAME} == hna-v.level2.bookkeeper.dop.ddmq.didi.com ]]; then
        export BOOKIE_CONF="${BOOKIE_HOME}/conf/bk_conf/bookkeeper.level2.gz01.conf"
        simple_index_remove
    elif [[ ${SERVICE_CLUSTER_NAME} == hna-v.level3.bookkeeper.dop.ddmq.didi.com ]]; then
        export BOOKIE_CONF="${BOOKIE_HOME}/conf/bk_conf/bookkeeper.level3.gz01.conf"
        simple_index_remove
     elif [[ ${SERVICE_CLUSTER_NAME} == hnb-pre-v.perf.bookkeeper.dop.ddmq.didi.com ]]; then
         case $HOSTNAME in
             perf-bookkeeper-ys-sf-94045-[0-2].docker.ys)
                export BOOKIE_CONF="${BOOKIE_HOME}/conf/bk_conf/bookkeeper.perf-1ssd.conf"
                echo "host(${HOSTNAME})迁移步骤开始>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
                sed -i 's/# indexDirectories=/indexDirectories=/g' ${BOOKIE_CONF}
                # 每个目录有这4步处理
                mkdir -p /home/xiaoju/data0/bk_data/data/bookkeeper/indexs/current
                cp /home/xiaoju/data0/bk_data/data/bookkeeper/ledgers/current/VERSION /home/xiaoju/data0/bk_data/data/bookkeeper/indexs/current/
                mv /home/xiaoju/data0/bk_data/data/bookkeeper/ledgers/current/ledgers /home/xiaoju/data0/bk_data/data/bookkeeper/indexs/current/
                mv /home/xiaoju/data0/bk_data/data/bookkeeper/ledgers/current/locations /home/xiaoju/data0/bk_data/data/bookkeeper/indexs/current/
                echo "host(${HOSTNAME})迁移步骤结束<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<";;
             perf-bookkeeper-ys-sf-94045-[3-5].docker.ys)
                export BOOKIE_CONF="${BOOKIE_HOME}/conf/bk_conf/bookkeeper.perf-2ssd.conf"
                echo 'this region is igored...........';;
             perf-bookkeeper-ys-sf-94045-[6-8].docker.ys)
                export BOOKIE_CONF="${BOOKIE_HOME}/conf/bk_conf/bookkeeper.perf-1ssd_1hdd.conf"
                echo 'this region is igored...........';;
             *)
                export BOOKIE_CONF="${BOOKIE_HOME}/conf/bk_conf/bookkeeper.perf.conf"
                echo 'this region is igored...........';;
         esac
     elif [[ ${SERVICE_CLUSTER_NAME} == hnb-pre-v.perf.preview-bookkeeper.dop.ddmq.didi.com ]]; then
          export BOOKIE_CONF="${BOOKIE_HOME}/conf/bk_conf/bookkeeper.preview.perf.conf"
          simple_index_remove
     fi
     mkdir -p ${index_remove_result_dir}
     echo "success" > ${index_remove_result}
}

function simple_index_remove() {
  echo "host(${HOSTNAME})迁移步骤开始>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
  sed -i 's/# indexDirectories=/indexDirectories=/g' ${BOOKIE_CONF}
  data_dir_suffixs=(1 2 3 4 5 6 7 8 9 10)
  for data_dir_suffix in ${data_dir_suffixs[*]}
  do
    index_dir=/home/xiaoju/data0/bk_data/data/bookkeeper/indexs${data_dir_suffix}/current
    ledger_dir=/home/xiaoju/data${data_dir_suffix}/bk_data/data/bookkeeper/ledgers/current
    # 每个目录有这4步处理
    echo "data${data_dir_suffix}-step1: mkdir -p ${index_dir}"
    mkdir -p ${index_dir}

    echo "data${data_dir_suffix}-step2: cp ${ledger_dir}/VERSION ${index_dir}"
    cp ${ledger_dir}/VERSION ${index_dir}

    echo "data${data_dir_suffix}-step3: mv ${ledger_dir}/ledgers ${index_dir}"
    mv ${ledger_dir}/ledgers ${index_dir}

    echo "data${data_dir_suffix}-step4: mv ${ledger_dir}/locations ${index_dir}"
    mv ${ledger_dir}/locations ${index_dir}
    echo 'data${data_dir_suffix} all steps finished----------------'
  done
  echo "host(${HOSTNAME})迁移步骤结束<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"
}

index_remove