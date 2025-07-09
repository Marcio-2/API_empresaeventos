const { 
    addEvent,
    getEventByUserId, 
    addUserToEvent,
    profitsForEvents, 
    profitsAllForEvents,
    downloadEventExcel,
    downloadEventPDF 
} = require("../controllers/eventController");
const verifyToken = require("../middleware/auth");
const router = require("express").Router();

router.post("/addEvent", addEvent);
router.get("/profitsAllForEvents", profitsAllForEvents);
router.get("/downloadEventExcel", downloadEventExcel);
router.get("/downloadEventPDF", downloadEventPDF);
router.get("/:eventId/profitsForEvents", profitsForEvents);
router.patch("/:eventId/addUserToEvent",verifyToken, addUserToEvent);

router.get("/getEventByUserId", verifyToken, getEventByUserId);

module.exports = router;