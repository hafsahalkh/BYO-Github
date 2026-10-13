/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as auth from "../auth.js";
import type * as authMigration from "../authMigration.js";
import type * as contactRequests from "../contactRequests.js";
import type * as email from "../email.js";
import type * as http from "../http.js";
import type * as lib_audit from "../lib/audit.js";
import type * as lib_requestValidation from "../lib/requestValidation.js";
import type * as specode_health from "../specode/health.js";
import type * as specode_probe from "../specode/probe.js";
import type * as specode_routes from "../specode/routes.js";
import type * as specode_uploader from "../specode/uploader.js";
import type * as staticHosting from "../staticHosting.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  authMigration: typeof authMigration;
  contactRequests: typeof contactRequests;
  email: typeof email;
  http: typeof http;
  "lib/audit": typeof lib_audit;
  "lib/requestValidation": typeof lib_requestValidation;
  "specode/health": typeof specode_health;
  "specode/probe": typeof specode_probe;
  "specode/routes": typeof specode_routes;
  "specode/uploader": typeof specode_uploader;
  staticHosting: typeof staticHosting;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {
  betterAuth: import("@convex-dev/better-auth/_generated/component.js").ComponentApi<"betterAuth">;
  selfHosting: import("@convex-dev/static-hosting/_generated/component.js").ComponentApi<"selfHosting">;
};
