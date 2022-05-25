.PHONY: help
.SILENT: help
help: ## show make targets
	awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {sub("\\\\n",sprintf("\n%22c"," "), $$2);printf " \033[36m%-20s\033[0m  %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.PHONY: root
root: ## root controller assessments
	$(MAKE) --file root.makefile script
	$(MAKE) --file root.makefile clean

.PHONY: seize
seize: ## seize controller assessments
	$(MAKE) --file seize.makefile script
	$(MAKE) --file seize.makefile clean

.PHONY: all
all: root seize

# vim: set noexpandtab shiftwidth=4 syntax=make:
