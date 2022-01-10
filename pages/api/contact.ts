import { NextApiRequest, NextApiResponse } from "next";
import Nodemailer from 'nodemailer'


export default function (req: NextApiRequest, res: NextApiResponse) {  
  const nodemailer = Nodemailer
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: process.env.EMAIL_SECRET,
      pass: process.env.EMAIL_PASSWORD_SECRET_KEY,
    },
    secure: true,
  })
  const mailData = {
    from: req.body.email,
    to: process.env.EMAIL_SECRET,
    subject: `${req.body.title} - Message From ${req.body.name}`,
    text: req.body.message + " | Sent from: " + req.body.email,
    html: `<div>${req.body.message}</div><p>Sent from:
    ${req.body.email}</p>`
  }
  transporter.sendMail(mailData, function (err: any, info: any) {
    if(err)
      console.log(err)
    else
      console.log(info)
  })
  
  return res.status(200).send("Message Sent")
}