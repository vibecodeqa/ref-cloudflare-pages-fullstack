import { problem } from "@vcqa-ref/shared";
import { authenticate, json, safeMessageFor, type Env } from "./src/auth";

export const onRequest: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const protectedApi = url.pathname.startsWith("/api/profile");

  if (!protectedApi) return context.next();

  try {
    context.data.user = authenticate(context.request, context.env);
    return context.next();
  } catch (error) {
    const safe = safeMessageFor(error);
    console.error("Protected API request rejected", { path: url.pathname, code: safe.code });
    return json(problem(safe.code, safe.message), { status: safe.status });
  }
};

