import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Verification email",
      html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
    });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-password?token=${token}`;
  await resend.emails.send({
    from: "Auth <onboarding@resend.dev>",
    to: email,
    subject: "Password reset email",
    html: `<p>Click <a href="${confirmLink}">here</a> to reset password.</p>`,
  });
};
