docker run --rm \
	--env-file ../.env \
	--volume $(pwd)/puppeteer-data:/app/puppeteer-data \
	--volume $(pwd)/screenshots:/app/screenshots \
	--network life-stats_default \
	test:latest
