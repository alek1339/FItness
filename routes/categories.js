const express = require('express');
const router = express.Router();

const Category = require('../models/Category.js');

// @route  POST category/test
// @desc Tests categories route
// @access Public
router.post('/add', (req, res) => {
 
    Category.findOne({ id: req.body.id }).then(category => {
        const errors = {};
        const selectedParrentCategory = req.body.selectedParrentCategory;

        async function updateArr(id) {
          if(selectedParrentCategory !== ""){
            let cat = await Category.findOne({text:selectedParrentCategory });
            let subCatUpdated = cat.subCat
            subCatUpdated.push(id)
            let doc = await Category.findOneAndUpdate({text:selectedParrentCategory }, {subCat: subCatUpdated}, {
              returnOriginal: false
            });
          }
        }
      if (category) {
        errors.id = 'Category with this id already exists !';
        return res.status(400).json(errors)
      } else {
        const newCategory = new Category({
          text: req.body.text,
          route: req.body.route,
          creator: req.body.creator,
          id: req.body.id
        })
        
        newCategory
        .save()
        .then(page =>{
          updateArr(page.id);

           res.json(page)
          })
        .catch(err => console.log(err))
      }
    })
  })

// @route  GET /category/
// @desc GET category route
// @access Public
router.get('/', (req, res) => {
  Category.find({}, function(err, categories) {
    res.send(categories);  
  });
})
  
  module.exports = router