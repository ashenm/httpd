include tests/config.makefile

.PHONY: help
.SILENT: help
help: ## show make targets
	awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {sub("\\\\n",sprintf("\n%22c"," "), $$2);printf " \033[36m%-20s\033[0m  %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.PHONY: install
install: ## install dependencies
	npm install

.PHONY: run
run: ## spawn service
	node index.js

.PHONY: test
test: ## assess service
	$(MAKE) --directory tests all

# vim: set noexpandtab shiftwidth=4 syntax=make:
