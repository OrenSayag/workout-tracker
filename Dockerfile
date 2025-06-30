FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build-app
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm nx build app --skipNxCache

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
