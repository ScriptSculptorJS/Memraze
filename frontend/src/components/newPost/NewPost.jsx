import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './newPost.css';
import { useUserStore } from '../../store/user.jsx';
import { useInfoStore } from '../../store/info.ts';

function NewPost(props) {
  const [ newPost, setNewPost ] = useState({
    title: '',
    content: '',
    date: ''
  });
  const [ show, setShow ] = useState(false);
  const type = 'post';
  const tabIndex = props.tabNumber;

  const updateUser = useUserStore(state => state.updateUser);
  const updateTabs = useInfoStore(state => state.updateTabs);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleNewPost = async () => {
    const todaysDate = new Date();
    const toString = todaysDate.toDateString();
    const monthDayYear = toString.replace(/^\S+\s/, '');
    
    setNewPost(newPost => ({ ...newPost, date: monthDayYear }))

    console.log(newPost, 'do we have a title and some content for the new post?')
    
    const res = await updateUser(newPost, type, tabIndex);

    console.log(res, 'what response do we get when updating user content?')

    const updatedTabsArray = res.data.data.tabs;
    updateTabs(updatedTabsArray);

    /*window.location.reload();*/
  }

  return(
    <div className='newPostContainer'>
      <Button variant="primary" className='postButton' onClick={() => handleShow()}>
        Add a new post
      </Button>

      <Modal show={show} onHide={() => handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>New post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Post title</Form.Label>
              <Form.Control
                type="title"
                autoFocus
                onChange={e => setNewPost({ ...newPost, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Post content</Form.Label>
              <Form.Control as="textarea" rows={3} onChange={e => setNewPost({ ...newPost, content: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {handleClose(); handleNewPost()}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default NewPost;