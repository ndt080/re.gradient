import { nanoid } from "nanoid";

export function createUUID(name = "") {
  return `${name}${name ? "-" : ""}${nanoid(10)}`;
}
