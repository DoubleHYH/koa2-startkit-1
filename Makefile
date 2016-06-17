.PHONY: config

app/config/production.js: app/config/demo.js
	cp app/config/demo.js app/config/production.js

app/config/development.js:
	cp app/config/demo.js app/config/development.js

config: app/config/development.js app/config/production.js

