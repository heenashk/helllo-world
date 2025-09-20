

// version 3

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const multer = require("multer");
const path = require("path");

const app = express();

// Middleware
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: "studyhubsecret",
  resave: false,
  saveUninitialized: true
}));

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/dsstudyhub", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

// Schemas
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});
const User = mongoose.model("user", UserSchema);

const FileSchema = new mongoose.Schema({
  originalname: String,
  filename: String
});
const File = mongoose.model("File", FileSchema);

// Multer config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Protect routes middleware
function requireLogin(req, res, next) {
  if (!req.session.user) return res.redirect("/login");
  next();
}

// Routes

// Home
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home1.html"));
});

// Register
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "register.html"));
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return res.status(400).send("❌ Invalid email format");
  }

  // Password validation
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordPattern.test(password)) {
    return res.status(400).send(
      "❌ Password must be at least 8 characters long, include uppercase, lowercase, number, and special character."
    );
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("⚠️ Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).send("✅ User registered successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Server error");
  }
});

// Login
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.send("❌ Invalid credentials. <a href='/login'>Try again</a>");
  }

  req.session.user = user;
  res.redirect("/notes");
});

// Logout
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      return res.redirect("/");
    }
    res.clearCookie("connect.sid");
    res.redirect("/login");
  });
});

// Notes (protected)
app.get("/notes", requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

// File upload (protected)
app.post("/upload", requireLogin, upload.single("file"), async (req, res) => {
  await File.create({ originalname: req.file.originalname, filename: req.file.filename });
  res.send("✅ File uploaded successfully");
});

// Show files (protected)
app.get("/files", requireLogin, async (req, res) => {
  const files = await File.find();
  res.json(files);
});

// Download file (protected)
app.get("/download/:id", requireLogin, async (req, res) => {
  const file = await File.findById(req.params.id);
  if (!file) return res.status(404).send("File not found");
  res.download(path.join(__dirname,  "materials", file.filename), file.originalname);
});

// Start server
app.listen(3000, () => console.log("🚀 Server running at http://localhost:3000"));
