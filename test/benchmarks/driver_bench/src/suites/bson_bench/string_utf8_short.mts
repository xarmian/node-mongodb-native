import { BSON, TAG } from '../../driver.mjs';

const FIELD_COUNT = 10_000;
const values = ['éèêë', '世界你好', '😀🎉🚀💡'];

const doc: Record<string, string> = {};
for (let i = 0; i < FIELD_COUNT; i++) {
  doc[`f${i}`] = values[i % values.length];
}

const serialized = BSON.serialize(doc);

export const taskSize = serialized.byteLength / (1024 * 1024);
export const tags = [TAG.bson];

export async function run() {
  BSON.deserialize(serialized, { validation: { utf8: false } });
}
