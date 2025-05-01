export function sharedTypes(): string {
  return 'shared-types';
}

export enum MarketType {
  Facebook = 'facebook',
  Yad2 = 'yad2',
}

export type TimeRange = {
  from: string;
  to: string;
};

export enum ScoutStatus {
  Active = 'active',
  Inactive = 'inactive',
  Error = 'error',
}
