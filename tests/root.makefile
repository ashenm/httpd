include config.makefile

.PHONY: before_script
before_script:
	true

.PHONY: script
script: before_script
	curl --silent --show-error --fail-early --output /dev/null --url 'http://localhost:${PORT}/'
	curl --silent --show-error --fail-early --output /dev/null --url 'http://localhost:${PORT}/echo'

.PHONY: clean
clean:
	true

# vim: set noexpandtab shiftwidth=4 syntax=make:
