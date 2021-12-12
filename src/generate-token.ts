import { randomBytes } from "crypto";

export default function generateToken(l: number) {
  return randomBytes(l).toString("hex").substr(0, l);
}
