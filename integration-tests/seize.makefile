include config.makefile

.PHONY: before_script
before_script:
	mkdir -p /tmp/mock-server/seize
	touch /tmp/mock-server/seize/small.bin
	dd bs=4k count=128k status=progress if=/dev/zero of=/tmp/mock-server/seize/large.bin
	npx http-server /tmp/mock-server/seize --port $(shell expr $(PORT) + 1) & \
	  echo $$! | tee /tmp/mock-server/seize/server.pid && sleep 5s
	ls --format=long /tmp/mock-server/seize
	curl --silent --show-error --fail --output /dev/null --url 'http://localhost:$(shell expr $(PORT) + 1)/'
	curl --silent --show-error --fail --output /dev/null --url 'http://localhost:$(shell expr $(PORT) + 1)/large.bin'

.PHONY: script
script: before_script
	curl --silent --show-error --fail --output /dev/null --url 'http://localhost:${PORT}/seize?url=http://localhost:$(shell expr $(PORT) + 1)/small.bin'
	curl --silent --show-error --fail --output /dev/null --url 'http://localhost:${PORT}/seize?url=http://localhost:$(shell expr $(PORT) + 1)/large.bin'

.PHONY: clean
clean:
	kill -9 $(shell cat /tmp/mock-server/seize/server.pid)
	rm -rf /tmp/mock-server/seize

# vim: set noexpandtab shiftwidth=4 syntax=make:
