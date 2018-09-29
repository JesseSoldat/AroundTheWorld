// Models
const Story = require("../models/story");
// Middleware
const isAuth = require("../middleware/isAuth");
// Utils
const { serverRes, getMsg, getErrMsg } = require("../utils/serverRes");

module.exports = app => {
  app.get("/api/story/:userId", isAuth, async (req, res) => {
    const { userId } = req.params;

    try {
      const stories = await Story.find({ user: userId });

      serverRes(res, 200, msg, { stories });
    } catch (err) {
      console.log("Err: Fetch Stories", err);
      const msg = getErrMsg("err", "fetch", "stories");
      serverRes(res, 400, msg, null);
    }
  });

  app.post("/api/story/add/:userId", isAuth, async (req, res) => {
    const { userId } = req.params;
    const { title, description, location } = req.body;

    if (!title || !location) {
      const msg = getErrMsg("requiredFields");
      return serverRes(res, 400, msg, null);
    }

    try {
      const story = new Story({ user: userId, title, description, location });

      story.save();

      const msg = getMsg("Your new story has been saved.", "blue");

      serverRes(res, 200, msg, { story });
    } catch (err) {
      console.log("Err: Create Story", err);
      const msg = getErrMsg("err", "create", "story");
      serverRes(res, 400, msg, null);
    }
  });
};
