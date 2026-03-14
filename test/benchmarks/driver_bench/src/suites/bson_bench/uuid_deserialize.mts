import fs from 'node:fs/promises';
import path from 'node:path';

import { BSON, SPEC_DIRECTORY, TAG } from '../../driver.mjs';

const { UUID } = BSON;

const uuidStrings: string[] = JSON.parse(
  await fs.readFile(
    path.join(SPEC_DIRECTORY, 'single_and_multi_document', 'uuid_samples.json'),
    'utf8'
  )
);

const doc: Record<string, InstanceType<typeof UUID>> = {};
for (let i = 0; i < uuidStrings.length; i++) {
  doc[`f${i}`] = new UUID(uuidStrings[i]);
}

const serialized = BSON.serialize(doc);

export const taskSize = serialized.byteLength / (1024 * 1024);
export const tags = [TAG.bson];

export async function run() {
  BSON.deserialize(serialized);
}
