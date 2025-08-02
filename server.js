require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'Public')));

// MongoDB Connection (without deprecated options)
mongoose.connect('mongodb+srv://31sharmasahil31082002:sahil4321@cluster0.c1yxw7z.mongodb.net/hackveda1')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Schema & Model
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  collegeName: { type: String },
  comments: { type: String },
  createdAt: { type: Date, default: Date.now }
});
const Contact = mongoose.model('Contact', contactSchema);

// Routes
app.post('/api/contact', async (req, res) => {
  try {
    const { name, phone, email, collegeName, comments } = req.body;
    console.log(name);
    const contact = new Contact({ name, phone, email, collegeName, comments });
    await contact.save();
    res.status(201).json({ message: 'Form data saved successfully' });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'view/index.html'));
});

// Start Server
app.listen(8000, () => {
  console.log("Server has started on http://localhost:8000");
});
