import { defaultTheme } from "@/config/theme";

// Details shown on the accessibility statement page (/[locale]/accessibility).
// Israeli Service Accessibility Regulations require the statement to name an accessibility
// coordinator with a phone and email; update `statementUpdated` whenever the site is re-audited.
export const accessibilityConfig = {
  coordinatorName: "",
  phone: defaultTheme.contact.phone,
  email: defaultTheme.contact.email,
  statementUpdated: "2026-10-10",
};
