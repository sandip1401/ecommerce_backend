const express = require("express");
const Enquiry = require("../models/eneq");
const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const { name, email, mobile, message } = req.body;
    if (!name || !email || !mobile || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newEnquiry = new Enquiry({ name, email, mobile, message });
    await newEnquiry.save();
    res.status(201).json({ message: "Data saved successfully", enquiry: newEnquiry });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error saving data", error });
  }
});

// READ
router.get("/", async (req, res) => {
  try {
    const allEnquiries = await Enquiry.find();
    res.json(allEnquiries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const { name, email, mobile, message } = req.body;
    const updated = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { name, email, mobile, message },
      { new: true }
    );
    res.json({ message: "Record updated", updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating record", error });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Enquiry.findByIdAndDelete(req.params.id);
    res.json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting record", error });
  }
});

module.exports = router; // ✅ important
