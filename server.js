const express = require("express");
// const router = express.Router();
const cors = require("cors");
// const nodemailer = require("nodemailer");
const mysql = require('mysql');
const bodyParser = require('body-parser');

// server used to send send emails
// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use("/", router);
// app.listen(5000, () => console.log("Server Running"));
// console.log(process.env.EMAIL_USER);
// console.log(process.env.EMAIL_PASS);

// const contactEmail = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: "********@gmail.com",
//     pass: ""
//   },
// });

// contactEmail.verify((error) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Ready to Send");
//   }
// });

// router.post("/contact", (req, res) => {
//   const name = req.body.firstName + req.body.lastName;
//   const email = req.body.email;
//   const message = req.body.message;
//   const phone = req.body.phone;
//   const mail = {
//     from: name,
//     to: "********@gmail.com",
//     subject: "Contact Form Submission - Portfolio",
//     html: `<p>Name: ${name}</p>
//            <p>Email: ${email}</p>
//            <p>Phone: ${phone}</p>
//            <p>Message: ${message}</p>`,
//   };
//   contactEmail.sendMail(mail, (error) => {
//     if (error) {
//       res.json(error);
//     } else {
//       res.json({ code: 200, status: "Message Sent" });
//     }
//   });
// });



const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

// Create MySQL connection
const db = mysql.createConnection({
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: 'blessy@462002',
  database: 'local server',
  authPlugin: 'mysql_native_password',
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
  } else {
    console.log('Connected to MySQL database.');
    
    db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255),
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255)
      );
`, (err) => {
      if (err) {
        console.error('Error creating users table:', err.message);
      } else {
        console.log('Users table created successfully.');

        db.query(`
        CREATE TABLE IF NOT EXISTS UserComments (
            comments TEXT,
            date DATE,
            userEmail VARCHAR(255)
        );
        
`, (err) => {
      if (err) {
        console.error('Error creating comments table:', err.message);
      } else {
        console.log('comments table created successfully.');
      }})}})}});


      app.post('/signup', (req, res) => {
        const { username, email, password } = req.body;
      
        
        db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password], (err, result) => {
          if (err) {
            console.error('Error inserting user:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
          } else {
            console.log('User inserted successfully.');
            res.status(200).json({ message: 'User signed up successfully', userId: result.insertId });
          }
        });
      });

      app.post('/login', (req, res) => {
        const { email, password } = req.body;
      
        // Retrieve user details from the users table based on email and password
        db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
          if (err) {
            console.error('Error retrieving user:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
          } else if (results.length === 0) {
            console.log('User not found.');
            res.status(401).json({ error: 'Invalid credentials' });
          } else {
            console.log('User retrieved successfully.');
            const user = results[0];
           
            res.status(200).json({ message: 'User logged in successfully', user });
          }
        });
      });


      app.get('/users', (req, res) => {
        // Retrieve all users from the users table
        db.query('SELECT * FROM users', (err, results) => {
          if (err) {
            console.error('Error retrieving users:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
          } else {
            console.log('Users retrieved successfully.');
            res.status(200).json(results);
          }
        });
      });


      app.post('/comments', async (req, res) => {
        const { answers, date, userEmail } = req.body;
      
        try {
          // Insert tracking data
          const insertTrackingDataQuery = `
            INSERT INTO UserComments (comments, date, userEmail)
            VALUES (?, ?, ?);
          `;
      
          const trackingDataResult = await db.query(insertTrackingDataQuery, [
            answers,
            date,
            userEmail,
          ]);
          
          console.log('Comments inserted successfully.');
               
               
          res.status(200).json({
            message: 'Comments submitted successfully',
            trackingDataId: trackingDataResult.insertId,
          });
        } catch (error) {
          console.error('Error inserting comments:', error.message);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      });
      



      app.listen(port, () => {
        console.log("connected to port 3001")
      })
