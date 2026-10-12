// Migration only: never read, cache, or replay the old JavaScript-visible credentials.
// Run before the auth client is created on each origin that hosted the old app.
export function clearLegacyAuthStorage() {
  if (typeof window === "undefined") return;
  for (const storageName of ["localStorage", "sessionStorage"] as const) {
    try {
      const storage = window[storageName];
      storage.removeItem("better-auth_cookie");
      storage.removeItem("better-auth_session_data");
    } catch {
      // Storage can be disabled; authentication now uses only HttpOnly cookies.
    }
  }
}
