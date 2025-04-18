const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = ["http://localhost:3000", "http://127.0.0.1:3001", "http://localhost:5001"];
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

app.use(cookieParser());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error(err));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
const leaveRoutes = require("./routes/leaveRequests");
app.use("/api/leave-requests", leaveRoutes);
const applyRoutes = require("./routes/apply");
app.use("/api/apply", applyRoutes);
// Test root route
app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

