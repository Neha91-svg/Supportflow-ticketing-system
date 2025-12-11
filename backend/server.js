const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errorHandler } = require('./utils/errorHandler');

const agentRoutes = require('./routes/agentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userTicketRoutes = require("./routes/userTicketRoutes");

// Load env
dotenv.config();

// Connect Database
connectDB().catch((err) => {
  console.error(" Database connection failed:", err.message);
  process.exit(1);
});

const app = express();

// Middlewares
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://supportflow-3rlg7beco-neha91-svgs-projects.vercel.app"],
    credentials: true,
  })
);

app.use(express.json());
app.use(helmet());

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
});
app.use(limiter);

// Health Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server running successfully',
  });
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/departments', require('./routes/departmentRoutes'));
app.use('/api/statuses', require('./routes/statusRoutes'));
app.use('/api/priorities', require('./routes/priorityRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use('/api/agents', agentRoutes);
app.use('/api/admin', adminRoutes);
app.use("/api/user-tickets", userTicketRoutes);

app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
