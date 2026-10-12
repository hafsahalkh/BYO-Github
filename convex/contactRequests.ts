import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";
import { recordAuditLog } from "./lib/audit";
import { validateRequest } from "./lib/requestValidation";

// Intentionally unauthenticated: visitors submit their own basic contact details.
// No public reads, lists, contact-data return values, or submitted-value logging.
export const submit = mutation({
  args: {
    name: v.string(),
    contactMethod: v.union(v.literal("email"), v.literal("phone")),
    contactDetail: v.string(),
    serviceInterest: v.union(v.literal("undecided"), v.literal("general"), v.literal("wellbeing"), v.literal("ongoing")),
  },
  returns: v.object({ accepted: v.literal(true) }),
  handler: async (ctx, args) => {
    if (Object.keys(validateRequest(args)).length) {
      throw new ConvexError("Please check the required contact fields and try again.");
    }
    const requestId = await ctx.db.insert("contact_requests", {
      ...args,
      name: args.name.trim(),
      contactDetail: args.contactDetail.trim(),
    });
    // Same transaction: acknowledgment is returned only after both writes succeed.
    await recordAuditLog(ctx, {
      action: "PHI_WRITE",
      resource_type: "contact_request",
      resource_id: requestId,
      metadata: { op: "create" },
    });
    return { accepted: true as const };
  },
});
