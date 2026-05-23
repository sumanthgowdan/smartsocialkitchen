const express = require('express');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const mysql = require('mysql2');

const bcrypt = require('bcrypt');
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configure MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '132004', // Change password to your MySQL setup
  database: 'social_kitchen'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to database');
});





// Registration Route
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';

      db.query(query, [username, email, hashedPassword], (err, result) => {
          if (err) {
              console.error('Error registering user:', err);
              return res.status(500).json({ message: 'Error registering user' });
          }
          res.status(201).json({ message: 'User registered successfully!' });
         // window.location.href = './login.html';

      });
  } catch (err) {
      console.error('Error during registration:', err);
      res.status(500).json({ message: 'Internal server error' });
  }
});



// Login Route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], async (err, results) => {
      if (err) {
          console.error('Error fetching user:', err);
          return res.status(500).json({ message: 'Error during login' });
      }

      if (results.length === 0) {
          return res.status(404).json({ message: 'User not found. Please register.' });
      }

      const user = results[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid credentials' });
      }

      res.status(200).json({ message: 'Login successful', user: { id: user.id, username: user.username } });
  });
});

app.post('/admin-login', (req, res) => {
  const { username, password } = req.body;

  // Hardcoded admin credentials (you can later move this to a database)
  const admin = { username: 'sumanth', password: 'sumanth132004' };

  if (username === admin.username && password === admin.password) {
      res.status(200).json({ message: 'Login successful!' });
  } else {
      res.status(401).json({ message: 'Invalid admin credentials!' });
  }
});








// Multer configuration
const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Routes
app.get('/api/menus', (req, res) => {
  db.query('SELECT * FROM menu', (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
});

app.get('/api/chefs', (req, res) => {
  db.query('SELECT * FROM chefs', (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
});

app.post('/api/menus', upload.single('image'), (req, res) => {
  const { name, description, price } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;
  const sql = 'INSERT INTO menu (name, description, price, image) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, description, price, image], err => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ message: 'Menu item added successfully' });
  });
});

app.post('/api/chefs', upload.single('image'), (req, res) => {
  const { name, specialty } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;
  const sql = 'INSERT INTO chefs (name, specialty, image) VALUES (?, ?, ?)';
  db.query(sql, [name, specialty, image], err => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ message: 'Chef added successfully' });
  });
});

// Update menu
app.put('/api/menus/:id', upload.single('image'), (req, res) => {
  const { name, description, price } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;
  const sql = image
    ? 'UPDATE menu SET name = ?, description = ?, price = ?, image = ? WHERE id = ?'
    : 'UPDATE menu SET name = ?, description = ?, price = ? WHERE id = ?';
  const params = image
    ? [name, description, price, image, req.params.id]
    : [name, description, price, req.params.id];

  db.query(sql, params, err => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ message: 'Menu item updated successfully' });
  });
});

// Update chef
app.put('/api/chefs/:id', upload.single('image'), (req, res) => {
  const { name, specialty } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;
  const sql = image
    ? 'UPDATE chefs SET name = ?, specialty = ?, image = ? WHERE id = ?'
    : 'UPDATE chefs SET name = ?, specialty = ? WHERE id = ?';
  const params = image
    ? [name, specialty, image, req.params.id]
    : [name, specialty, req.params.id];

  db.query(sql, params, err => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ message: 'Chef updated successfully' });
  });
});

// Delete routes remain unchanged
app.delete('/api/menus/:id', (req, res) => {
  db.query('DELETE FROM menu WHERE id = ?', [req.params.id], err => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ message: 'Menu item deleted successfully' });
  });
});

app.delete('/api/chefs/:id', (req, res) => {
  db.query('DELETE FROM chefs WHERE id = ?', [req.params.id], err => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ message: 'Chef deleted successfully' });
  });
});

app.post('/api/bookings', (req, res) => {
    const { user_id, chef_id, booking_date, booking_time, total_amount } = req.body;

    const sql = `
    INSERT INTO bookings (user_id, chef_id, booking_date, booking_time, total_amount)
    VALUES (?, ?, ?, ?, ?)
  `;

    db.query(sql, [user_id, chef_id, booking_date, booking_time, total_amount], (err, result) => {
        if (err) {
            console.error("Booking error:", err);
            return res.status(500).json({ message: "Database error" });
        }

        res.json({ message: "Booking saved successfully" });
    });
});

// Create Event
app.post('/api/events', (req, res) => {
    const { user_id, event_type, event_date, guests } = req.body;

    const sql = `
    INSERT INTO events (user_id, event_type, event_date, guests)
    VALUES (?, ?, ?, ?)
  `;

    db.query(sql, [user_id, event_type, event_date, guests], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }

        res.json({
            message: 'Event created successfully',
            event_id: result.insertId
        });
    });
});

// Get All Events
app.get('/api/events', (req, res) => {
    const sql = `
    SELECT events.*, users.username
    FROM events
    LEFT JOIN users ON events.user_id = users.id
    ORDER BY events.id DESC
  `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }

        res.json(results);
    });
});

// Delete Event
app.delete('/api/events/:id', (req, res) => {
    db.query('DELETE FROM events WHERE id = ?', [req.params.id], err => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }

        res.json({ message: 'Event deleted successfully' });
    });
});

// Add Booking Item
app.post('/api/booking-items', (req, res) => {
    const { booking_id, menu_id, quantity } = req.body;

    const sql = `
    INSERT INTO booking_items (booking_id, menu_id, quantity)
    VALUES (?, ?, ?)
  `;

    db.query(sql, [booking_id, menu_id, quantity], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }

        res.json({
            message: 'Booking item added successfully',
            id: result.insertId
        });
    });
});

// Get Booking Items
app.get('/api/booking-items/:booking_id', (req, res) => {
    const sql = `
    SELECT
      booking_items.id,
      booking_items.quantity,
      menu.name,
      menu.price,
      menu.image
    FROM booking_items
    JOIN menu ON booking_items.menu_id = menu.id
    WHERE booking_items.booking_id = ?
  `;

    db.query(sql, [req.params.booking_id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }

        res.json(results);
    });
});

// Delete Booking Item
app.delete('/api/booking-items/:id', (req, res) => {
    db.query('DELETE FROM booking_items WHERE id = ?', [req.params.id], err => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }

        res.json({ message: 'Booking item deleted successfully' });
    });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
