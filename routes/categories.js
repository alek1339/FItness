const express = require('express');
const router = express.Router();

const Category = require('../models/Category.js');

// @route  POST category/test
// @desc Tests users route
// @access Public
router.post('/add', (req, res) => {
    Category.findOne({ id: req.body.id }).then(category => {
        const errors = {};
      if (category) {
        errors.id = 'Category with this id already exists !';
        return res.status(400).json(errors)
      } else {
        const newCategory = new Category({
          text: req.body.text,
          route: req.body.route,
          creator: req.body.creator
        })
        
        newCategory
        .save()
        .then(page => res.json(page))
        .catch(err => console.log(err))
      }
    })
  })

// @route  GET /category/
// @desc GET category route
// @access Public
router.get('/', (req, res) => {
    Category.find({}, function(err, category) {
      var categoryMap = {};
  
      category.forEach(function(category) {
        categoryMap[category._id] = category;
      });
  
      res.send(pageMap);  
    });
  })
  
  module.exports = router