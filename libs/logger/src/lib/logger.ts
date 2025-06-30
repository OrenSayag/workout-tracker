import pino from 'pino';
import { config } from '@workout-tracker/config';

import path from 'path';

const destination = config.logger.dir
  ? path.join(config.logger.dir, 'workout-tracker.log')
  : undefined;

export const logger = pino({
  level: config.logger.level,
  timestamp: pino.stdTimeFunctions.isoTime,
  transport: {
    targets: [
      config.devMode
        ? {
            target: 'pino-pretty',
          }
        : {
            target: 'pino/file',
            options: { destination: 1 }, // this writes to STDOUT
          },
      destination
        ? {
            target: 'pino/file',
            options: {
              destination,
            },
          }
        : undefined,
    ].filter(Boolean) as (
      | pino.TransportTargetOptions
      | pino.TransportPipelineOptions
    )[],
  },
});
