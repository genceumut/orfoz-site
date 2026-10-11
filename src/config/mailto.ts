export const mailtoLink = (email: string, subject: string) =>
  `mailto:${email}?subject=${encodeURIComponent(subject)}`;
