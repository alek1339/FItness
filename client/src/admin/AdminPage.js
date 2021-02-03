import React, { useState, useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { addArticle } from '../actions/articleActions.js';

import { useSelector, useDispatch } from 'react-redux';

const AdminPage = () => {
  const dispatch = useDispatch();
    const editorRef = useRef();
   const [editorLoaded, setEditorLoaded] = useState(false);
   const [newArticle, setNewArticle] = useState("");

  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react'),
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
    }
    setEditorLoaded(true)
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()

    const article = {
      htmlData: newArticle,
        id: '12321',
        creator: 'Az',
      }
    
    dispatch(addArticle(article))
  }

  return editorLoaded ? (
    <div>
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
              console.log({ event, editor, data });
            }}
          />
          <button onClick={onSubmit}>Submit</button>
    </div>
  ) : (
    <div>Editor loading</div>
  )
}

export default AdminPage;