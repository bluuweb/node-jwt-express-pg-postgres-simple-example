import express from "express";

const app = express();

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
});
