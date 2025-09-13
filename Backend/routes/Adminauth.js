const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Admin = mongoose.model('Admin', adminSchema);

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(409).send('Admin already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ email, password: hashedPassword });
    await admin.save();
    const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).send({ admin, token });
  } catch (err) {
    res.status(500).send('Error during registration: ' + err.message);
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).send('Admin not found');
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).send('Invalid password');
    }
    const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).send({ admin, token });
  } catch (err) {
    res.status(500).send('Error during login: ' + err.message);
  }
});

module.exports = router;