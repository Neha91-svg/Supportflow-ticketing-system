const Department = require('../models/Department');

exports.createDepartment = async (req, res) => {
  const { name, description } = req.body;
  if (!name) return res.status(400).json({ message: 'Name is required' });
  const exists = await Department.findOne({ name });
  if (exists) return res.status(400).json({ message: 'Department exists' });
  const d = await Department.create({ name, description });
  res.status(201).json(d);
};

exports.getDepartments = async (req, res) => {
  const list = await Department.find().sort('name');
  res.json(list);
};

exports.deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findById(id);
    if (!department) return res.status(404).json({ message: "Department not found" });

    await Department.findByIdAndDelete(id);
    res.json({ message: "Department deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const department = await Department.findById(id);
    if (!department) return res.status(404).json({ message: "Department not found" });

    // Check for duplicate name
    if (name && name !== department.name) {
      const exists = await Department.findOne({ name });
      if (exists) return res.status(400).json({ message: "Department name already exists" });
    }

    department.name = name || department.name;
    department.description = description || department.description;

    await department.save();
    res.json(department);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

