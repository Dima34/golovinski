##
## General
##
include ./.env

.PHONY: dev stop_dev restart_dev run_container stop_container restart_container run_dev_server

dev: run_container run_dev_server
run_container:
	docker-compose up -d
stop_container:
	docker-compose down
restart_container: stop_container run_container
run_dev_server:
	yarn run dev

##
## Roots/Sage
##

.PHONY: install build-production

install:
	(composer install && yarn install)

build-production:
	(yarn build && composer install --no-dev  --optimize-autoloader)
