import { internalMutation } from "./_generated/server";
import { components } from "./_generated/api";
import { v } from "convex/values";

// One-time migration for HIPAA-AC-012. Internal-only: exposed legacy session
// credentials must stop working even if a browser has not loaded the cleanup.
export const invalidateExposedSessions = internalMutation({
  args: {},
  returns: v.object({ invalidated: v.number(), remaining: v.number(), cutoff: v.number() }),
  handler: async (ctx) => {
    const cutoff = Date.now();
    const where = [{ field: "createdAt" as const, operator: "lte" as const, value: cutoff }];
    let invalidated = 0;
    let isDone = false;
    let cursor: string | null = null;
    while (!isDone) {
      const result: { count: number; isDone: boolean; continueCursor: string } = await ctx.runMutation(components.betterAuth.adapter.deleteMany, {
        input: { model: "session", where },
        paginationOpts: { cursor, numItems: 100 },
      });
      invalidated += result.count;
      isDone = result.isDone;
      cursor = result.continueCursor;
    }
    const remaining = await ctx.runQuery(components.betterAuth.adapter.findMany, {
      model: "session",
      where,
      paginationOpts: { cursor: null, numItems: 1 },
    });
    if (remaining.page.length !== 0) {
      throw new Error("Session migration incomplete");
    }
    return { invalidated, remaining: remaining.page.length, cutoff };
  },
});
