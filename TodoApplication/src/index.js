import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Port Active");
});
// Error handling

// Server
app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
  setInterval(()=>{
    console.log("active")
  },50000)
});
