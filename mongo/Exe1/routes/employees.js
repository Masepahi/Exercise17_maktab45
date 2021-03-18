const express = require("express");
const router = express.Router();
const Employees = require("../models/employees");
const Company = require("../models/company");

router.get("/", (req, res) => {
  Employees.find({}, (err, employees) => {
    if (err)
      return res.status(500).json({ msg: "Server Error :)", err: err.message });
    res.json(employees);
  });
});

router.get("/getOne/:id", (req, res) => {
  console.log('getOne');
  Employees.find({ _id: req.params.id }, (err, company) => {
    if (err)
      return res.status(500).json({ msg: "Server Error :)", err: err.message });
    res.json(company);
  });
});

router.post("/createEmployee", (req, res) => {
  if (
    !req.body.name ||
    !req.body.familyName ||
    !req.body.nationalCode ||
    !req.body.sex ||
    !req.body.age ||
    !req.body.company ||
    !req.body.isAdmin
  ) {
    return res.status(400).json({ msg: "Bad Request :)" });
  }
  Employees.find({ nationalCode: req.body.nationalCode }, (err, employee) => {
    if (err)
      return res.status(500).json({ msg: "Server Error :)", err: err.message });
    if (employee)
      return res.status(400).json({ msg: "National Code already exists!" });
  });
  Employees.find({ company: req.body.company }, (err, employees) => {
    for (let employee of employees) {
      if ((employee.isAdmin = true))
        return res.status(400).json({ msg: "a company cant have 2 admins :)" });
    }
  });

  const newEmployee = new Employees({
    name: req.body.name,
    familyName: req.body.familyName,
    nationalCode: req.body.nationalCode,
    sex: req.body.sex,
    age: req.body.age,
    company: req.body.company,
    isAdmin: req.body.isAdmin,
  });

  newEmployee.save((err, employee) => {
    if (err)
      return res.status(500).json({ msg: "Server Error :)", err: err.message });
    res.json(employee);
  });
});

router.post("updateEmployee/:id", (req, res) => {
  let body = req.body;
  const updatedEmployee = {
    name: body.name,
    familyName: body.familyName,
    nationalCode: body.nationalCode,
    company: body.company,
    isAdmin: body.isAdmin
  };
  Employees.findOneAndUpdate(
    { _id: req.params.id },
    updatedEmployee,
    { new: true },
    (err, employee) => {
      if (err)
        return res
          .status(500)
          .json({ msg: "Server Error :)", err: err.message });
      res.json(employee);
    }
  );
});

router.delete("/deleteEmployee/:id", (req, res) => {
  console.log(req.params.id);
  Employees.findOneAndDelete({ _id: req.params.id }, (err, Employee) => {
    if (err)
      return res.status(500).json({ msg: "Server Error :)", err: err.message });
    res.json({ Employee, msg: "success" });
  });
});

router.get('/age', (req, res) => {
  Employees.find({age: {$lt : 30 , $gt : 20}}, (err, employee) => {
    if (err) return res.status(500).json({ msg: "Server Error :)", err: err.message });
    res.json(employee);
  })
})


router.get('/admin/allAdmin', (req, res) => {
  Employees.find({isAdmin: true}, (err, employee) => {
    if (err) return res.status(500).json({ msg: "Server Error :)", err: err.message });
    res.json(employee);
  })
})


router.get('/mokhaberat/employees', (req, res) => {
  Employees.find({company: "Mokhaberat"}, (err, employee) => {
    if (err) return res.status(500).json({ msg: "Server Error :)", err: err.message });
    res.json(employee);
  })
});


router.get('/mokhaberat/admin', (req, res) => {
  Employees.find({$and: [{company: "Mokhaberat"},{isAdmin: true}] }, (err, employee) => {
    if (err) return res.status(500).json({ msg: "Server Error :)", err: err.message });
    for (let i = 0; i < employee.length; i++) {
      res.json(employee[i].name + " " + employee[i].familyName);
    }
  })
})


module.exports = router;
