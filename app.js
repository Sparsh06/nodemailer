require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();



app.use('/public' , express.static(path.join(__dirname ,'public')));

// body parser middleware 

app.use(bodyParser.urlencoded({ extended : false}));
app.use(bodyParser.json());

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'views','index.html'));
});

app.post('/send',(req,res) => {
    const output = `
    <p> you have new request </p>
    <p>contact details are</p>
    <ul>
     <li>name :${req.body.name}</li>
     <li>company: ${req.body.company}</li>
     <li>email:${req.body.email}</li>
     <li>address:${req.body.address}</li>
    </ul>
    <h3>your messeage</h3>
    <p>${req.body.message}</p>
    `
    ;
  

let transporter = nodemailer.createTransport({
   // host: 'mail.YOURDOMAIN.com',
   // port: 587,
   //secure: false, // true for 465, false for other ports
   service:'gmail',
    auth: {
        user: 'email', // generated ethereal user
        pass: 'passward'  // generated ethereal password
    },
    tls:{
        rejectUnauthorized:false
    }
    
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Nodemailer Contact" <email>', // sender address
      to: 'sender email', // list of receivers
      subject: 'Node Contact Request', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      else{
          console.log('email sent ...');
      }
    });
  });





app.listen(3001 ,()=> console.log('server started'));