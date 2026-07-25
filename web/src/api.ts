import { problemSchema, profileSchema, type Profile } from "@vcqa-ref/shared";

const apiBase = import.meta.env.VITE_PUBLIC_API_BASE ?? "/api";

export async function loadProfile(): Promise<Profile> {
  const response = await fetch(`${apiBase}/profile`, {
    headers: { accept: "application/json" }
  });
  const data = await response.json();

  if (!response.ok) {
    const parsed = problemSchema.safeParse(data);
    const message = parsed.success ? parsed.data.error.message : "Request failed";
    throw new Error(message);
  }

  return profileSchema.parse(data);
}

