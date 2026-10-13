import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";

// Collection is disabled pending verified agreement coverage for this data flow.
// No personal-data arguments, database access, or success acknowledgment.
export const submit = mutation({
  args: {},
  returns: v.null(),
  handler: async () => {
    throw new ConvexError("Online request collection is disabled.");
  },
});
