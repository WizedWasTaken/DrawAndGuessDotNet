export interface IIdentityUser<TKey> {
  id: TKey;
  userName?: string;
  normalizedUserName?: string;
  email?: string;
  normalizedEmail?: string;
  passwordHash?: string;
  securityStamp?: string;
  concurrencyStamp?: string;
  phoneNumber?: string;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd?: string;
  lockoutEnabled: boolean;
  accessFailedCount: number;
}

export class IdentityUser<TKey> implements IIdentityUser<TKey> {
  id: TKey;
  userName?: string;
  normalizedUserName?: string;
  email?: string;
  normalizedEmail?: string;
  passwordHash?: string;
  securityStamp?: string;
  concurrencyStamp?: string;
  phoneNumber?: string;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd?: string;
  lockoutEnabled: boolean;
  accessFailedCount: number;

  constructor(
    id: TKey,
    userName: string,
    email: string,
    phoneNumberConfirmed: boolean,
    twoFactorEnabled: boolean,
    lockoutEnabled: boolean,
    accessFailedCount: number
  ) {
    this.id = id;
    this.userName = userName;
    this.email = email;
    this.phoneNumberConfirmed = phoneNumberConfirmed;
    this.twoFactorEnabled = twoFactorEnabled;
    this.lockoutEnabled = lockoutEnabled;
    this.accessFailedCount = accessFailedCount;
  }
}
