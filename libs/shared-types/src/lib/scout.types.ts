import { z } from 'zod';
import { MarketType } from './shared-types';

export const upsertScoutSchema = z.object({
  name: z.string().min(1),
  marketType: z.nativeEnum(MarketType),
  entryUrl: z.string().url(),
});

export type UpsertScoutSchema = z.infer<typeof upsertScoutSchema>;
