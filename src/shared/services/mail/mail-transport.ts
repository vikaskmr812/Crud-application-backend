import nodemailer  from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import Logger from 'bunyan';
// import sendGrid from '@sendgrid/mail'

import { config } from '@root/config';
import { BadRequestError } from '@global/helpers/error-handler';

interface IMailOptions{
    from: string,
    to: string,
    subject: string,
    html: string
};
const log: Logger = config.createLogger('mailOptions');

class Mailtransport {
    public async send(receiverEmail: string, subject: string, body: string): Promise<void> {
        if(config.NODE_ENV === 'test' || config.NODE_ENV === 'development') {
            this.developmentEmailSender(receiverEmail, subject, body);
        };
    };    
    
    private async developmentEmailSender(receiverEmail: string, subject: string, body: string ): Promise<void> {
        const testAccount = await nodemailer.createTestAccount();
        console.log(testAccount.user)
        console.log(testAccount.pass)
        

        const transporter: Mail = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port:587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        })

        const mailOptions: IMailOptions = {
            from: `JobProject<${testAccount.user}>`,
            to: receiverEmail,
            subject,
            html:body
        };

        try {
            await transporter.sendMail(mailOptions);
            log.info('Development email send successfully.');
        }   catch(error) {
            log.error('Error sending mail', error);
            throw new BadRequestError('Error sending password');
        }

    }
}

export const mailTransport: Mailtransport = new Mailtransport();


