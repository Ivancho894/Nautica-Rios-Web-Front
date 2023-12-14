import nodemailer from 'nodemailer';
export default function (to){
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nauticariospf@gmail.com',
      pass: 'nautica123456@'
    }
  });

  const mailOptions = {
    from: 'nauticariospf@gmail.com',
    to,
    subject: 'Correo de prueba',
    text: 'Este es un correo de prueba enviado desde JavaScript.'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Correo enviado: ' + info.response);
    }
  });
}