/** Replace the placeholders. Everything personal lives here. */
export const CONFIG = {
  email: "your.email@example.com",
  telegram: "https://t.me/your_username",
  github: "https://github.com/your-username",
  linkedin: "https://www.linkedin.com/in/your-profile",
  available: true,
  /** Real form service URL (Formspree etc). Empty = form honestly says nothing was sent. */
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "",
};
