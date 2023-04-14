
import nodemailer from 'nodemailer';

export async function sendEmail(emailData) {
  const { cartItems, totalPrice, paymentMethod } = emailData;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: 'Baptiste5gresse@gmail.com',
    subject: 'Récapitulatif de la commande',
    text: `Récapitulatif de la commande : \n\n${cartItems.join(
      '\n'
    )}\n\nPrix total : ${totalPrice}\n\nMéthode de paiement : ${paymentMethod}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email: ' + error);
  }
}
