/* eslint-disable @typescript-eslint/no-empty-interface */
export type JSONType = {
  name: string;
  json: string;
  type: string;
  size: number;
};

export interface JsonObject extends Record<string, JsonValue> {}

export interface JsonArray extends Array<JsonValue> {}

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonObject
  | JsonArray;

export interface JsonSerializable {
  serialize(): JsonValue;
}
