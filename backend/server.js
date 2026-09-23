const express = require("express");
const cors = require("cors");
require("dotenv").config();

const chatRoutes = require("./routes/chatRoutes");

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => {
  res.json({
    message: "SnapRoll backend is running ",
  });
});

app.use("/api/chat", chatRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`SnapRoll backend running on port ${PORT}`);
});
