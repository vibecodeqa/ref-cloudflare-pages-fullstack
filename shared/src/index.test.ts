import { describe, expect, it } from "vitest";
import { problem, problemSchema, profileSchema } from "./index";

describe("shared API contracts", () => {
  it("accepts the profile response shape", () => {
    expect(
      profileSchema.parse({ userId: "demo-user", displayName: "Demo User", plan: "team" })
    ).toEqual({ userId: "demo-user", displayName: "Demo User", plan: "team" });
  });

  it("rejects invalid plan values", () => {
    expect(() => profileSchema.parse({ userId: "demo-user", displayName: "Demo", plan: "admin" })).toThrow();
  });

  it("builds safe problem details", () => {
    expect(problemSchema.parse(problem("unauthenticated", "Authentication required"))).toEqual({
      error: { code: "unauthenticated", message: "Authentication required" }
    });
  });
});

