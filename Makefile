all: clean install test
test: 
	mocha	--reporter landing
clean:
	rm -rf ./server/node_modules
install:
	cd ./server; npm install . 
.PHONY: test install clean