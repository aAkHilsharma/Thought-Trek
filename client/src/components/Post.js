import ReactTimeAgo from 'react-time-ago';

const Post = ({
  title,
  summary,
  cover,
  content,
  createdAt,
  author: { username },
}) => {
  return (
    <div className='post'>
      <div className='image'>
        <img src={'http://localhost:5000/' + cover} />
      </div>
      <div className='texts'>
        <h2>{title}</h2>
        <p className='info'>
          <a className='author'>{username}</a>
          <time>
            <ReactTimeAgo date={new Date(createdAt)} locale='en-US' />
          </time>
        </p>
        <p className='summary'>{summary}</p>
      </div>
    </div>
  );
};

export default Post;
