const authCheckForm = require("../middleware/authCheckForm");

module.exports = app => {
  // Register
  app.post("/api/register", authCheckForm, async (req, res) => {
    const { username, email, password } = req.body;

    res.status(200).send({ msg: "ok" });
  });

  // Login
  app.post("/api/login", async (req, res) => {});

  // Logout
  app.delete("/api/logout", async (req, res) => {});

  // Reset Password
  app.patch("/api/resetPasswordEmail", async (req, res) => {});

  app.patch("/api/resetPassword", async (req, res) => {});
};
