const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const e = require("express");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

mongoose.connect("mongodb+srv://faithfulenam_db_user:b03hzyWd6jaPFEd8@cluster0.qmwdaye.mongodb.net/?appName=Cluster0");
      .then(() => console.log("Connected to MongoDB"))
      .catch(err=>console.log(err));
const UserSchema = new mongoose.Schema({
  username: String,
  password: String
});

const User = mongoose.model("User", UserSchema);

// REGISTER
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const newUser = new User({ username, password });
    await newUser.save();

    res.json({ success: true, message: "User registered!" });
  } catch (err) {
    res.json({ success: false, message: "Error registering user" });
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });

    if (user) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (err) {
    res.json({ success: false });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
