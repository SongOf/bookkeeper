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

SERVICE="bookie"
BOOKIE_HOME=$(cd $(dirname $0) && pwd -P)
BOOKIE_PID_DIR=${BOOKIE_HOME}
PIDFILE="${BOOKIE_PID_DIR}/bin/pulsar-${SERVICE}.pid"

# 本脚本 log 变量
export BOOKIE_LOG_DIR="${BOOKIE_HOME}/logs"
export BOOKIE_LOG_FILE="pulsar-bookie.log"
# bin/bookkeeper的全局参量
export BOOKIE_LOG_CONF=${BOOKIE_HOME}/conf/log4j2.yaml
# bin/bookkeeper的全局参量
export BOOKIE_CONF="${BOOKIE_HOME}/conf/bookkeeper.conf"
# bin/common.sh的全局参量
export BOOKIE_MEM_OPTS="-Xms20G -Xmx20G -XX:MaxDirectMemorySize=20G"

CONTROL_LOG="${BOOKIE_LOG_DIR}/control.log"
CONSOLE_OUT_LOG="${BOOKIE_LOG_DIR}/console_out.log"
BOOKIE_ROOT_LOGGER="INFO"
CGROUP_ENABLE="false"

# Check for the java to use
if [[ -z $JAVA_HOME ]]; then
    JAVA=$(which java)
    if [ $? != 0 ]; then
        echo "Error: JAVA_HOME not set, and no java executable found in $PATH." 1>&2
        exit 1
    fi
else
    JAVA=$JAVA_HOME/bin/java
fi

function start() {
    check_pid
    if [ $? -ne 0 ]; then
        echo "pulsar-${SERVICE} is already running, pid=$pid. Stop it first!"
        exit 1
    fi

    backup_logs
    date >> ${CONSOLE_OUT_LOG}
    JDK_VERSION=`${JAVA} -version 2>&1|grep "java version"|awk '{print $3}'`
    echo "JDK_VERSION: " $JDK_VERSION
    BOOKIE_GC="-XX:InitiatingHeapOccupancyPercent=70 -XX:G1HeapRegionSize=32m"
    BOOKIE_GC_LOG_FILE="${BOOKIE_LOG_DIR}/gc.log"
    BOOKIE_GC_LOG="-XX:+PrintGCDateStamps"

    if [[ "$JDK_VERSION" =~ ^\"11.0 ]]; then
          BOOKIE_GC_LOG="-Xlog:gc*,safepoint:file=${BOOKIE_GC_LOG_FILE}:time,tid,pid,tags:filecount=5,filesize=512m"
    fi
    BOOKIE_GC="${BOOKIE_GC} ${BOOKIE_GC_LOG}"

    #docker machine flag,if it's a docker machine, get real memory and set the flag 1
    DOCKER_MACHINE=0
    #docker machine memory
    DOCKER_MEM=4096
    if [[ $HOSTNAME && $HOSTNAME =~ docker && $DIDIENV_ODIN_INSTANCE_QUOTA_MEM && $DIDIENV_ODIN_INSTANCE_TYPE && $DIDIENV_ODIN_INSTANCE_TYPE == "dd_docker" ]];then
	    DOCKER_MACHINE=1
	    DOCKER_MEM=$DIDIENV_ODIN_INSTANCE_QUOTA_MEM
	    echo "deploy machine is docker container,hostname=$HOSTNAME||memory=$DOCKER_MEM mb"
    fi

   #for docker machine, change default memory limit
    if ((DOCKER_MACHINE==1));then
  	    HEAP_SIZE=$((DOCKER_MEM*4/10))
        DIRECT_MEMORY_SIZE=$((DOCKER_MEM*4/10))
   	    BOOKIE_MEM_OPTS="-Xms${HEAP_SIZE}m -Xmx${HEAP_SIZE}m -XX:MaxDirectMemorySize=${DIRECT_MEMORY_SIZE}m"
    fi

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
    if [[ $SERVICE_NAME == *"bookkeeper"*"iot"* ]]; then #处理iot场景的bookkeeper集群
        BOOKIE_MEM_OPTS="-Xms20G -Xmx20G -XX:MaxDirectMemorySize=20G"
        BOOKKEEPER_CONF_ENV="online"
        case "$SERVICE_NAME" in
            *test*)
                BOOKKEEPER_CONF_ENV="test"
            ;;
            *preview*)
                BOOKKEEPER_CONF_ENV="preview"
            ;;
            *public*)
                if [[ $CLUSTER_NAME && $CLUSTER_NAME =~ "us01" ]]; then
                  BOOKKEEPER_CONF_CLUSTER="us01-public"
                else
                  BOOKKEEPER_CONF_CLUSTER="public"
                fi
            ;;
            *car*)
                BOOKKEEPER_CONF_CLUSTER="car"
            ;;
            *bike*)
                BOOKKEEPER_CONF_CLUSTER="bike"
            ;;
            *mqtt-bike*)
                BOOKKEEPER_CONF_CLUSTER="mqtt-bike"
            ;;
        esac
        #判断iot的bk集群是否带有编号，如public-0.public.bookkeeper.iot.ddmq.didi.com，表示iot public集群的0号bookkeeper集群，需要使用0号对应的配置
        SERVICE_NAME_PREFIX=${SERVICE_NAME%%.*}
        SERVIVE_NAME_NUM=${SERVICE_NAME_PREFIX##*-}
        IS_NUMBER=`echo $SERVIVE_NAME_NUM|sed 's/[0-9]//g'`
        if [ -z $IS_NUMBER ];then
            if [ $BOOKKEEPER_CONF_CLUSTER ]; then
                BOOKIE_CONF="${BOOKIE_HOME}/conf/iot_conf/$BOOKKEEPER_CONF_ENV/$BOOKKEEPER_CONF_CLUSTER-$BOOKKEEPER_CONF_ENV-bookkeeper-$SERVIVE_NAME_NUM.conf"
            else
                BOOKIE_CONF="${BOOKIE_HOME}/conf/iot_conf/$BOOKKEEPER_CONF_ENV/$BOOKKEEPER_CONF_ENV-bookkeeper-$SERVIVE_NAME_NUM.conf"
            fi
        else
            BOOKIE_CONF="${BOOKIE_HOME}/conf/iot_conf/bookkeeper.conf"
        fi
    elif [[ ${SERVICE_NAME} == preview.preview-bookkeeper.dop.ddmq.didi.com ]]; then
      BOOKIE_CONF="${BOOKIE_HOME}/conf/bk_conf/bookkeeper.preview.conf"
    elif [[ ${SERVICE_NAME} == level1.bookkeeper.dop.ddmq.didi.com ]]; then
        BOOKIE_CONF="${BOOKIE_HOME}/conf/bk_conf/bookkeeper.level1.conf"
    elif [[ ${SERVICE_NAME} == level2.bookkeeper.dop.ddmq.didi.com ]]; then
        BOOKIE_CONF="${BOOKIE_HOME}/conf/bk_conf/bookkeeper.level2.conf"
    elif [[ ${SERVICE_NAME} == level3.bookkeeper.dop.ddmq.didi.com ]]; then
        BOOKIE_CONF="${BOOKIE_HOME}/conf/bk_conf/bookkeeper.level3.conf"
    elif [[ ${SERVICE_NAME} == perf.bookkeeper.dop.ddmq.didi.com ]]; then
      BOOKIE_CONF="${BOOKIE_HOME}/conf/bk_conf/bookkeeper.perf.conf"
    fi

    # log directory & file
    BOOKIE_LOG_DIR=${BOOKIE_LOG_DIR:-"$BOOKIE_HOME/logs"}
    BOOKIE_LOG_APPENDER=${BOOKIE_LOG_APPENDER:-"RollingFile"}
    BOOKIE_LOG_ROOT_LEVEL=${BOOKIE_LOG_ROOT_LEVEL:-"info"}
    BOOKIE_ROOT_LOGGER=${BOOKIE_ROOT_LOGGER:-"info"}
    BOOKIE_ROUTING_APPENDER_DEFAULT=${BOOKIE_ROUTING_APPENDER_DEFAULT:-"Console"}

    # OPTS values
    # Ensure we can read bigger content from ZK. (It might be
    # rarely needed when trying to list many z-nodes under a
    # directory)
    OPTS="$OPTS -Djute.maxbuffer=10485760"
    # Allow Netty to use reflection access
    OPTS="$OPTS -Dio.netty.tryReflectionSetAccessible=true"
    #Configure log configuration system properties
    LOG_OPTS="-Dlog4j.configurationFile=`basename $BOOKIE_LOG_CONF`
             -DLog4jContextSelector=org.apache.logging.log4j.core.async.AsyncLoggerContextSelector
             -DAsyncLoggerConfig.RingBufferSize=262144
             -Dlog4j2.AsyncQueueFullPolicy=Discard
             -Dlog4j2.DiscardThreshold=ERROR
             -Dlog4j2.formatMsgNoLookups=true "

    OPTS="$OPTS $LOG_OPTS"
    OPTS="$OPTS -Dpulsar.log.appender=${BOOKIE_LOG_APPENDER}"
    OPTS="$OPTS -Dpulsar.log.dir=$BOOKIE_LOG_DIR"
    OPTS="$OPTS -Dpulsar.log.file=$BOOKIE_LOG_FILE"
    OPTS="$OPTS -Dpulsar.log.level=$BOOKIE_ROOT_LOGGER"
    OPTS="$OPTS -Dpulsar.log.root.level=$BOOKIE_LOG_ROOT_LEVEL"
    OPTS="$OPTS -Dpulsar.routing.appender.default=$BOOKIE_ROUTING_APPENDER_DEFAULT"
    # Configure log4j2 to disable servlet webapp detection so that Garbage free logging can be used
    OPTS="$OPTS -Dlog4j2.is.webapp=false"
    JMX_OPTS="-Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.port=9011 -Dcom.sun.management.jmxremote.local.only=false
              -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false"
    OPTS="$OPTS ${BOOKIE_GC} ${JMX_OPTS}"

    # bin/bookkeeper的全局参量
    export OPTS

    echo "SERVICE_NAME:" ${SERVICE_NAME}",   configs:"
    echo "  BOOKIE_CONF:" ${BOOKIE_CONF}
    echo "  BOOKIE_MEM_OPTS:" ${BOOKIE_MEM_OPTS}
    echo "  BOOKIE_LOG_DIR:" ${BOOKIE_LOG_DIR}
    echo "  BOOKIE_LOG_CONF:" ${BOOKIE_LOG_CONF}
    echo "  OPTS:" ${OPTS}

    #添加判读cgroup是否开启的逻辑
    if [ "$CGROUP_ENABLE" == "true" ];then
        CMD_PREFIX="cgexec -g cpu:pulsar-${SERVICE}"
    else
        CMD_PREFIX="exec"
    fi

    ${CMD_PREFIX} ${BOOKIE_HOME}/bin/bookkeeper bookie >> ${CONSOLE_OUT_LOG} 2>&1
}

function stop() {
    date >> ${CONTROL_LOG}
    check_pid
    if [ $? -ne 0 ]; then
        echo "Killing pulsar-${SERVICE} =$pid" >> ${CONTROL_LOG}
        pkill -f hangAlarm.sh
        kill ${pid}
    else
        echo "pulsar-${SERVICE} is already stopped"
    fi
    t=0
    check_pid
    while [[ $? -ne 0 && "$t" -lt 120 ]]; do
        echo "time=$t,killing $pid"
        t=$(($t+1))
        sleep 1
        check_pid
    done
    check_pid
    if [ $? -eq 0 ];then
        echo "" > ${PIDFILE}
        echo "pulsar-${SERVICE} is stopped"
        echo "KILLED" >> ${CONTROL_LOG}
    else
        echo "stop timeout"
        echo "Stop pulsar-${SERVICE} Failed" >> ${CONTROL_LOG}
        exit 1
    fi
}

function backup_logs() {
    #bakup log
    echo "backup log"
    if [ ! -x ${BOOKIE_LOG_DIR}/old ]; then
      mkdir -p ${BOOKIE_LOG_DIR}/old
    fi

    LOG_SUFFIX=$(date +%Y%m%d-%H%M%S)
    for var in $(ls ${BOOKIE_LOG_DIR})
    do
        if [ -f "${BOOKIE_LOG_DIR}/${var}" -a "${var}" != "control.log" ]; then
            mv "${BOOKIE_LOG_DIR}/${var}" "${BOOKIE_LOG_DIR}/old/${var}.${LOG_SUFFIX}"
        fi
    done
}

function get_pid() {
    pid=""
    if [ -f ${PIDFILE} ]; then
        pid=$(cat ${PIDFILE})
    fi
    real_pid=""
    if [ "x_" != "x_${pid}" ]; then
        real_pid=`(ls -l /proc/${pid}/cwd 2>/dev/null| grep "${BOOKIE_HOME}" &>/dev/null) && echo ${pid}`
    fi
    echo "${real_pid}"
}

function check_pid() {
    pid=$(get_pid)
    if [ "x_" != "x_${pid}" ]; then
        running=$(ps -p ${pid}|grep -v "PID TTY" |wc -l)
        return ${running}
    fi
    return 0
}

function status(){
    check_pid
    local running=$?
    if [ ${running} -ne 0 ];then
        local pid=$(get_pid)
        echo "this pulsar-${SERVICE} is started, pid=${pid}"
    else
        echo "this pulsar-${SERVICE} is stopped"
    fi
    exit 0
}

case "$1" in
    "start")
        start
        exit 0
        ;;
    "stop")
        stop
        exit 0
        ;;
    "reload")
        stop
        start
        exit 0
        ;;
    "status" )
        # 检查服务
        status
        ;;
    *)
        echo "supporting cmd: start/stop/reload/status"
        exit 1
        ;;
esac

