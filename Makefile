.DEFAULT_GOAL=help
PORT?=8080

build:
	true

.PHONY: help
.SILENT: help
help: ## show make targets
	awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {sub("\\\\n",sprintf("\n%22c"," "), $$2);printf " \033[36m%-20s\033[0m  %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install: ## install dependencies
	npm install

run: ## spawn service
	node index.js

test: ## assess service
	curl --silent --show-error --fail-early --output /dev/null --url 'http://localhost:${PORT}/'
	curl --silent --show-error --fail-early --output /dev/null --url 'http://localhost:${PORT}/echo'

# vim: set noexpandtab shiftwidth=4 syntax=make:
