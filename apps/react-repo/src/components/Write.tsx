import '@styles/write.css';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userType } from '@/types';

export default function Write() {
  const [user, setUser] = useState<userType>();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  const navigate = useNavigate();

  const submitHandler = async () => {
    if (!user) return;
    if (!titleRef.current || !contentRef.current) return;

    const userID = user.id;
    const title = titleRef.current.value;
    const content = contentRef.current.value;

    if (/^\s*$/.test(title)) {
      alert('title is empty');
      return;
    }
    if (/^\s*$/.test(content)) {
      alert('content is empty');
      return;
    }

    console.log(userID, title, content);

    const response = await fetch('/api/contents', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content, userID }),
    });

    if (response.ok) {
      const result = await response.json();
      navigate(`/react/content/${result}`);
    }
  };

  const discardHandler = () => {
    navigate(-1);
  };

  useEffect(() => {
    const userJson = sessionStorage.getItem('user');
    if (!userJson) return;
    const userData = JSON.parse(userJson);
    setUser(userData);
  }, []);

  return (
    <>
      <h1>Create Post</h1>
      <input
        className='title-input default-shadow'
        placeholder='Title'
        ref={titleRef}
      />
      <textarea
        className='content-input default-shadow'
        placeholder='Content'
        ref={contentRef}
      />
      <div className='button-container'>
        <button onClick={submitHandler}>Submit</button>
        <button onClick={discardHandler}>Discard</button>
      </div>
    </>
  );
}
