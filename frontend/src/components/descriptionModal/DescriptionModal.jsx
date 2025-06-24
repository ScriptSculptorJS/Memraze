import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useInfoStore } from '../../store/info.ts';
import { useUserStore } from '../../store/user.jsx';
import './descriptionModal.css';

function DescriptionModal() {
  //Create states for whether to show modal or not and keep description live
  const [ show, setShow ] = useState(false);
  const [ newDescription, setNewDescription ] = useState('');

  //Create empty array to start off the activeCard that will later be updated based on user interaction and what the user currently has as their description
  let activeCard = [];
  const type = 'description';

  //Access properties and methods from Info and User Stores
  const description = useInfoStore(state => state.userDescription);
  const updateUserDescription = useInfoStore(state => state.updateUserDescription);
  const updateUser = useUserStore(state => state.updateUser);

  //Checks if user has an empty string or not for their description. If empty, button to create a description becomes visible. If they have a description, their description is shown with an x after it
  if (description === '') {
    activeCard = [].concat(
      <div key='1'  className='js-description-modal-card'>
        <Button variant="primary" className='button' onClick={() => handleShow()}>
          Add your personal description
        </Button>

        <Modal show={show} onHide={() => handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>Your profile description</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Tell us a little bit about you and your page</Form.Label>
                <Form.Control as="textarea" rows={3} autoFocus 
                onChange={e => setNewDescription(e.target.value)} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleClose()}>
              Close
            </Button>
            <Button variant="primary" onClick={() => handleSave()}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  } else if (description !== '') {
    activeCard = [].concat(
      <div key='2' className='js-user-description-card' 
      style={{color: '#444444'}}>
        {description}&nbsp; <span id='delete-description' 
        onClick={() => handleDeleteDescription()}>x</span>
      </div>
    )
  }
  
  //Functions to close or show the description modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Updates description in Info Store and updates the user's description in the db
  const handleSave = async () => {
    console.log(newDescription);
    updateUserDescription(newDescription);
    updateUser(newDescription, type);
  };

  //Updates description in Info Store and updates the user's description in the db. Then, shows the modal to enter a new one
  const handleDeleteDescription = async () => {
    updateUserDescription('');
    updateUser('', type);
    handleShow();
  }

  return (
    <>
      {activeCard}
    </>
  )
}

export default DescriptionModal;