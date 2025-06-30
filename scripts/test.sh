docker run --rm \
	--env-file ../.env \
	--volume $(pwd)/puppeteer-data:/app/puppeteer-data \
	--volume $(pwd)/screenshots:/app/screenshots \
	--network workout-tracker_default \
	test:latest
