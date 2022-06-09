import { MailAdapter, SendMailData } from '../mail-adapter'
import nodemailer from 'nodemailer'

// Create SMTP Server to send Emails 
const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "4153cb425a7ee6",
      pass: "746081340c0f8f"
    }
})

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: "Equipe Feedget <oi@feedget.com>",
            to: "Victor Hugo <victorhugoos@live.com>",
            subject,
            html: body
        })
    }   
}
