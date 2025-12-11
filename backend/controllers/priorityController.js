const Priority = require("../models/Priority");

exports.createPriority = async (req, res) => {
  const { name, color } = req.body;
  if (!name) return res.status(400).json({ message: "Name required" });
  const exists = await Priority.findOne({ name });
  if (exists) return res.status(400).json({ message: "Priority exists" });
  const p = await Priority.create({ name, color });
  res.status(201).json(p);
};

exports.getPriorities = async (req, res) => {
  const list = await Priority.find().sort("name");
  res.json(list);
};

exports.deletePriority = async (req, res) => {
  try {
    const { id } = req.params;
    const priority = await Priority.findById(id);
    if (!priority) return res.status(404).json({ message: "Priority not found" });

    await Priority.findByIdAndDelete(id);
    res.json({ message: "Priority deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updatePriority = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, level } = req.body;

    const priority = await Priority.findById(id);
    if (!priority) return res.status(404).json({ message: "Priority not found" });

    if (name && name !== priority.name) {
      const exists = await Priority.findOne({ name });
      if (exists) return res.status(400).json({ message: "Priority name already exists" });
    }

    priority.name = name || priority.name;
    priority.description = description || priority.description;
    priority.level = level || priority.level;

    await priority.save();
    res.json(priority);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};