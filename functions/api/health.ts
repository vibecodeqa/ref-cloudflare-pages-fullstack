import { json, type Env } from "../src/auth";

export const onRequestGet: PagesFunction<Env> = async () => {
  return json({ ok: true, service: "ref-cloudflare-pages-fullstack" });
};

