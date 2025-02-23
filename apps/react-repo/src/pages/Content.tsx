import { useEffect, useRef, useState } from 'react';
import { commentType, contentType, userType } from 'types';
import { format } from 'date-fns';
import Card from '@/components/Card';

import '@styles/content.css';
import { useParams } from 'react-router-dom';

export default function Content() {
  const [content, setContent] = useState<contentType>();
  const [comments, setComments] = useState<commentType[]>();
  const [user, setUser] = useState<userType>();

  const commentInputRef = useRef<HTMLTextAreaElement | null>(null);
  const { contentID } = useParams();

  const fetchContentData = async () => {
    if (!contentID) {
      console.log('no content id');
      return;
    }

    const response = await fetch(`/api/contents/${contentID}`, {
      method: 'get',
    });
    if (!response.ok) return;

    const contentResult: contentType = await response.json();
    setContent(contentResult);

    console.log(contentResult);
  };

  const fetchCommentsData = async () => {
    if (!content) {
      console.log('no content');
      return;
    }

    const response = await fetch(`/api/comments?contentID=${content.id}`, {
      method: 'get',
    });
    if (!response.ok) return;

    const commentsResult: commentType[] = await response.json();
    setComments(commentsResult);
  };

  useEffect(() => {
    const userJson = sessionStorage.getItem('user');
    if (!userJson) return;
    const userData = JSON.parse(userJson);
    setUser(userData);

    fetchContentData();
  }, []);

  useEffect(() => {
    fetchCommentsData();
  }, [content]);

  const commentClickHandler = async () => {
    if (!user) return;

    const commentInput = commentInputRef.current?.value;
    console.log(commentInput);

    if (commentInput && /^\s*$/.test(commentInput)) {
      alert('comments is empty');
      return;
    }

    const response = await fetch('/api/comments', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      //userID, contentID, comment + date
      body: JSON.stringify({
        userID: user.id,
        contentID,
        comment: commentInput,
      }),
    });

    if (response.ok) {
      if (commentInputRef.current) commentInputRef.current.value = '';

      await fetchCommentsData();
    }
  };

  return (
    <>
      <div className={`content-info ${content?.framework}-shadow`}>
        <div>
          <h1>{content?.title}</h1>
          {content && (
            <img
              className='framework-icon'
              src={`/public/${content?.framework}.svg`}
            />
          )}
        </div>
        <div>
          <div className='contents-info'>
            <div>
              <img src={content?.profile} />
              <h4>{content?.username}</h4>
            </div>
          </div>
          <h3>{content && format(content?.date, 'yyyy/MM/dd')}</h3>
        </div>
      </div>
      <div className='content-main default-shadow'>
        <p>{content?.content}</p>
      </div>
      <div className='comment-input'>
        <textarea className='default-shadow' ref={commentInputRef} />
        <button onClick={commentClickHandler} className='default-shadow'>
          comment
        </button>
      </div>
      <div className='contents-container default-shadow'>
        <h2>Comment</h2>
        <ol>
          {Array.isArray(comments) && comments[0] ? (
            comments.map((comment: commentType, i: number) => (
              <Card key={i} comment={{ ...comment }} />
            ))
          ) : (
            <div>No contents</div>
          )}
        </ol>
      </div>
    </>
  );
}
