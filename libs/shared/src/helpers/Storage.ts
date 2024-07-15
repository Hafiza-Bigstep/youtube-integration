import { pull } from 'lodash';

import { JsonValue } from '../types/JSONType';

export enum StorageKeys {
  AUTH_TOKEN = 'JWT_AUTH_TOKEN',
}

export const AUTH_TOKEN = StorageKeys.AUTH_TOKEN;

type Value = JsonValue;
type ValueRaw = string;

export interface StorageData {
  [StorageKeys.AUTH_TOKEN]: string | null;
  [key: string]: Value | StorageData[keyof StorageData];
}

export type StorageProvider = {
  setItem(key: string, value: ValueRaw): Promise<unknown>;
  getItem(key: string): Promise<ValueRaw | null>;
  removeItem(key: string): Promise<void>;
  clear(): Promise<void>;
};

export default class Storage {
  static AUTH_TOKEN = StorageKeys.AUTH_TOKEN as const;

  static provider: StorageProvider | undefined;

  static subscriptions: {
    [Key in keyof StorageData]?: ((val: StorageData[Key]) => void)[];
  } = {};

  static setProvider(provider: StorageProvider) {
    this.provider = provider;
  }

  static async setItem<Key extends keyof StorageData>(
    key: Key,
    data: StorageData[Key]
  ): Promise<void>;

  static async setItem<Key extends keyof StorageData>(
    key: Key,
    data: unknown
  ): Promise<void>;

  static async setItem<Key extends keyof StorageData>(
    key: Key,
    data: unknown
  ): Promise<void> {
    const provider = this.getProviderOrThrow();

    if (data === null || data === undefined) {
      // setting a null object will fail, should be removed instead.
      return this.removeItem(key);
    }

    provider.setItem(
      key as string,
      typeof data === 'string' ? data : JSON.stringify(data)
    );
    await this.runCallback(key);
  }

  static async getItem<Key extends keyof StorageData>(
    key: Key
  ): Promise<StorageData[Key]>;

  static async getItem<Key extends keyof StorageData>(key: Key): Promise<Value>;

  static async getItem<Key extends keyof StorageData>(
    key: Key
  ): Promise<StorageData[Key]> {
    const data = await this.getItemMaybe(key);
    if (!data) {
      throw new Error(`${key} not found`);
    }
    return data;
  }

  static async getItemMaybe<Key extends keyof StorageData>(
    key: Key
  ): Promise<StorageData[Key] | null>;

  static async getItemMaybe<Key extends keyof StorageData>(
    key: Key
  ): Promise<Value>;

  static async getItemMaybe<Key extends keyof StorageData>(
    key: Key
  ): Promise<Value | null> {
    const provider = this.getProviderOrThrow();
    const data = await provider.getItem(key as string);
    if (data) {
      try {
        return JSON.parse(data);
      } catch {
        // ignore
      }
    }
    return data;
  }

  static async removeItem<Key extends keyof StorageData>(
    key: Key
  ): Promise<void> {
    const provider = this.getProviderOrThrow();
    await provider.removeItem(key as string);
    await this.runCallback(key);
  }

  static subscribe<Key extends keyof StorageData>(
    key: Key,
    callback: (val: StorageData[Key]) => void
  ): () => void {
    this.subscriptions[key] = this.subscriptions[key] || [];
    const callbacks = this.subscriptions[key]!;
    callbacks.push(callback);
    const unsubscribeFn = () => {
      pull(callbacks, callback);
    };
    return unsubscribeFn;
  }

  static async clear(): Promise<void> {
    const provider = this.getProviderOrThrow();
    await provider.clear();
    this.subscriptions = {};
  }

  private static getProviderOrThrow(): StorageProvider {
    if (!this.provider) {
      throw new Error('Storage.provider is undefined');
    }
    return this.provider;
  }

  private static async runCallback<Key extends keyof StorageData>(key: Key) {
    const callbacks = this.subscriptions[key] || [];
    if (callbacks) {
      const value = await this.getItemMaybe(key);
      callbacks.forEach(callback => callback(value));
    }
  }
}
