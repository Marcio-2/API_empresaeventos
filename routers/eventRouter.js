const { addEvent, getEventByUserId, addUserToEvent,profitsForEvents, profitsAllForEvents } = require("../controllers/eventController");
const verifyToken = require("../middleware/auth");
const router = require("express").Router();

router.post("/addEvent", addEvent);
router.get("/profitsAllForEvents", profitsAllForEvents);
router.get("/:eventId/profitsForEvents", profitsForEvents);
router.patch("/:eventId/addUserToEvent",verifyToken, addUserToEvent);


router.get("/getEventByUserId", verifyToken, getEventByUserId);

module.exports = router;