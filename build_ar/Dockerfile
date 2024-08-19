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

FROM registry.xiaojukeji.com/mq/sre-didi-centos7-base-v2-jdk11013:stable

COPY 899-logsymbol.required.sh  /etc/container/init/
COPY 990-startservice.required.sh  /etc/container/init/
COPY supervisor-bookkeeper-autorecovery.conf /etc/supervisord.d/

ENV DEPLOY_DISF_NOT_NEED_START 1
ENV DEPLOY_APOLLO_NOT_NEED_START 1
# yum -y update tzdata 这个命令专为 sofi环境校正夏令时设置
RUN yum -y update tzdata
RUN mkdir -p /home/xiaoju/pulsar_autorecovery/
RUN mkdir -p /home/xiaoju/dop_autorecovery_tmp/
COPY bookkeeper-server-*-bin.tar.gz /home/xiaoju/dop_autorecovery_tmp/
RUN tar -zxf /home/xiaoju/dop_autorecovery_tmp/bookkeeper-server-*-bin.tar.gz -C /home/xiaoju/pulsar_autorecovery/ --strip-components 1
COPY control.sh /home/xiaoju/pulsar_autorecovery/control.sh
RUN chown -R xiaoju.xiaoju /home/xiaoju/*
