const eventModel = require("../models/eventModel");
const userModel = require("../models/userModel");

const addEvent = async (req, res) => {
  try {
    const { title, description, location, ticketPrice, attendees } = req.body;
    // const userId = req.user.userId;

    const newEvent = new eventModel({
      title,
      description,
      location,
      ticketPrice,
      attendees,
    });
    await newEvent.save();
    res
      .status(201)
      .json({ message: "Evento creado correctamente", newEvent: newEvent });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el evento", error: error.message });
  }
};

const getEventByUserId = async (req, res) => {
  try {
    const userId = req.user.userId;
    // const events = await eventModel.find({ attendees: userId });

    const events = await eventModel.find();

    const eventsByUserId = events.filter((event) =>
      event.attendees.includes(userId)
    );

    res.status(200).json(eventsByUserId);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el evento", error: error.message });
  }
};

const addUserToEvent = async (req, res) => {
  try {
    const userId = req.user.userId;
    const eventId = req.params.eventId;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const event = await eventModel.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    const isUserAttending = event.attendees.includes(userId)
      if (!isUserAttending) {
      return res
      .status(404)
      .json({ message: "El usuario ya esta en la lista." });
    }

    event.attendees.push(userId);

    event.save();

    res.status(200).json(event);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el evento", error: error.message });
  }
};

const profitsForEvents = async (req, res) => {
  try {
    const eventId = req.params.eventId;

    const event = await eventModel.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }
 
    const profits = event.ticketPrice * event.attendees.length;

    res.status(200).json(profits);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el evento", error: error.message });
  }
};
const profitsAllForEvents = async (req, res) => {
  try {
    const events = await eventModel.findById();
   
    let profits = 0;

    events.forEach((event)=> {
      profits += event.ticketPrice * event.attendees.length;
    });

    res.status(200).json(profits);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el evento", error: error.message });
  }
};
module.exports = { 
  addEvent, 
  getEventByUserId,
  addUserToEvent,
  profitsForEvents,
  profitsAllForEvents 
};
