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
export version_update_result_dir=/home/xiaoju/data0/index_remove
export version_update_result=${version_update_result_dir}/result

function version_update_main() {
    export journal_dir_list=(/home/xiaoju/data0/bk_data/data/bookkeeper/journal /home/xiaoju/data0/bk_data/data/bookkeeper/journal2 /home/xiaoju/data0/bk_data/data/bookkeeper/journal3 /home/xiaoju/data0/bk_data/data/bookkeeper/journal4 /home/xiaoju/data0/bk_data/data/bookkeeper/journal5)
    export ledger_dir_list=(/home/xiaoju/data1/bk_data/data/bookkeeper/ledgers /home/xiaoju/data2/bk_data/data/bookkeeper/ledgers /home/xiaoju/data3/bk_data/data/bookkeeper/ledgers /home/xiaoju/data4/bk_data/data/bookkeeper/ledgers /home/xiaoju/data5/bk_data/data/bookkeeper/ledgers /home/xiaoju/data6/bk_data/data/bookkeeper/ledgers /home/xiaoju/data7/bk_data/data/bookkeeper/ledgers /home/xiaoju/data8/bk_data/data/bookkeeper/ledgers /home/xiaoju/data9/bk_data/data/bookkeeper/ledgers /home/xiaoju/data10/bk_data/data/bookkeeper/ledgers)
    export index_dir_list=(/home/xiaoju/data0/bk_data/data/bookkeeper/indexs1 /home/xiaoju/data0/bk_data/data/bookkeeper/indexs2 /home/xiaoju/data0/bk_data/data/bookkeeper/indexs3 /home/xiaoju/data0/bk_data/data/bookkeeper/indexs4 /home/xiaoju/data0/bk_data/data/bookkeeper/indexs5 /home/xiaoju/data0/bk_data/data/bookkeeper/indexs6 /home/xiaoju/data0/bk_data/data/bookkeeper/indexs7 /home/xiaoju/data0/bk_data/data/bookkeeper/indexs8 /home/xiaoju/data0/bk_data/data/bookkeeper/indexs9 /home/xiaoju/data0/bk_data/data/bookkeeper/indexs10)
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
         export journal_dir_list=(/home/xiaoju/data0/bk_data/data/bookkeeper/journal)
         export ledger_dir_list=(/home/xiaoju/data1/bk_data/data/bookkeeper/ledgers /home/xiaoju/data2/bk_data/data/bookkeeper/ledgers /home/xiaoju/data3/bk_data/data/bookkeeper/ledgers /home/xiaoju/data4/bk_data/data/bookkeeper/ledgers /home/xiaoju/data5/bk_data/data/bookkeeper/ledgers /home/xiaoju/data6/bk_data/data/bookkeeper/ledgers /home/xiaoju/data7/bk_data/data/bookkeeper/ledgers /home/xiaoju/data8/bk_data/data/bookkeeper/ledgers /home/xiaoju/data9/bk_data/data/bookkeeper/ledgers /home/xiaoju/data10/bk_data/data/bookkeeper/ledgers)
         export index_dir_list=(/home/xiaoju/data0/bk_data/data/bookkeeper/indexs1 /home/xiaoju/data0/bk_data/data/bookkeeper/indexs2 /home/xiaoju/data0/bk_data/data/bookkeeper/indexs3 /home/xiaoju/data0/bk_data/data/bookkeeper/indexs4 /home/xiaoju/data0/bk_data/data/bookkeeper/indexs5 /home/xiaoju/data0/bk_data/data/bookkeeper/indexs6 /home/xiaoju/data0/bk_data/data/bookkeeper/indexs7 /home/xiaoju/data0/bk_data/data/bookkeeper/indexs8 /home/xiaoju/data0/bk_data/data/bookkeeper/indexs9 /home/xiaoju/data0/bk_data/data/bookkeeper/indexs10)
         simple_version_update "${journal_dir_list[*]}" "${ledger_dir_list[*]}" "${index_dir_list[*]}"
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
                simple_version_update "${journal_dir_list[*]}" "${ledger_dir_list[*]}" "${index_dir_list[*]}" ;;
         esac
     elif [[ ${SERVICE_CLUSTER_NAME} == hnb-v.map.bookkeeper.dop.ddmq.didi.com ]]; then
         # map后续新扩容的节点放到新的服务树
         export BOOKIE_CONF="${BOOKIE_HOME}/conf/bk_conf/bookkeeper.map.conf"
         echo 'this region is igored...........'
     elif [[ ${SERVICE_CLUSTER_NAME} == hnb-v.level3.bookkeeper.dop.ddmq.didi.com ]]; then
         export BOOKIE_CONF="${BOOKIE_HOME}/conf/bk_conf/bookkeeper.level3.conf"
         export journal_dir_list=(/home/xiaoju/data0/bk_data/data/bookkeeper/journal)
         export ledger_dir_list=(/home/xiaoju/data1/bk_data/data/bookkeeper/ledgers /home/xiaoju/data2/bk_data/data/bookkeeper/ledgers /home/xiaoju/data3/bk_data/data/bookkeeper/ledgers /home/xiaoju/data4/bk_data/data/bookkeeper/ledgers /home/xiaoju/data5/bk_data/data/bookkeeper/ledgers /home/xiaoju/data6/bk_data/data/bookkeeper/ledgers /home/xiaoju/data7/bk_data/data/bookkeeper/ledgers /home/xiaoju/data8/bk_data/data/bookkeeper/ledgers /home/xiaoju/data9/bk_data/data/bookkeeper/ledgers /home/xiaoju/data10/bk_data/data/bookkeeper/ledgers)
         export index_dir_list=(/home/xiaoju/data0/bk_data/data/bookkeeper/indexs1 /home/xiaoju/data0/bk_data/data/bookkeeper/indexs2 /home/xiaoju/data0/bk_data/data/bookkeeper/indexs3 /home/xiaoju/data0/bk_data/data/bookkeeper/indexs4 /home/xiaoju/data0/bk_data/data/bookkeeper/indexs5 /home/xiaoju/data0/bk_data/data/bookkeeper/indexs6 /home/xiaoju/data0/bk_data/data/bookkeeper/indexs7 /home/xiaoju/data0/bk_data/data/bookkeeper/indexs8 /home/xiaoju/data0/bk_data/data/bookkeeper/indexs9 /home/xiaoju/data0/bk_data/data/bookkeeper/indexs10)
         simple_version_update "${journal_dir_list[*]}" "${ledger_dir_list[*]}" "${index_dir_list[*]}"
     elif [[ ${SERVICE_CLUSTER_NAME} == hna-v.level1.bookkeeper.dop.ddmq.didi.com ]]; then
        export BOOKIE_CONF="${BOOKIE_HOME}/conf/bk_conf/bookkeeper.level1.gz01.conf"
    elif [[ ${SERVICE_CLUSTER_NAME} == hna-v.level2.bookkeeper.dop.ddmq.didi.com ]]; then
        export BOOKIE_CONF="${BOOKIE_HOME}/conf/bk_conf/bookkeeper.level2.gz01.conf"
        simple_version_update "${journal_dir_list[*]}" "${ledger_dir_list[*]}" "${index_dir_list[*]}"
    elif [[ ${SERVICE_CLUSTER_NAME} == hna-v.level3.bookkeeper.dop.ddmq.didi.com ]]; then
        export BOOKIE_CONF="${BOOKIE_HOME}/conf/bk_conf/bookkeeper.level3.gz01.conf"
        simple_version_update "${journal_dir_list[*]}" "${ledger_dir_list[*]}" "${index_dir_list[*]}"
     elif [[ ${SERVICE_CLUSTER_NAME} == hnb-pre-v.perf.bookkeeper.dop.ddmq.didi.com ]]; then
         case $HOSTNAME in
             perf-bookkeeper-ys-sf-94045-[0-2].docker.ys)
                BOOKIE_CONF="${BOOKIE_HOME}/conf/bk_conf/bookkeeper.perf-1ssd.conf"
                export journal_dir_list=(/home/xiaoju/data0/bk_data/data/bookkeeper/journal)
                export ledger_dir_list=(/home/xiaoju/data0/bk_data/data/bookkeeper/ledgers)
                export index_dir_list=(/home/xiaoju/data0/bk_data/data/bookkeeper/indexs)
                simple_version_update "${journal_dir_list[*]}" "${ledger_dir_list[*]}" "${index_dir_list[*]}"
                ;;
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
          simple_version_update "${journal_dir_list[*]}" "${ledger_dir_list[*]}" "${index_dir_list[*]}"
     fi
     mkdir -p ${version_update_result_dir}
     echo "success" > ${version_update_result}
}

function list_to_string() {
    for par in $1
    do
        if [[ -z $result ]]; then
            result=$par
        else
            result=$result","$par
        fi
    done
    echo $result
}

function update_local_version() {
    version_dir=$1
    dist_dirs=$2
    for d in ${dist_dirs}
    do
        mkdir -p "$d/current"
        cp "${version_dir}" "$d/current"
    done
}

function simple_version_update() {
    echo "host(${HOSTNAME}) version update 步骤开始>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
    tmp_journal_dir_list=$1
    tmp_ledger_dir_list=$2
    tmp_index_dir_list=$3
    tmp_version_dir="/home/xiaoju/data0/bk_version"

    tmp_instance_id=`export BOOKIE_LOG_CONF=${BOOKIE_HOME}/conf/log4j.shell.properties;${BOOKIE_HOME}/bin/bookkeeper shell whatisinstanceid |grep 'InstanceId:'|awk -F 'InstanceId: ' '{print $2}'`
    echo "--------------STEP1. Get bookie instanceId finished,instance_id=${tmp_instance_id}"

    tmp_journal_dirs=`list_to_string "${tmp_journal_dir_list}"`
    tmp_ledger_dirs=`list_to_string "${tmp_ledger_dir_list}"`
    tmp_index_dirs=`list_to_string "${tmp_index_dir_list}"`
    tmp_ip=`ip route get 1.2.3.4 | awk '{print $7}'`
    tmp_bookie_id="${tmp_ip}:3181"
    mkdir -p ${tmp_version_dir}
    echo "STEP2. exec command is :  export BOOKIE_LOG_CONF=${BOOKIE_HOME}/conf/log4j.shell.properties;${BOOKIE_HOME}/bin/bookkeeper shell cookie_generate -i ${tmp_instance_id} --journal-dirs ${tmp_journal_dirs} --ledger-dirs ${tmp_ledger_dirs} --index-dirs ${tmp_index_dirs} -o ${tmp_version_dir}/VERSION ${tmp_bookie_id}"
    export BOOKIE_LOG_CONF=${BOOKIE_HOME}/conf/log4j.shell.properties;${BOOKIE_HOME}/bin/bookkeeper shell cookie_generate -i ${tmp_instance_id} --journal-dirs ${tmp_journal_dirs} --ledger-dirs ${tmp_ledger_dirs} --index-dirs ${tmp_index_dirs} -o ${tmp_version_dir}/VERSION ${tmp_bookie_id}
    echo "--------------STEP2. Generate the latest version file finished,VERSION is :"; cat ${tmp_version_dir}/VERSION

    update_local_version "${tmp_version_dir}/VERSION" "${tmp_journal_dir_list}"
    update_local_version "${tmp_version_dir}/VERSION" "${tmp_ledger_dir_list}"
    update_local_version "${tmp_version_dir}/VERSION" "${tmp_index_dir_list}"
    echo "STEP3. copy to journal_dirs and ledger_dirs finished."
    
    echo "STEP4. exec command is :  ${BOOKIE_HOME}/bin/carrera_bookkeeper shell cookie_update --cookie-file ${tmp_version_dir}/VERSION ${tmp_bookie_id}"
    ${BOOKIE_HOME}/bin/carrera_bookkeeper shell cookie_update --cookie-file "${tmp_version_dir}/VERSION" ${tmp_bookie_id}
    echo "STEP4. Update cookie to Zookeeper finished."
    echo "success" > "${tmp_version_dir}/result"
    echo "host(${HOSTNAME}) version update 步骤结束<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"
}

version_update_main