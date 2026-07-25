import { profileSchema } from "@vcqa-ref/shared";
import { json, type AuthenticatedUser, type Env } from "../src/auth";

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const user = context.data.user as AuthenticatedUser | undefined;

  if (!user) {
    return json({ error: { code: "unauthenticated", message: "Authentication required" } }, { status: 401 });
  }

  const profile = profileSchema.parse({
    userId: user.id,
    displayName: user.id.includes("@") ? user.id.split("@")[0] : "Demo User",
    plan: "team"
  });

  return json(profile);
};

