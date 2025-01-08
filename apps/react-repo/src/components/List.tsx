import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { contentType, userType } from 'types';
import { format } from 'date-fns';
import '@styles/list.css';

export default function List() {
  const [userData, setUserData] = useState<userType>();
  const [contents, setContents] = useState<contentType[]>();

  const navigate = useNavigate();

  const fetchData = async () => {
    let response = await fetch('/api/contents', { method: 'get' });
    if (response.ok) {
      const result = await response.json();
      setContents(result);
    }
  };

  useEffect(() => {
    const userJson = sessionStorage.getItem('user');
    if (!userJson) {
      return;
    }
    const result = JSON.parse(userJson);
    setUserData(result);

    fetchData();
  }, []);

  const listClickHandler = (id: string) => {
    navigate(`/react/content/${id}`);
  };

  return (
    <>
      <div className={`user-container ${userData?.framework}-shadow`}>
        <div>
          <img src={userData?.profile} />
          <h1>{userData?.username}</h1>
        </div>
      </div>
      <div className='contents-container  default-shadow'>
        <div className='contents-header'>
          <h2>Contents</h2>
          <Link to={`/react/write`}>
            <img src='/public/pen.svg' alt='pen|' />
            write
          </Link>
        </div>
        <ol>
          {contents ? (
            contents.map((content: contentType, i: number) => (
              <li
                onClick={() => {
                  listClickHandler(content.id);
                }}
                key={i}
                className={`${content.framework}-shadow ${content.framework}-hover`}
              >
                <div className='contents-info'>
                  <div>
                    <img src={content.profile} />
                    <h4>{content.username}</h4>
                  </div>
                  <img src={`/public/${content.framework}.svg`} />
                </div>
                <div className='contents-date'>
                  <h3>{content.title}</h3>
                  <h3 className='date'>
                    {format(content?.date, 'yyyy/MM/dd')}
                  </h3>
                </div>
              </li>
            ))
          ) : (
            <div>No contents</div>
          )}
        </ol>
      </div>
    </>
  );
}
