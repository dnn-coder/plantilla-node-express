const nodemailer = require('nodemailer')
const pug = require('pug')
const path = require('path')
const dotenv = require('dotenv')
const { htmlToText } = require('html-to-text')


dotenv.config({ path: './config.env' , quiet: true}) 

class Email {
    constructor(){}

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

    async send(){
        const html = pug.renderFile(path.join(__dirname, '..', 'views', 'emails', 'base.pug'),
        { title: 'Mi primer' }
    )
    
    await this.newTransport().sendMail({
        from: 'support@test.com',
        to: 'test@test.com',
        subject: 'Test',
        html,
        text: htmlToText(html)
    })
}

}

module.exports = { Email }