const Status = require('../models/Status');


exports.createStatus = async (req, res) => {
const { name, color } = req.body;
if (!name) return res.status(400).json({ message: 'Name required' });
const exists = await Status.findOne({ name });
if (exists) return res.status(400).json({ message: 'Status exists' });
const s = await Status.create({ name, color });
res.status(201).json(s);
};
exports.deleteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const status = await Status.findById(id);
    if (!status) return res.status(404).json({ message: "Status not found" });

    await Status.findByIdAndDelete(id);
    res.json({ message: "Status deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



exports.getStatuses = async (req, res) => {
const list = await Status.find().sort('name');
res.json(list);
};


exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, color } = req.body;

    const status = await Status.findById(id);
    if (!status) return res.status(404).json({ message: "Status not found" });

    // Update fields
    if (name) status.name = name;
    if (color) status.color = color;

    await status.save();

    res.json(status);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


