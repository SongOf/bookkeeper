#!/usr/bin/env bash

find_module_jar_at() {
#  REGEX="^${MODULE}-[0-9\\.]*((-[a-zA-Z]*(-[0-9]*)?)|(-SNAPSHOT))?.jar$"
  # add custom version: 4.14.2-***-SNAPSHOT, for example: 4.14.3-dop-SNAPSHOT
  REGEX="^${MODULE}-[0-9\\.]*((-[a-zA-Z]*(-[0-9]*)?)|(.+-SNAPSHOT))?.jar$"
  if [[ ${JAR_NAME} =~ ${REGEX} ]]; then
    echo "find jar"
  else
    echo "not find jar"
  fi
}

export MODULE=bookkeeper-server
JAR_NAME=bookkeeper-server-4.14.3-dop-SNAPSHOT-javadoc.jar
find_module_jar_at

export JAR_NAME=bookkeeper-server-4.14.3-dop-SNAPSHOT.jar
find_module_jar_at

JAR_NAME=bookkeeper-server-4.14.3-dop-javadoc.jar
find_module_jar_at

export JAR_NAME=bookkeeper-server-4.14.3-dop.jar
find_module_jar_at
