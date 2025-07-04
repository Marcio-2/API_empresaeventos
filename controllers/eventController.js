const eventModel = require("../models/eventModel");

const addEvent = async (req, res) => {
  try {
    const { title, description, location, ticketPrice, attendess } = req.body;

    const newEvent = new eventModel({
      title,
      description,
      location,
      ticketPrice,
      attendess,
    });
    await newEvent.save();
    res
      .status(500)
      .json({ message: "Evento creado correctamente", newEvent: newEvent });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el evento", error: error.message });
  }
};

module.exports = { addEvent };
