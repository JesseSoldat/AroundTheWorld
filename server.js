require("./server/config/config");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.listen(process.env.PORT);

app.use(bodyParser.json());

require("./server/routes/auth")(app);

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
