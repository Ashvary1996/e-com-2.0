import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export const sendMail = async ({ email, emailType, userId }) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    let updateFields = {};
    let subject = "";
    let htmlContent = "";

    // Using  switch-case for different email types
    switch (emailType) {
      case "VERIFY":
      case "GENERATE_NEW_VERIFY_LINK":
        subject = "Verify your Email";
        updateFields = {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000, // 1 hour expiry
        };
        htmlContent = `
          <p>
            Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to verify your email.
            <br />
            Or copy and paste the link below into your browser:
            <br />
            ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
          </p>
        `;
        break;

      case "RESET_LINK":
        subject = "Reset Your Password";
        updateFields = {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000, // 1 hour expiry
        };
        htmlContent = `
          <p>
            Click <a href="${process.env.DOMAIN}/resetpassword?token=${hashedToken}">here</a> to reset your password.
            <br />
            Or copy and paste the link below into your browser:
            <br />
            ${process.env.DOMAIN}/resetpassword?token=${hashedToken}
          </p>
        `;
        break;
      case "PASSWORD_RESETED":
        subject = "Your Password Has Been Reset";
        htmlContent = `
              <p>
                  Your password has been successfully reset. If you did not initiate this change, please ignore this email.
              </p>
              <p>
                  If you need to reset your password again, you can do so by clicking the following link:
                  <br />
                  <a href="${process.env.DOMAIN}/forgot_password">Reset Password</a>
                  <br />
                  Or copy and paste the link below into your browser:
                  <br />
                  ${process.env.DOMAIN}/forgot_password
              </p>
              <p>
              Click here to go to website <a href="${process.env.DOMAIN}/
              </p>
          `;
        break;

      default:
        throw new Error("Invalid email type");
    }

    await User.findByIdAndUpdate(userId, { $set: updateFields });

    // Configure the email transporter
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAIL_USER_ID,
        pass: process.env.MAIL_USER_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: "ecom2@ashvary_website.com",
      to: email,
      subject,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Message sent successfully to ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error(error.message);
  }
};
