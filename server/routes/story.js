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

      serverRes(res, 200, null, { stories });
    } catch (err) {
      console.log("Err: Fetch Stories", err);
      const msg = getErrMsg("err", "fetch", "stories");
      serverRes(res, 400, msg, null);
    }
  });

  app.post("/api/story/add/:userId", isAuth, async (req, res) => {
    const { userId } = req.params;
    const { title, description, geometry } = req.body;

    if (!title || !geometry) {
      const msg = getErrMsg("requiredFields");
      return serverRes(res, 400, msg, null);
    }

    try {
      const story = new Story({ user: userId, title, description, geometry });

      story.save();

      const msg = getMsg("Your new story has been saved.", "blue");

      serverRes(res, 200, msg, { story });
    } catch (err) {
      console.log("Err: Create Story", err);
      const msg = getErrMsg("err", "create", "story");
      serverRes(res, 400, msg, null);
    }
  });

  // Match Other Users Stories
  const calculateMaxDistance = ({ unit, maxDistance }) => {
    const distance = Number(maxDistance);
    // radians = distance / earth radius
    if (unit === "miles") {
      // mi radians = distance in mi / 3959
      return distance / 3959;
    }
    // km radians = distance in km / 6371
    return distance / 6371;
  };

  app.get("/api/story/match/:userId", isAuth, async (req, res) => {
    const { userId } = req.params;
    // Tokyo to Seoul 716 miles
    // Tokyo to Seoul 1,155 kilometers.
    // const miles = 706 / 3959;
    // const km = 1000 / 6371;
    const lng = parseFloat(req.query.lng);
    const lat = parseFloat(req.query.lat);

    const maxDistance = calculateMaxDistance(req.query);
    console.log(lng, lat, maxDistance);

    try {
      const match = await Story.aggregate().near({
        near: [lat, lng],
        maxDistance: maxDistance,
        spherical: true,
        distanceField: "dist.calculated"
      });

      // != NOT !== since typeof obj.user is an Object because it points to a ref for the user of this story
      const filteredMatch = match.filter(obj => obj.user != userId);

      serverRes(res, 200, null, { filteredMatch });
    } catch (err) {
      console.log("Err: Match Location", err);
      const msg = getErrMsg("err", "match", "other users");
      serverRes(res, 400, msg, null);
    }
  });
};
