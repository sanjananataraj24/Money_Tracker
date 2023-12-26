const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connect to MongoDB (replace 'your_mongodb_connection_string' with your actual MongoDB connection string)
mongoose.connect('mongodb://localhost:27017/Sanjana_N', { useNewUrlParser: true, useUnifiedTopology: true });

// Create Expense model
const Expense = mongoose.model('Expense', {
  description: String,
  amount: Number,
  type: String, // 'income' or 'expense'
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Route to serve HTML page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// API endpoint to fetch all expenses
app.get('/api/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// API endpoint to add a new expense
app.post('/api/expenses', async (req, res) => {
  try {
    const { description, amount, type } = req.body;
    const newExpense = new Expense({ description, amount, type });
    await newExpense.save();
    res.redirect('/');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
