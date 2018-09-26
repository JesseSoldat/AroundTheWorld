module.exports = app => {
  // Register
  app.post("/api/register", async (req, res) => {});

  // Login
  app.post("/api/login", async (req, res) => {});

  // Logout
  app.delete("/api/logout", async (req, res) => {});

  // Reset Password
  app.patch("/api/resetPasswordEmail", async (req, res) => {});

  app.patch("/api/resetPassword", async (req, res) => {});
};
