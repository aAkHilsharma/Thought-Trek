import React from 'react';

const Post = () => {
  return (
    <div className='post'>
      <div className='image'>
        <img src='https://techcrunch.com/wp-content/uploads/2023/02/this-week-in-apps-splash-2023.webp?w=850&h=492&crop=1' />
      </div>
      <div className='texts'>
        <h2>
          ChatGPT comes to iPhone, Bing AI efforts expand, Instagram’s Twitter
          clone
        </h2>
        <p className='info'>
          <a className='author'>Dave</a>
          <time>2023-05-22</time>
        </p>
        <p className='summary'>
          The app economy in 2023 hit a few snags, as consumer spending last
          year dropped for the first time by 2% to $167 billion, according to
          data.ai’s “State of Mobile” report.
        </p>
      </div>
    </div>
  );
};

export default Post;
