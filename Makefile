all: clean install test
test: 
	mocha	--reporter landing
clean:
	rm -rf ./node_modules
install:
	 npm install . 
.PHONY: test install clean
