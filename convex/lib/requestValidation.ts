// Shared, side-effect-free validation. Do not include submitted values in errors.
export type ContactMethod = "email" | "phone";
export type ServiceInterest = "undecided" | "general" | "wellbeing" | "ongoing";
export type RequestFields = {
  name: string;
  contactMethod: ContactMethod;
  contactDetail: string;
  serviceInterest: ServiceInterest;
};
export type RequestErrors = Partial<Record<keyof RequestFields, string>>;

export function validateRequest(fields: RequestFields): RequestErrors {
  const errors: RequestErrors = {};
  if (!fields.name.trim()) errors.name = "Enter your name.";
  else if (fields.name.trim().length > 100) errors.name = "Use 100 characters or fewer for your name.";
  if (fields.contactMethod !== "email" && fields.contactMethod !== "phone") {
    errors.contactMethod = "Choose email or phone.";
  }
  const detail = fields.contactDetail.trim();
  if (!detail) errors.contactDetail = fields.contactMethod === "phone" ? "Enter your phone number." : "Enter your email address.";
  else if (fields.contactMethod === "email" && (detail.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(detail))) {
    errors.contactDetail = "Enter an email address in the format name@example.com.";
  } else if (fields.contactMethod === "phone" && (detail.length > 40 || !/^\+?[\d\s().-]+$/.test(detail) || detail.replace(/\D/g, "").length < 7 || detail.replace(/\D/g, "").length > 15)) {
    errors.contactDetail = "Enter a phone number with 7 to 15 digits. You can include a country code.";
  }
  if (!["undecided", "general", "wellbeing", "ongoing"].includes(fields.serviceInterest)) {
    errors.serviceInterest = "Choose an available service interest or Not sure yet.";
  }
  return errors;
}
