include tests/config.makefile

.DEFAULT_GOAL=help

.PHONY: test
assess: ## test service
	$(MAKE) --directory tests all

.PHONY: build
build: ## build service
	true

.PHONY: help
.SILENT: help
help: ## show make targets
	awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {sub("\\\\n",sprintf("\n%22c"," "), $$2);printf " \033[36m%-20s\033[0m  %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.PHONY: install
install: ## install dependencies
	npm install --also dev

.PHONY: run
run: ## spawn service
	node index.js

# vim: set noexpandtab shiftwidth=4 syntax=make:
