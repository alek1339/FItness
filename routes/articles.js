const express = require('express');
const router = express.Router();

const Article = require('../models/Article.js');

// @route  GET api/articles/test
// @desc Tests articles route
// @access Public
router.get('/test', (req, res) => {
  Article.find({}, function(err, articles) {
    var userMap = {};

    articles.forEach(function(article) {
      articleMap[article._id] = article;
    });

    res.send(articleMap);  
  });
})

// @route  GET /articles/
// @desc GET articles route
// @access Public
router.get('/', (req, res) => {
  Article.find({}, function(err, articles) {
    res.send(articles);  
  });
})


// @route  POST api/articles/test
// @desc Tests articles route
// @access Public
router.post('/add', (req, res) => {
    Article.findOne({ id: req.body.id }).then(article => {
        const errors = {};
      if (article) {
        errors.id = 'Article with this id already exists !';
        console.log(errors)
        return res.status(400).json(errors)
      } else {
        const newArticle = new Article({
          htmlData: req.body.htmlData,
          creator: req.body.creator,
          id: req.body.id 
        })
        
        newArticle
        .save()
        .then(article => res.json(article))
        .catch(err => console.log(err))
      }
    })
  })
  
  module.exports = router