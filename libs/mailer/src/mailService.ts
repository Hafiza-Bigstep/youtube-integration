import { SmtpTransporter } from './smtpTransporter';
import { ServiceTransporter } from './serviceTransporter';
import { SesTransporter } from './sesTransporter';
import { config } from 'dotenv';
import { injectable } from 'inversify';
import { MailTransporter } from './mailTransporter';
import { MailOption, TEMPLATE_NAME } from './types';
import mjml from 'mjml';

import WELCOME from './template/welcome';

config();

@injectable()
export class MailService {
  private transporter;

  constructor() {
    switch (process.env.MAIL_SERVICE) {
      case 'smtp':
        this.transporter = new SmtpTransporter().createTransport();
        break;
      case 'gmail':
      case 'zoho':
      case 'yahoo':
      case 'hotmail':
        this.transporter = new ServiceTransporter().createTransport();
        break;
      case 'ses':
        this.transporter = new SesTransporter().createTransport();
        break;
      default:
        console.error('Unsupported mail service');
        break;
    }
  }

  getTransporter(): MailTransporter {
    return this.transporter;
  }

  sendEmail(mailOptions: MailOption): Promise<any> {
    let dynamicContent = '';
    switch (mailOptions.template) {
      case TEMPLATE_NAME.WELCOME:
        dynamicContent = WELCOME.data;
        break;
      case TEMPLATE_NAME.VERIFY_OTP:
      case TEMPLATE_NAME.RESET_PASSWORD:
      default:
        throw new Error('Unsupported template specified');
    }
    for (const key in mailOptions.dynamicData) {
      dynamicContent = dynamicContent.replace(
        new RegExp(`##${key}##`, 'g'),
        mailOptions.dynamicData[key]
      );
    }

    const html = mjml(dynamicContent).html;
    const text = mjml(dynamicContent).text;
    return this.transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: mailOptions.to,
      subject: mailOptions.subject,
      text,
      html,
    });
  }
}
