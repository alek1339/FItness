const express = require('express');
const router = express.Router();

const Article = require('../models/Article.js');

// @route  POST api/articles/test
// @desc Tests users route
// @access Public
router.post('/add', (req, res) => {
    console.log('here')
    Article.findOne({ id: req.body.id }).then(article => {
      if (article) {
        errors.email = 'Article with this id already exists !'
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