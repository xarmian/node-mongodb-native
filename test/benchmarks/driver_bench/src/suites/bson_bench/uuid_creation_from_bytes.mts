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

const uuidBytes: Uint8Array[] = uuidStrings.map(
  s => new UUID(s).id
);

export const taskSize = (uuidBytes.length * 16) / (1024 * 1024);
export const tags = [TAG.bson];

export async function run() {
  for (let i = 0; i < uuidBytes.length; i++) {
    new UUID(uuidBytes[i]);
  }
}
