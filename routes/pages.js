const express = require('express');
const router = express.Router();

const Page = require('../models/Page.js');

// @route  POST api/pages/test
// @desc Tests users route
// @access Public
router.post('/add', (req, res) => {
    Page.findOne({ id: req.body.id }).then(page => {
        const errors = {};
      if (page) {
        errors.id = 'Page with this id already exists !';
        console.log(errors)
        return res.status(400).json(errors)
      } else {
        const newPage = new Page({
          text: req.body.text,
          creator: req.body.creator
        })
        
        newPage
        .save()
        .then(page => res.json(page))
        .catch(err => console.log(err))
      }
    })
  })
  
  module.exports = router