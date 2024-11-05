import { client } from "./client";

export async function getData() {
  return client.fetch(`*`);
}
