const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

if (!fs.existsSync('./public/uploads')) {
  fs.mkdirSync('./public/uploads', { recursive: true });
}

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// PostgreSQL Connection
const db = new Pool({
  connectionString:
    process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

db.connect()
  .then(() => console.log('Connected to Supabase PostgreSQL'))
  .catch(err => console.error('Database connection error', err));

// Multer Configuration
const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// ================= REGISTER =================

app.post('/register', async (req, res) => {

  const { username, email, password } = req.body;

  try {

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users
      (username, email, password)
      VALUES ($1, $2, $3)
    `;

    await db.query(query, [
      username,
      email,
      hashedPassword
    ]);

    res.status(201).json({
      message: 'User registered successfully!'
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: 'Error registering user'
    });

  }

});

// ================= LOGIN =================

app.post('/login', async (req, res) => {

  const { username, password } = req.body;

  try {

    const query =
      'SELECT * FROM users WHERE username = $1';

    const results =
      await db.query(query, [username]);

    if (results.rows.length === 0) {

      return res.status(404).json({
        message: 'User not found'
      });

    }

    const user = results.rows[0];

    const isPasswordValid =
      await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {

      return res.status(401).json({
        message: 'Invalid credentials'
      });

    }

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username
      }
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: 'Error during login'
    });

  }

});

// ================= ADMIN LOGIN =================

app.post('/admin-login', (req, res) => {

  const { username, password } = req.body;

  const admin = {
    username: process.env.ADMIN_USER,
    password: process.env.ADMIN_PASS
  };

  if (
    username === admin.username &&
    password === admin.password
  ) {

    res.status(200).json({
      message: 'Login successful!'
    });

  } else {

    res.status(401).json({
      message: 'Invalid admin credentials!'
    });

  }

});

// ================= GET MENUS =================

app.get('/api/menus', async (req, res) => {

  try {

    const results =
      await db.query('SELECT * FROM menu');

    res.json(results.rows);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: 'Database error'
    });

  }

});

// ================= GET CHEFS =================

app.get('/api/chefs', async (req, res) => {

  try {

    const results =
      await db.query('SELECT * FROM chefs');

    res.json(results.rows);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: 'Database error'
    });

  }

});

// ================= ADD MENU =================

app.post('/api/menus', upload.single('image'), async (req, res) => {

  try {

    const { name, description, price } = req.body;

    const image =
      req.file ? `/uploads/${req.file.filename}` : null;

    const sql = `
      INSERT INTO menu
      (name, description, price, image)
      VALUES ($1, $2, $3, $4)
    `;

    await db.query(sql, [
      name,
      description,
      price,
      image
    ]);

    res.json({
      message: 'Menu item added successfully'
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: 'Database error'
    });

  }

});

// ================= ADD CHEF =================

app.post('/api/chefs', upload.single('image'), async (req, res) => {

  try {

    const { name, specialty } = req.body;

    const image =
      req.file ? `/uploads/${req.file.filename}` : null;

    const sql = `
      INSERT INTO chefs
      (name, specialty, image)
      VALUES ($1, $2, $3)
    `;

    await db.query(sql, [
      name,
      specialty,
      image
    ]);

    res.json({
      message: 'Chef added successfully'
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: 'Database error'
    });

  }

});

// ================= UPDATE MENU =================

app.put('/api/menus/:id', upload.single('image'), async (req, res) => {

  try {

    const { name, description, price } = req.body;

    const image =
      req.file ? `/uploads/${req.file.filename}` : null;

    if (image) {

      await db.query(
        `UPDATE menu
         SET name=$1,
             description=$2,
             price=$3,
             image=$4
         WHERE id=$5`,
        [
          name,
          description,
          price,
          image,
          req.params.id
        ]
      );

    } else {

      await db.query(
        `UPDATE menu
         SET name=$1,
             description=$2,
             price=$3
         WHERE id=$4`,
        [
          name,
          description,
          price,
          req.params.id
        ]
      );

    }

    res.json({
      message: 'Menu updated successfully'
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: 'Database error'
    });

  }

});

// ================= UPDATE CHEF =================

app.put('/api/chefs/:id', upload.single('image'), async (req, res) => {

  try {

    const { name, specialty } = req.body;

    const image =
      req.file ? `/uploads/${req.file.filename}` : null;

    if (image) {

      await db.query(
        `UPDATE chefs
         SET name=$1,
             specialty=$2,
             image=$3
         WHERE id=$4`,
        [
          name,
          specialty,
          image,
          req.params.id
        ]
      );

    } else {

      await db.query(
        `UPDATE chefs
         SET name=$1,
             specialty=$2
         WHERE id=$3`,
        [
          name,
          specialty,
          req.params.id
        ]
      );

    }

    res.json({
      message: 'Chef updated successfully'
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: 'Database error'
    });

  }

});

// ================= DELETE MENU =================

app.delete('/api/menus/:id', async (req, res) => {

  try {

    await db.query(
      'DELETE FROM menu WHERE id = $1',
      [req.params.id]
    );

    res.json({
      message: 'Menu deleted successfully'
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: 'Database error'
    });

  }

});

// ================= DELETE CHEF =================

app.delete('/api/chefs/:id', async (req, res) => {

  try {

    await db.query(
      'DELETE FROM chefs WHERE id = $1',
      [req.params.id]
    );

    res.json({
      message: 'Chef deleted successfully'
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: 'Database error'
    });

  }

});

// ================= BOOKINGS =================

app.post('/api/bookings', async (req, res) => {

  try {

    const {
      user_id,
      chef_id,
      booking_date,
      booking_time,
      total_amount
    } = req.body;

    const sql = `
      INSERT INTO bookings
      (user_id, chef_id, booking_date, booking_time, total_amount)
      VALUES ($1, $2, $3, $4, $5)
    `;

    await db.query(sql, [
      user_id,
      chef_id,
      booking_date,
      booking_time,
      total_amount
    ]);

    res.json({
      message: 'Booking saved successfully'
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: 'Database error'
    });

  }

});

// ================= EVENTS =================

app.post('/api/events', async (req, res) => {

  try {

    const {
      user_id,
      event_type,
      event_date,
      guests
    } = req.body;

    const sql = `
      INSERT INTO events
      (user_id, event_type, event_date, guests)
      VALUES ($1, $2, $3, $4)
    `;

    await db.query(sql, [
      user_id,
      event_type,
      event_date,
      guests
    ]);

    res.json({
      message: 'Event created successfully'
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: 'Database error'
    });

  }

});

// ================= GET EVENTS =================

app.get('/api/events', async (req, res) => {

  try {

    const sql = `
      SELECT events.*, users.username
      FROM events
      LEFT JOIN users
      ON events.user_id = users.id
      ORDER BY events.id DESC
    `;

    const results =
      await db.query(sql);

    res.json(results.rows);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: 'Database error'
    });

  }

});

// ================= DELETE EVENT =================

app.delete('/api/events/:id', async (req, res) => {

  try {

    await db.query(
      'DELETE FROM events WHERE id = $1',
      [req.params.id]
    );

    res.json({
      message: 'Event deleted successfully'
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: 'Database error'
    });

  }

});

// ================= BOOKING ITEMS =================

app.post('/api/booking-items', async (req, res) => {

  try {

    const {
      booking_id,
      menu_id,
      quantity
    } = req.body;

    const sql = `
      INSERT INTO booking_items
      (booking_id, menu_id, quantity)
      VALUES ($1, $2, $3)
    `;

    await db.query(sql, [
      booking_id,
      menu_id,
      quantity
    ]);

    res.json({
      message: 'Booking item added successfully'
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: 'Database error'
    });

  }

});

// ================= GET BOOKING ITEMS =================

app.get('/api/booking-items/:booking_id', async (req, res) => {

  try {

    const sql = `
      SELECT
        booking_items.id,
        booking_items.quantity,
        menu.name,
        menu.price,
        menu.image
      FROM booking_items
      JOIN menu
      ON booking_items.menu_id = menu.id
      WHERE booking_items.booking_id = $1
    `;

    const results =
      await db.query(sql, [
        req.params.booking_id
      ]);

    res.json(results.rows);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: 'Database error'
    });

  }

});

// ================= DELETE BOOKING ITEM =================

app.delete('/api/booking-items/:id', async (req, res) => {

  try {

    await db.query(
      'DELETE FROM booking_items WHERE id = $1',
      [req.params.id]
    );

    res.json({
      message: 'Booking item deleted successfully'
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: 'Database error'
    });

  }

});

// ================= HOME ROUTE =================

app.get('/', (req, res) => {
  res.send('Server Running Successfully');
});

// ================= SERVER =================

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});