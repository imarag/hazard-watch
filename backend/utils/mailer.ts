import { Resend } from 'resend'
import config from '../config.js'

const resend = new Resend(config.RESEND_API_KEY)

interface SendMailOptions {
  to: string
  subject: string
  html: string
}

export const sendMail = async ({ to, subject, html }: SendMailOptions) => {
  const { data, error } = await resend.emails.send({
    from: config.MAIL_FROM,
    to,
    subject,
    html,
  })

  if (error) {
    throw new Error(`Failed to send email: ${error.message}`)
  }

  return data
}

export default { sendMail }
