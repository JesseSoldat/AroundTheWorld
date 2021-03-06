require("./server/config/config");

const express = require("express");
const bodyParser = require("body-parser");
const connectToDb = require("./server/db/mongoose");

const app = express();

connectToDb();

app.listen(process.env.PORT);

app.use(bodyParser.json());

require("./server/routes/auth")(app);
require("./server/routes/story")(app);
require("./server/routes/friend")(app);
require("./server/routes/profile")(app);

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
