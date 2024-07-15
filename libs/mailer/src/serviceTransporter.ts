import nodemailer from 'nodemailer';
import { MailTransporter } from './mailTransporter';

export class ServiceTransporter extends MailTransporter {
  createTransport() {
    return nodemailer.createTransport({
      service: process.env.MAIL_SERVICE,
      auth: {
        user: process.env.SERVICE_USER,
        pass: process.env.SERVICE_PASS,
      },
    });
  }
}
