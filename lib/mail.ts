import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;
const from = `${process.env.MAIL_TITLE} <${process.env.MAIL_FROM}>`;
export const sendVerificationEmail = async (
  email: string,
  token: string
): Promise<boolean> => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  await resend.emails.send({
    from: `${from}`,
    to: email,
    subject: "Verification email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
  return true;
};

export const sendPasswordResetEmail = async (
  email: string,
  token: string
): Promise<boolean> => {
  const confirmLink = `${domain}/auth/new-password?token=${token}`;
  await resend.emails.send({
    from: `${from}`,
    to: email,
    subject: "Password reset email",
    html: `<p>Click <a href="${confirmLink}">here</a> to reset password.</p>`,
  });
  return true;
};

export const sendTwoFactorEmail = async (
  email: string,
  token: string
): Promise<boolean> => {
  await resend.emails.send({
    from: `${from}`,
    to: email,
    subject: "2FA Code",
    html: `<p>Your 2FA Code ${token} </p>`,
  });
  return true;
};
