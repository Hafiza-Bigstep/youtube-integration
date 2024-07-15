import nodemailer from 'nodemailer';
import { SESClient, SendRawEmailCommand } from '@aws-sdk/client-ses';
import { MailTransporter } from './mailTransporter';

export class SesTransporter extends MailTransporter {
  createTransport() {
    const ses = new SESClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });

    return nodemailer.createTransport({
      SES: {
        ses,
        aws: { SendRawEmailCommand }, // Adjusted for new AWS SDK v3
      },
    });
  }
}
