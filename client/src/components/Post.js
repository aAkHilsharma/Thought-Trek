import { Link } from 'react-router-dom';
import { formatISO9075 } from 'date-fns';

const Post = ({
  _id,
  title,
  summary,
  cover,
  createdAt,
  author: { username },
}) => {
  return (
    <div className='post'>
      <div className='image'>
        <Link to={`/post/${_id}`}>
          <img src={'http://localhost:5000/' + cover} />
        </Link>
      </div>
      <div className='texts'>
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className='info'>
          <a className='author'>{username}</a>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className='summary'>{summary}</p>
      </div>
    </div>
  );
};

export default Post;
