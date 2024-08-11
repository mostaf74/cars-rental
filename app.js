const express = require('express');
  const path = require('path');
  const mongoose = require('mongoose');
  const bodyParser = require('body-parser');
  const helmet = require('helmet');
  const multer = require('multer');
  const session = require('express-session');
  const userController = require('./controllers/userController'); // Ensure this path is correct

  const app = express();
  const port = process.env.PORT || 3003;

  // MongoDB connection string
  const dbURI = 'mongodb+srv://webfinal2004:12345@cluster0.kvjuvco.mongodb.net/all-data?retryWrites=true&w=majority';

  const User = require("./models/User.js");
  const Admin = require('./models/admin.js');
  const Car = require("./models/Car.js");

  // Connect to MongoDB
  mongoose.connect(dbURI)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log('MongoDB connection error:', err));

  // Security Middleware
  app.use(helmet());

  // Middleware to serve static files from the public directory
  app.use(express.static(path.join(__dirname, 'public')));

  // Middleware to parse JSON bodies
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Set up sessions
  app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Set secure: true if using HTTPS
  }));

  app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "script-src 'self' 'unsafe-inline';");
    next();
  });

  // Set the view engine to EJS
  app.set('view engine', 'ejs');

  // Multer setup for file uploads
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  const upload = multer({ storage: storage });

  // Middleware to check if user is logged in
  function isAuthenticated(req, res, next) {
    if (req.session.userId) {
      next();
    } else {
      res.redirect('/');
    }
  }

  // Routes
  app.get('/', userController.renderHomePage);
  app.get('/index.ejs', (req, res) => res.render('index.ejs'));
  app.get('/about.ejs', userController.renderAboutPage);
  app.get('/home.ejs', isAuthenticated, (req, res) => res.render('home.ejs'));
  app.get('/cars.ejs', isAuthenticated, (req, res) => res.render('cars.ejs'));
  app.get('/contact.ejs', isAuthenticated, (req, res) => res.render('contact.ejs'));
  app.get('/book.ejs', isAuthenticated, (req, res) => res.render('book.ejs'));
  app.get('/payment.ejs', isAuthenticated, (req, res) => res.render('payment.ejs'));
  app.get('/car-details-audi-a6.ejs', isAuthenticated, (req, res) => res.render('car-details-audi-a6.ejs'));
  app.get('/car-details-bmw-x5.ejs', isAuthenticated, (req, res) => res.render('car-details-bmw-x5.ejs'));
  app.get('/car-details-ford-mustang.ejs', isAuthenticated, (req, res) => res.render('car-details-ford-mustang.ejs'));
  app.get('/car-details-toyota-corolla.ejs', isAuthenticated, (req, res) => res.render('car-details-toyota-corolla.ejs'));
  app.get('/car-details-mercedes-e-class.ejs', isAuthenticated, (req, res) => res.render('car-details-mercedes-e-class.ejs'));
  app.get('/car-details-tesla-model-s.ejs', isAuthenticated, (req, res) => res.render('car-details-tesla-model-s.ejs'));

  app.get('/admin.ejs', isAuthenticated, (req, res) => {
    Promise.all([
      User.find(),
      Admin.find(),
      Car.find()
    ])
      .then(([users, admins, cars]) => {
        res.render('admin.ejs', {
          users: users,
          admins: admins,
          cars: cars // Make sure the naming is consistent
        });
      })
      .catch(err => {
        console.log('Error fetching data:', err);
        res.status(500).send('Server Error');
      });
  });

  app.post('/saveUser', isAuthenticated, (req, res) => {
    const { userName, userEmail, userPhone,userPassword } = req.body;
    const newUser = new User({ name: userName, email: userEmail, phone: userPhone,password: userPassword });

    newUser.save()
      .then(() => res.redirect('/admin.ejs'))
      .catch(err => {
        console.log('Error saving user:', err);
        res.status(500).send('Error saving user');
      });
  });

  // Route to delete a user
  app.post('/deleteuser', isAuthenticated, (req, res) => {
    const { userId } = req.body;

    User.findByIdAndDelete(userId)
      .then(() => {
        res.redirect('/admin.ejs');
      })
      .catch(err => {
        console.log('Error deleting user:', err);
        res.status(500).send('Server Error');
      });
  });

  // Route to delete an admin
  app.post('/deleteadmin', isAuthenticated, (req, res) => {
    const { adminId } = req.body;

    Admin.findByIdAndDelete(adminId)
      .then(() => {
        res.redirect('/admin.ejs');
      })
      .catch(err => {
        console.log('Error deleting admin:', err);
        res.status(500).send('Server Error');
      });
  });

  // Route to delete a car (optional, if needed)
  app.post('/deletecar', isAuthenticated, (req, res) => {
    const { carId } = req.body;

    Car.findByIdAndDelete(carId)
      .then(() => {
        res.redirect('/admin.ejs');
      })
      .catch(err => {
        console.log('Error deleting car:', err);
        res.status(500).send('Server Error');
      });
  });

  // Route to edit a user
  app.post('/edituser', isAuthenticated, (req, res) => {
    const { userId, userName, userEmail, userPhone, userPassword } = req.body;

    // Update user document by _id
    User.findByIdAndUpdate(userId, {
      $set: {
        name: userName,
        email: userEmail,
        phone: userPhone,
        password: userPassword
      }
    }, { new: true })
      .then(() => {
        res.redirect('/admin.ejs');
      })
      .catch(err => {
        console.log('Error updating user:', err);
        res.status(500).send('Server Error');
      });
  });

  app.post('/register', (req, res) => {
    const { name, email,password } = req.body;
    const newUser = new User({ name: name, email: email,password: password });

    newUser.save()
      .then(() => res.redirect('/home.ejs'))
      .catch(err => {
        console.log('Error saving user:', err);
        res.status(500).send('Error saving user');
      });
  });

  app.post('/savecar', isAuthenticated, upload.single('carImage'), (req, res) => {
    const { carMake, carModel, carPrice } = req.body;
    const carImage = req.file ? `/uploads/${req.file.filename}` : '';
    const newCar = new Car({
      carMake: carMake,
      carModel: carModel,
      carPrice: carPrice,
      carImage: carImage
    });

    newCar.save()
      .then(() => res.redirect('/admin.ejs'))
      .catch(err => {
        console.log('Error saving car:', err);
        res.status(500).send('Error saving car');
      });
  });

  app.get('/cars.ejs', (req, res) => {
    Car.find()
      .then(cars => {
        res.render('cars.ejs', { cars: cars });
      })
      .catch(err => {
        console.log('Error fetching cars:', err);
        res.status(500).send('Server Error');
      });
  });

  app.post('/saveadmin', isAuthenticated, (req, res) => {
    const { adminName, adminEmail, adminPassword } = req.body; // Capture the password from the request
    const newAdmin = new Admin({ 
        name: adminName, 
        email: adminEmail, 
        password: adminPassword 
    });

    newAdmin.save()
        .then(() => res.redirect('/admin.ejs'))
        .catch(err => {
            console.log('Error saving admin:', err);
            res.status(500).send('Error saving admin');
        });
});


  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });

  app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send('Invalid email or password');
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).send('Invalid email or password');
        }

        // Save user ID in session
        req.session.userId = user._id;
        req.session.email = user.email;

        res.redirect('/home.ejs');
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
  });