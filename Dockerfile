FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build-read-market-runner
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm nx run read-market-runner:build
RUN pnpm deploy --filter=read-market-runner --prod /prod/read-market-runner

FROM base AS build-notify-scouts-runner
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm nx run notify-scouts-runner:build
RUN pnpm deploy --filter=notify-scouts-runner --prod /prod/notify-scouts-runner

FROM base AS build-app
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm nx build app --skipNxCache

FROM base AS read-market-runner
# Install Puppeteer dependencies
RUN apt-get update && apt-get install -y \
    chromium \
    fonts-ipafont-gothic \
    fonts-wqy-zenhei \
    fonts-thai-tlwg \
    fonts-kacst \
    fonts-symbola \
    fonts-noto \
    fonts-freefont-ttf \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Set Puppeteer to use the installed Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

COPY --from=build-read-market-runner /prod/read-market-runner /prod/read-market-runner
WORKDIR /prod/read-market-runner
CMD [ "node", "dist/main.js" ]

FROM base AS notify-scouts-runner
COPY --from=build-notify-scouts-runner /prod/notify-scouts-runner /prod/notify-scouts-runner
WORKDIR /prod/notify-scouts-runner
CMD [ "node", "dist/main.js" ]

FROM base AS app
WORKDIR /usr/src/app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=build-app /usr/src/app/apps/app/public ./public

COPY --from=build-app --chown=nextjs:nodejs /usr/src/app/apps/app/.next/standalone ./
COPY --from=build-app --chown=nextjs:nodejs /usr/src/app/apps/app/.next/static ./apps/app/.next/static

USER nextjs

ENV HOSTNAME="0.0.0.0"
EXPOSE 3000
CMD ["node", "apps/app/server.js"]