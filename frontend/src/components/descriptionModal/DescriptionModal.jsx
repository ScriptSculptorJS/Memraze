import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useInfoStore } from '../../store/info.ts';

function DescriptionModal() {
  const [ show, setShow ] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const description = useInfoStore(state => state.description);

  return (
    <>
      <Button variant="primary" className='button' onClick={handleShow}>
        Add your personal description
      </Button>

      <Modal show={show} onHide={handleClose}>
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
              <Form.Control as="textarea" rows={3} autoFocus />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DescriptionModal;