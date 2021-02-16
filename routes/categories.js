const express = require('express');
const router = express.Router();

const Category = require('../models/Category.js');

// @route  POST category/update
// @descCategories route update articles
// @access Public
router.post('/update', (req, res) => {
  Category.findOne({ id: req.body.id}).then(category => {
    let articles = category && category.articles ? category.articles : [];
    articles.push(req.body.articleId);

    async function updateArticlesArr(req){
      let updateCat = await Category.findOneAndUpdate({ id: req.body.id }, {articles: articles}, {
        returnOriginal: false
      });
    }

    updateArticlesArr(req)
  })
})

// @route  POST category/add
// @desc Categories route add new
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

// @route  GET /category/
// @desc GET category route
// @access Public
router.get('/sorted', (req, res) => {
  let route = req.body.route.substring(1)
  Category.find({route: route}, function(err, categories) {
    res.send(categories);  
  });
})
  
  module.exports = router