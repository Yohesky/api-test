const { response } = require("express");
const Employee = require("../models/Employee");

const getEmployees = async (req, res = response) => {
  let status = req.query.status === 'activos' ? true : false

  let employees = await Employee.find({estado: status });
  
  res.json({
    ok: true,
    data: employees,
  });
};

const createEmployee = async (req, res = response) => {
  const employeeDb = new Employee(req.body);
  employeeDb.edad = calcularEdad(req.body.nacimiento)

  try {
    const employeeSaved = await employeeDb.save();

    res.json({
      ok: true,
      employeeSaved,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "error",
    });
  }
};

const updateEmployee = async (req, res = response) => {
  const id = req.params.id;
  try {
    const employeeDb = await Employee.findById(id);

    if (!employeeDb) {
      return res.status(404).json({
        ok: false,
        msg: "Employee not found",
      });
    }

    const employeeChanges = {
      ...req.body,
    };

    employeeChanges.edad = calcularEdad(req.body.nacimiento)

    const employeeUpdated = await Employee.findByIdAndUpdate(
      id,
      employeeChanges,
      { new: true }
    );
    res.json({
      ok: true,
      employeeUpdated,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error",
    });
  }
};

const deleteEmployee = async (req, res = response) => {
  const id = req.params.id;
  console.log(id)
  try {
    const employeeDb = await Employee.findById(id);

    if (!employeeDb) {
      return res.status(404).json({
        ok: false,
        msg: "Employee not found",
      });
    }

    await Employee.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Employee deleted",
    });
  } catch (error) {
    res.status(500).json({
      ok: true,
      msg: "Error",
    });
  }
};

const calcularEdad = (edad) => {
  let today = new Date();
  var timestamp = Date.parse(edad);
  var age = new Date(timestamp);

  var edad = today.getFullYear() - age.getFullYear();
  let difMeses = today.getMonth() - age.getMonth();

  if (difMeses < 0 || (difMeses === 0 && today.getDate() < age.getDate())) {
    edad--;
  }

  return edad;
};

module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
