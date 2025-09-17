import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/joke", async (req, res) => {
  try {
    const response = await fetch("https://official-joke-api.appspot.com/random_joke");
    const joke = await response.json();
    res.json(joke);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch joke" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

