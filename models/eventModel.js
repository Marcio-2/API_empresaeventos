const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true
    },
      description: {
        type:String,
        required: true
    },
      location: {
        type:String,
        required: true
    },
      ticketPrice: {
        type:String,
        required: true
    },
    attendees: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", //Referencia al modelo de usuario 
        },
    ],
    createAt: {
        type: Date,
        default: Date.now,
    },
});

const Event = mongoose.model("Event", eventSchema, "Events");

module.exports = Event;