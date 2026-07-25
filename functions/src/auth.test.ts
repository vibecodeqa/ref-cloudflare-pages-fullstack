import { describe, expect, it } from "vitest";
import { authenticate, HttpError, safeMessageFor } from "./auth";

describe("Pages Functions auth boundary", () => {
  it("rejects protected API calls without server-side identity", () => {
    expect(() => authenticate(new Request("https://example.test/api/profile"), {})).toThrow(HttpError);
  });

  it("accepts the local smoke-test identity only when explicitly enabled", () => {
    const request = new Request("https://example.test/api/profile", {
      headers: { "x-vcqa-user": "demo-user" }
    });

    expect(authenticate(request, { ALLOW_LOCAL_AUTH_HEADER: "true" })).toEqual({
      id: "demo-user",
      provider: "local-preview"
    });
  });

  it("ignores local identity when preview helper is disabled", () => {
    const request = new Request("https://example.test/api/profile", {
      headers: { "x-vcqa-user": "demo-user" }
    });

    expect(() => authenticate(request, { ALLOW_LOCAL_AUTH_HEADER: "false" })).toThrow(HttpError);
  });

  it("returns safe client errors", () => {
    expect(safeMessageFor(new Error("database exploded with internal details"))).toEqual({
      status: 500,
      code: "internal",
      message: "Unexpected server error"
    });
  });
});

