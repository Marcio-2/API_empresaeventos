const eventModel = require("../models/eventModel");
const userModel = require("../models/userModel");
const XLSX = require("xlsx");
const PDFDocument = require("pdfkit");

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

    const isUserAttending = event.attendees.includes(userId);
    if (!isUserAttending) {
      return res
        .status(404)
        .json({ message: "El usuario ya esta en la lista." });
    }

    event.attendees.push(userId);

    await event.save();

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
    const events = await eventModel.find();

    let profits = 0;

    events.forEach((event) => {
      profits += event.ticketPrice * event.attendees.length;
    });

    res.status(200).json(profits);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el evento", error: error.message });
  }
};

const downloadEventExcel = async (req, res) => {
  try {
    const events = await eventModel.find();
    if (events.length === 0) {
      return res.status(404).json({ message: "No se encontraron eventos" });
    }

    const data = events.map((event) => ({
      Titulo: event.title,
      Descripcion: event.description,
      Ubicacion: event.location,
      "Precio de ticket": event.ticketPrice,
      "Creado el": event.createAt,
      Asistentes: event.attendees.join("---"),
    }));

    const workbook = XLSX.utils.book_new(); //arrancar una nueva hoja
    const workSheet = XLSX.utils.json_to_sheet(data); //pasar datos a la hoja

    XLSX.utils.book_append_sheet(workbook, workSheet); //unir los 2 de arriba

    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Content-Disposition", "attachment; filename=events.xlsx");

    res.status(200).send(buffer);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el evento", error: error.message });
  }
};

const downloadEventPDF = async (req, res) => {
  try {
    const events = await eventModel.find();
    if (events.length === 0) {
      return res.status(404).json({ message: "No se encontraron eventos" });
    }
    const doc = new PDFDocument();

    const buffers = [];

    doc.on("data", (chunk) => buffers.push(chunk));

    doc.fontSize(19).text("Listado de eventos", { align: "center" });
    doc.moveDown();

    events.forEach((event) => {
      doc.fontSize(14).text(`Titulo: ${event.title}`);
      doc.text(`Descripcion: ${event.description}`);
      doc.text(`Fecha de Creacion: ${event.createAt}`);
      doc.text(`Ubicacion: ${event.location}`);
      doc.text(`Precio de Entrada: ${event.ticketPrice}`);
      doc.text("---");
      doc.moveDown();
    });

    doc.on("end", () => {
      const pdfBuffer = Buffer.concat(buffers);
      res.setHeader("Content-Type", "application/pdf");
      res.status(200).send(pdfBuffer);
    });

    doc.end();
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
  profitsAllForEvents,
  downloadEventExcel,
  downloadEventPDF,
};
