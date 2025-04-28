const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth.routes");
const bookRoutes = require("./routes/book.routes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("src/uploads"));
app.use("/auth", authRoutes);
app.use("/books", bookRoutes);

app.get("/", (req, res) => res.send("Server is running"));

const PORT = process.env.PORT || 5050;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);

app.use((err, req, res, next) => {
  console.error("❌ 에러 발생:", err.message);
  res.status(500).json({ message: "서버 오류", error: err.message });
});
