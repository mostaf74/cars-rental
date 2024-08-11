const express = require('express');
const path = require('path');
const multer = require('multer');
const app = express();

// Set up the storage engine for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Route to handle the car form submission
app.post('/savecar', upload.single('carImage'), (req, res) => {
    console.log('ay haga');
    const { carMake, carModel, carPrice } = req.body;
    const carImage = req.file ? `/uploads/${req.file.filename}` : '';

    // Assuming you are saving this data to a database
    // For now, we'll just send a success response
    res.send({ success: true, carMake, carModel, carPrice, carImage });

});

// Other routes and middleware
// ...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
