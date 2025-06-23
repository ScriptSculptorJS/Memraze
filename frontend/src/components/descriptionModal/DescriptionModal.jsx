import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useInfoStore } from '../../store/info.ts';
import { useUserStore } from '../../store/user.jsx';
import './descriptionModal.css';

function DescriptionModal() {
  const [ show, setShow ] = useState(false);
  const [ newDescription, setNewDescription ] = useState('');
  let activeCard = [];
  const type = 'description';

  const description = useInfoStore(state => state.userDescription);
  const updateUserDescription = useInfoStore(state => state.updateUserDescription);
  const updateUser = useUserStore(state => state.updateUser);


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
  

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = async () => {
    console.log(newDescription);
    updateUserDescription(newDescription);
    const res = await updateUser(newDescription, type);
    console.log(res, `what comes back when updating the user's description in the database?`)
  };

  const handleDeleteDescription = async (e) => {
    updateUserDescription('');
    const res = await updateUser('', type);
    console.log(res, 'Description was removed. Did the button show up?')
  }

  return (
    <>
      {activeCard}
    </>
  )
}

export default DescriptionModal;