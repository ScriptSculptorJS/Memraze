import './post.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useUserStore } from '../../store/user.jsx';
import { useInfoStore } from '../../store/info.ts';

function Post(props) {
  /*const [ post, setPost ] = useState({
    date: 'May 31, 2025',
    title: 'Fishing at Mineral Lake',
    content: 'Noelle and Collin did not make it, but we were able to get out on the pontoon with the two older kids and Heather. We caught about 2 fish each, and dad caught two but let them go back into the water. We still have the fish in the freezer. Next time I am going to clean them before heading home because they were really tough when I waited until I got home.'
  })*/
  const posts = props.posts;
  const index = props.index;
  
  const [ show, setShow ] = useState(false);
  const [ showPostAlert, setShowPostAlert ] = useState(false);
  const [ updatedPost, setUpdatedPost ] = useState({
    title: '',
    content: '',
    postId: null 
  })

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseAlert = () => setShowPostAlert(false);
  const handleShowPostAlert = () => setShowPostAlert(true);

  let newPostsArray = [];
  const updateUser = useUserStore(state => state.updateUser);
  const updateTabs = useInfoStore(state => state.updateTabs);
  let type;

  const handleDeletePost = async () => {
    
    type = 'delete post';
    const res = await updateUser(updatedPost.title, type, index);

    const newTabsArray = res.data.data.tabs;
    updateTabs(newTabsArray);

    console.log(res, 'after delete post request has been made');
  }

  const handleUpdatedPost = async () => {
    
    type = 'update post'
    const res = await updateUser(updatedPost.postId, type, index, updatedPost);

    const updatedTabsArray = res.data.data.tabs;
    updateTabs(updatedTabsArray);
    
  }

  for (let i = 0; i < posts.length; i++) {
    newPostsArray.push(
      <Card className="text-center" key={i + 1}>
        <Card.Header>{posts[i].date}
          <div className='delete-post' onClick={() => handleShowList(i)}>
            &#8942;
            <div className='postOptions hidden' id={i}>
              <ul>
                <li onClick={() => {handleShow(posts[i].title), setUpdatedPost({...updatedPost, title: posts[i].title, content: posts[i].content, postId: i});
                }}>
                  Edit
                </li>
                <li className='delete' onClick={() => {handleShowPostAlert(); setUpdatedPost({...updatedPost, title: posts[i].title, content: posts[i].content})}}>
                  Delete
                </li>
              </ul>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <Card.Title>"{posts[i].title}"</Card.Title>
          <Card.Text>
            {posts[i].content}
          </Card.Text>
        </Card.Body>
        <Modal show={show} className={posts[i].title} onHide={() => handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>Update post information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Post title</Form.Label>
                <Form.Control
                  type="title"
                  value={updatedPost.title}
                  onChange={e => setUpdatedPost({ ...updatedPost, title: e.target.value })}
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Post content</Form.Label>
                <Form.Control as="textarea" rows={3} value={updatedPost.content}
                onChange={e => setUpdatedPost({ ...updatedPost, content: e.target.value})} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleClose()}>
              Close
            </Button>
            <Button variant="primary" onClick={() => {handleClose(); handleUpdatedPost()}}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showPostAlert} className={posts[i].title} onHide={() => handleCloseAlert()}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure you want to delete this post?</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleCloseAlert()}>
              No
            </Button>
            <Button variant="primary" onClick={() => {handleCloseAlert(); handleDeletePost()}}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </Card>
    )
  }

  const handleShowList = (i) => {
    const listContainerElement = document.getElementsByClassName('postOptions')[i];
    const optionsButtonElement = document.getElementsByClassName('delete-post')[i];

    if (listContainerElement.classList.contains('hidden')) {

      listContainerElement.classList.remove('hidden');

      document.addEventListener('click', e => {
        if (e.target !== listContainerElement && e.target !== optionsButtonElement) {
          listContainerElement.classList.add('hidden');
        }
      })
      
    } else {
      listContainerElement.classList.add('hidden');
    }
  }

  return(
    <>
      {newPostsArray}
    </>
  )
}

export default Post