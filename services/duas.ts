import { Dua } from "../types";
import duas from "../data/duas.json";

export async function getDuas(): Promise<Dua[]> {
  return duas;
}
