const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./routes/Auth');
const carRouter = require('./routes/Car');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://vaishnav:vaishnavsk88@car-management.16h1e.mongodb.net/?retryWrites=true&w=majority&appName=car-management', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));


// Routes
app.use('/api/auth', authRouter);
app.use('/api/cars', carRouter);

app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
