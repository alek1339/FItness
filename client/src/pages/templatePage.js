import React, { useEffect, useState  } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchArticles } from "../actions/articleActions.js";
import {  fetchCategories } from '../actions/categoryActions.js';

import parse from 'html-react-parser';

const TemplatePage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles);
  const currentPath = location.pathname;
  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    const currentPath = location.pathname;
    console.log(currentPath)
    dispatch(fetchArticles());
    dispatch(fetchCategories());
  }, [location]);

  return (
    
    <div>
       { 
        categories.find(cat => cat.route === currentPath.substring(1))
        &&  categories.find(cat => cat.route === currentPath.substring(1)).subCat.length > 0 ?
        categories.find(cat => cat.route === currentPath.substring(1)).subCat.map(subCat => {
           return categories.map(category => {
           return category.id === subCat ?  <a href={category.route}>{category.text}</a> : ''
          })
        }) : 'no subcat'
      }

      {articles ? articles.filter(el =>categories.find(cat => cat.route === currentPath.substring(1)) && categories.find(cat => cat.route === currentPath.substring(1)).articles.includes(el.id)).map(cat => {
        return parse(cat.htmlData)
      }) : ""}
     
    </div>
  )
}

export default TemplatePage;