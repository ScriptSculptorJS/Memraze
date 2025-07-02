import './post.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Post(props) {
  /*const [ post, setPost ] = useState({
    date: 'May 31, 2025',
    title: 'Fishing at Mineral Lake',
    content: 'Noelle and Collin did not make it, but we were able to get out on the pontoon with the two older kids and Heather. We caught about 2 fish each, and dad caught two but let them go back into the water. We still have the fish in the freezer. Next time I am going to clean them before heading home because they were really tough when I waited until I got home.'
  })*/
  let newPostsArray = [];

  console.log(props);
  const posts = props.posts;

  for (let i = 0; i < posts.length; i++) {
    newPostsArray.push(
      <Card className="text-center" key={i + 1}>
        <Card.Header>{posts[i].date}
          <div className='delete-post'>X</div>
        </Card.Header>
        <Card.Body>
          <Card.Title>"{posts[i].title}"</Card.Title>
          <Card.Text>
            {posts[i].content}
          </Card.Text>
        </Card.Body>
        
      </Card>
    )
  }

  return(
    <>
      {newPostsArray}
    </>
  )
}

export default Post