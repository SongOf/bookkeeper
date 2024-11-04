#!/bin/bash

# shellcheck disable=SC2124
bookieIds="$@"

bookieRacks=""

for bookieId in $bookieIds; do
    prefix=$(echo $bookieId | awk -F. '{print $1"."$2"."$3}')
    bookieRacks+="/rack_$prefix "
done

echo $bookieRacks | sed 's/[[:space:]]*$//'