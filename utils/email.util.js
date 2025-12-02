const nodemailer = require('nodemailer')
const pug = require('pug')
const path = require('path')
const dotenv = require('dotenv')
const { htmlToText } = require('html-to-text')


dotenv.config({ path: './config.env' , quiet: true}) 

class Email {
    constructor(to){
        this.to = to
    }

    //connect to mail service
    newTransport() {
        return nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS
            }
        })
    }

    async send(template, subject, mailData){
        const html = pug.renderFile(path.join(__dirname, '..', 'views', 'emails', `${template}.pug`),
        mailData
    )
    
    await this.newTransport().sendMail({
        from: process.env.MAIL_FROM,
        to: this.to,
        subject,
        html,
        text: htmlToText(html)
    })
}

    async sendWelcomeEmail(name){
        await this.send('welcome', 'bienvendio a nuestra app ', { name })
    }
    
    async sendNewPostEmail(){
        await this.send('newPost', 'has creado un nuevo post')
    }

}

module.exports = { Email }