const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

// Example route
app.get("/", (req, res) => {
  res.send("🚀 Hello from Firebase App Hosting backend!");
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
