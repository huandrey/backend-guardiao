import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.ODONTO_GUARDIAO_EMAIL,
    pass: process.env.ODONTO_GUARDIAO_PWD,
  },
});
