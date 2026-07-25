export interface Env {
  ALLOW_LOCAL_AUTH_HEADER?: string;
  AUTH_PROVIDER?: string;
  PUBLIC_API_BASE?: string;
}

export interface AuthenticatedUser {
  id: string;
  provider: string;
}

export class HttpError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string
  ) {
    super(message);
  }
}

export function safeMessageFor(error: unknown): { status: number; code: string; message: string } {
  if (error instanceof HttpError) {
    return { status: error.status, code: error.code, message: error.message };
  }
  return { status: 500, code: "internal", message: "Unexpected server error" };
}

export function authenticate(request: Request, env: Env): AuthenticatedUser {
  const localUser = request.headers.get("x-vcqa-user");
  if (env.ALLOW_LOCAL_AUTH_HEADER === "true" && localUser) {
    return { id: localUser, provider: "local-preview" };
  }

  const accessUser = request.headers.get("cf-access-authenticated-user-email");
  if (accessUser) {
    return { id: accessUser, provider: env.AUTH_PROVIDER ?? "cloudflare-access" };
  }

  throw new HttpError(401, "unauthenticated", "Authentication required");
}

export function json(data: unknown, init?: ResponseInit): Response {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...init?.headers
    }
  });
}

