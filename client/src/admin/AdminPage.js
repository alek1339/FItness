import React, { useState, useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { addArticle } from '../actions/articleActions.js';
import { addCategory, fetchCategories } from '../actions/categoryActions.js';


import { useSelector, useDispatch } from 'react-redux';

import isEmpty from "../validation/is-empty";

const AdminPage = () => {
   const dispatch = useDispatch();
   const editorRef = useRef();
   const [editorLoaded, setEditorLoaded] = useState(false);
   const [newArticle, setNewArticle] = useState("");
   const [newArticleId, setNewArticleId] = useState("");
   const categories = useSelector((state) => state.categories);
   const auth = useSelector((state) => state.auth);
   const errorId = useSelector((state) => state.errors.id);
   const [selectedParrentCategory, setNewselectedParrentCategory] = useState("");

   let [categoryTitle, setCategoryTitle] = useState('');
   const handleCategoryTitleChange = event => {
       setCategoryTitle(event.target.value);
   };
   let [categoryRoute, setCategoryRoute] = useState('');
   const handleCategoryRouteChange = event => {
       setCategoryRoute(event.target.value);
   };

  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react'),
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
    };
    setEditorLoaded(true);

    dispatch(fetchCategories());
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const article = {
        htmlData: newArticle,
        id: newArticleId,
        creator: auth.user.id,
        categoryId: selectedParrentCategory === "" ? categories[0].id : categories.find(cat => cat.text ===selectedParrentCategory).id
      }

      if(!isEmpty(article.htmlData)){
        dispatch(addArticle(article))
      }
   
  }

  const submitNewCategory = (e) => {
    e.preventDefault();
    const category = {
      text: categoryTitle,
      route: categoryRoute,
      creator: auth.user.id,
      id: categories.length + 1,
      selectedParrentCategory: selectedParrentCategory
    };
    if(!isEmpty(category.text)){
      dispatch(addCategory(category))
    }
  }

  const handleSelect = (e) => {
    setNewselectedParrentCategory(e.target.value)
  }

  return editorLoaded ? (
    <div>
      <div>
        Create new Category 
        <div>
          Choose Category:
          <select onChange={e => handleSelect(e)}>
            {categories.map((category)=> {
              return(
              <option value={category.text} >{category.text}</option>
              )
            })}
          </select>
        </div>
        <div>
          <input placeholder="Category" onChange={handleCategoryTitleChange}/>
          <input placeholder="Route" onChange={handleCategoryRouteChange}/>
          <button onClick={submitNewCategory}>Add new Category</button>
        </div>
      </div>
          <CKEditor
            editor={ClassicEditor}
            data='<p>Hello from CKEditor 5!</p>'
            config={{ckfinder: {
              // Upload the images to the server using the CKFinder QuickUpload command.
              uploadUrl: 'http://localhost:3000/admin'
            }}}
            onInit={editor => {
              // You can store the "editor" and use when it is needed.
              console.log('Editor is ready to use!', editor)
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setNewArticle(data)
              setNewArticleId(editor.id)
            }}
          />
          <p className='error'>{errorId ? errorId : ''}</p>
          <button onClick={onSubmit}>Submit</button>
    </div>
  ) : (
    <div>Editor loading</div>
  )
}

export default AdminPage;