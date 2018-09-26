const express = require("express");

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT);

if (process.env.NODE_ENV === "production") {
  const path = require("path");

  app.use(express.static(path.resolve(__dirname, "dist", "aroundTheWorld")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "dist", "aroundTheWorld", "index.html")
    );
  });
} else {
  app.get("*", (req, res) =>
    res.send("JLab welcomes you to Around the World!")
  );
}
