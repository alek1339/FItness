import React, { useState, useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { addArticle } from '../actions/articleActions.js';
import { addPage } from '../actions/pageActions.js';


import { useSelector, useDispatch } from 'react-redux';

import isEmpty from "../validation/is-empty";

const AdminPage = () => {
  const dispatch = useDispatch();
    const editorRef = useRef();
   const [editorLoaded, setEditorLoaded] = useState(false);
   const [newArticle, setNewArticle] = useState("");
   const [newArticleId, setNewArticleId] = useState("");
   const auth = useSelector((state) => state.auth);
   const errorId = useSelector((state) => state.errors.id);

   let [pageTitle, setPageTitle] = useState('');
   const handlePageTitleChange = event => {
       setPageTitle(event.target.value);
   };

  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react'),
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
    }
    setEditorLoaded(true)
  }, [])

  const onSubmit = (e) => {
    e.preventDefault();

    const article = {
      htmlData: newArticle,
        id: newArticleId,
        creator: auth.user.id,
      }

      if(!isEmpty(article.htmlData)){
        dispatch(addArticle(article))
      }
   
  }

  const submitNewPage = (e) => {
    e.preventDefault();

    const page = {
      text: pageTitle,
      creator: auth.user.id,
    }
    if(!isEmpty(page.text)){
      dispatch(addPage(page))
    }
  }

  return editorLoaded ? (
    <div>
      <div>
        Create new Page 
        <div>
          <input onChange={handlePageTitleChange}/>
          <button onClick={submitNewPage}>Add new Page</button>
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