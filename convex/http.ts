import { httpRouter } from "convex/server";
import { registerStaticRoutes } from "@convex-dev/static-hosting";
import { components } from "./_generated/api";
import { authClient, createAuth } from "./auth";
import { registerSpecodeRoutes } from "./specode/routes";

const http = httpRouter();

// Native Set-Cookie responses are served on the frontend origin (proxied in dev).
authClient.registerRoutes(http, createAuth);
registerStaticRoutes(http, components.selfHosting);

// Specode release routes (frontend uploads, health).
registerSpecodeRoutes(http);

export default http;