#!/bin/sh

docker-compose build
docker-compose up -d
docker logs mirror-console --follow
