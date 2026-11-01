import { validationResult } from 'express-validator';
import nodemailer from 'nodemailer';
import Message from '../models/Message.js';

export async function createContactMessage(req, res) {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return res.status(400).json({
      message: 'Please check the submitted contact details.',
      errors: validation.array().map(({ path, msg }) => ({ field: path, message: msg })),
    });
  }

  const { name, email, message } = req.body;
  const savedMessage = await Message.create({ name, email, message });

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_TO } = process.env;
  if (SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS && MAIL_TO) {
    const port = Number(SMTP_PORT);
    if (!Number.isInteger(port) || port < 1 || port > 65535) {
      console.error('Email notification was skipped because SMTP_PORT is invalid.');
    } else {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port,
        secure: port === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      });

      try {
        await transporter.sendMail({
          from: SMTP_USER,
          to: MAIL_TO,
          replyTo: email,
          subject: `Portfolio message from ${name}`,
          text: `From: ${name} <${email}>\n\n${message}`,
        });
      } catch (error) {
        console.error('Contact message was saved, but its email notification failed:', error);
      }
    }
  }

  return res.status(201).json({
    message: 'Your message was sent successfully.',
    id: savedMessage.id,
  });
}
