import { createAuthClient } from "better-auth/react";
import { convexClient } from "@convex-dev/better-auth/client/plugins";
import { emailOTPClient, twoFactorClient } from "better-auth/client/plugins";
import { clearLegacyAuthStorage } from "@/lib/cross-domain-client";

clearLegacyAuthStorage();

export const authClient = createAuthClient({
  // Vite proxies /api/auth in preview; static hosting serves it on this origin.
  baseURL: window.location.origin,
  plugins: [
    convexClient(),
    emailOTPClient(),
    twoFactorClient(),
  ],
  fetchOptions: {
    credentials: "include",
  },
  sessionOptions: {
    refetchOnWindowFocus: false,
    refetchInterval: 0,
  },
});

// Better Auth can flip claims such as twoFactorEnabled without rotating the
// session token. Force a fresh getSession call so protected routes see the
// updated state before navigating.
export async function refreshAuthSession() {
  await authClient.getSession();
  authClient.$store.notify("$sessionSignal");
}
