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

set -x
if [ -d "/usr/local/jdk1.8.0_65" ]; then 
    export JAVA_HOME=/usr/local/jdk1.8.0_65
    export PATH=$JAVA_HOME/bin:$PATH
fi
export MAVEN_HOME=/home/scmtools/thirdparty/maven-3.6.3
export PATH=$MAVEN_HOME/bin:$PATH

BASEDIR=$(dirname "$0")
CURDIR=`pwd`
echo "CURDIR: $CURDIR"
cd ${BASEDIR}/
echo "cd ${BASEDIR}/"

echo "start build bookkeeper....."
mvn clean package -DskipTests -T2C
ret=$?
if [ $ret -ne 0 ];then
    echo "===== maven build failure ====="
    exit $ret
else
    echo -n "===== maven build successfully! ====="
fi

OUTPUT_PATH=${CURDIR}/output
mkdir -p ${OUTPUT_PATH}

if [ ! -d "bookkeeper-dist/server/target/" ];then
  echo "==== bookkeeper-dist/server/target not exist ===="
  exit 1
fi
tree -h bookkeeper-dist/server/target
cp bookkeeper-dist/server/target/bookkeeper-server-*-bin.tar.gz  ${OUTPUT_PATH}
cp -rf docker-build/* ${OUTPUT_PATH}