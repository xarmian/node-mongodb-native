import { BSON, TAG } from '../../driver.mjs';

const FIELD_COUNT = 1_000;

const doc: Record<string, string> = {};
for (let i = 0; i < FIELD_COUNT; i++) {
  doc[`f${i}`] = '世'.repeat(5_000);
}

const serialized = BSON.serialize(doc);

export const taskSize = serialized.byteLength / (1024 * 1024);
export const tags = [TAG.bson];

export async function run() {
  BSON.deserialize(serialized, { validation: { utf8: true } });
}
