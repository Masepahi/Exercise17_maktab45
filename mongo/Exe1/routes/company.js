const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Company = require("../models/company");

router.get("/", (req, res) => {
  Company.find({}, (err, companies) => {
    if (err)
      return res.status(500).json({ msg: "Server Error :)", err: err.message });
    res.json(companies);
  });
});

router.get("/:id", (req, res) => {
  Company.find({ _id: req.params.id }, (err, company) => {
    if (err)
      return res.status(500).json({ msg: "Server Error :)", err: err.message });
    res.json(company);
  });
});

router.post("/createCompany", (req, res) => {
  if (
    !req.body.userName ||
    !req.body.city ||
    !req.body.state ||
    !req.body.contactNumber
  ) {
    return res.status(400).json({ msg: "Bad Request :)" });
  }

  Company.find({ userName: req.body.userName }, (err, company) => {
    if (err)
      return res.status(500).json({ msg: "Server Error :)", err: err.message });
    if (company)
      return res
        .status(404)
        .json({ msg: "Company with same name already exists :)" });

    const newCompany = new Company({
      userName: req.body.userName,
      city: req.body.city,
      state: req.body.state,
      contactNumber: req.body.contactNumber,
      registrationNumber: Math.floor(Math.random() * 9999999 + 1000000),
    });
    newCompany.save((err, company) => {
      if (err)
        return res
          .status(500)
          .json({ msg: "Server Error :)", err: err.message });
      res.json(company);
    });
  });
});

router.post("/updateCompany/:id", (req, res) => {
  let body = req.body;
  const updatedCompany = {
    userName: body.userName,
    city: body.city,
    state: body.state,
    contactNumber: body.contactNumber,
  };
  console.log(updatedCompany);
  Company.findOneAndUpdate(
    { _id: req.params.id },
    updatedCompany,
    { new: true },
    (err, company) => {
      if (err)
        return res
          .status(500)
          .json({ msg: "Server Error :)", err: err.message });
      res.json(company);
    }
  );
});

router.delete("/deleteCompany/:id", (req, res) => {
  Company.findOneAndDelete({ _id: req.params.id }, (err, company) => {
    if (err)
      return res.status(500).json({ msg: "Server Error :)", err: err.message });
    res.json({ company, msg: "success" });
  });
});

router.get("/updateCompany/updateAll", (req, res) => {
  Company.updateMany({}, {$set: {state: "Tehran", city: "Tehran"}}, (err, companies) => {
    if (err)
      return res.status(500).json({ msg: "Server Error :)", err: err.message });
    res.json({ companies, msg: "success" });
  })
})

module.exports = router;
