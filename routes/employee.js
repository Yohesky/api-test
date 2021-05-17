const { Router } = require("express");
const router = Router();

const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { updateEmployee, createEmployee, getEmployees, deleteEmployee } = require("../controllers/employee");


router.get("/getEmployees", getEmployees );

router.post("/saveEmployee", 
    [
        check("nombre", "nombre is required").not().isEmpty(),
        check("cargo", "cargo is required").not().isEmpty(),
        check("contratacion", "contratacion is required").not().isEmpty(),
        check("nacimiento", "nacimiento is required").not().isEmpty(),
        check("estado", "estado is boolean").isBoolean(),
        check("pais", "hiring is required").not().isEmpty(),
        check("area", "area is required").not().isEmpty(),
        validateFields
    ],
    createEmployee
);

router.delete("/deleteEmployee/:id", deleteEmployee);

router.put("/updateEmployee/:id", 
[
    check("nombre", "nombre is required").not().isEmpty(),
    check("cargo", "charge is required").not().isEmpty(),
    check("contratacion", "contratacion is required").not().isEmpty(),
    check("nacimiento", "nacimiento is required").not().isEmpty(),
    check("estado", "estado is required").not().isEmpty(),
    check("pais", "pais is required").not().isEmpty(),
    check("area", "area is required").not().isEmpty(),
    validateFields
],
updateEmployee
);



module.exports = router;
