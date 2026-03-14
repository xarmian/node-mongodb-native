import { BSON, TAG } from '../../driver.mjs';

const { UUID } = BSON;
const ITERATIONS = 100_000;

export const taskSize = (ITERATIONS * 16) / (1024 * 1024);
export const tags = [TAG.bson];

export async function run() {
  for (let i = 0; i < ITERATIONS; i++) {
    new UUID();
  }
}
