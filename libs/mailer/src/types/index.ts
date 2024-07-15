/* eslint-disable no-unused-vars */
interface MailOption {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  template: TEMPLATE_NAME;
  dynamicData: { [key: string]: string };
}

export enum TEMPLATE_NAME {
  WELCOME,
  RESET_PASSWORD,
  VERIFY_OTP,
}
const TYPES = {
  MailService: Symbol.for('MailService'),
};
export { TYPES, MailOption };
