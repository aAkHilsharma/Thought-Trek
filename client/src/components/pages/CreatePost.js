import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Editor from '../Editor';

const CreatePost = () => {
  const [post, setPost] = useState({
    title: '',
    summary: '',
  });
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function createNewPost(e) {
    const data = new FormData();
    const { title, summary } = post;
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);
    e.preventDefault();
    const response = await fetch('http://localhost:5000/post', {
      method: 'POST',
      body: data,
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
    }
  }
  if (redirect) {
    return <Navigate to={'/'} />;
  }
  return (
    <form onSubmit={createNewPost}>
      <input
        type='text'
        name='title'
        placeholder={'Title'}
        value={post.title}
        onChange={handleChange}
      />
      <input
        type='text'
        name='summary'
        placeholder={'Summary'}
        value={post.summary}
        onChange={handleChange}
      />
      <input type='file' onChange={(e) => setFiles(e.target.files)} />
      <Editor value={content} onChange={setContent} />
      <button style={{ marginTop: '5px' }}>Create post</button>
    </form>
  );
};

export default CreatePost;
