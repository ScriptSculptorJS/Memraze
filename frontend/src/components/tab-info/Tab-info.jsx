import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './tab-info.css';

function TabInfo() {
  const [ newTab, setNewTab ] = useState({
    title: '',
    description: '',
  })
  
  function handleNewTab(e) {
    e.preventDefault();
    console.log(newTab)
  }

  return(
    <Col sm={9} lg={10} className='tab-info-container'>
      <Tab.Content>
        <Tab.Pane eventKey="first" className='tab-text'>
          <h6>
            Let's get you started with your new Tab!
          </h6>
          <Form className='newTabForm'>
            <Form.Group 
              className="mb-3" controlId="exampleForm.ControlInput1"
            >
              <Form.Label>
                Enter your Tab title
              </Form.Label>
              <Form.Control 
                className='tab-text'  as='textarea' 
                rows={1} 
                onChange={e => setNewTab({ ...newTab, title: e.target.value })} />
            </Form.Group>
            <Form.Group 
              className="mb-3" controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Enter a brief description to highlight why you are creating this Tab</Form.Label>
              <Form.Control 
                className='tab-text' as="textarea" 
                rows={3} 
                onChange={e => setNewTab({ ...newTab, description: e.target.value })} />
            </Form.Group>
            <Button 
              size='sm' 
              className='button' 
              onClick={handleNewTab}
            >
              Create
            </Button>
          </Form>
        </Tab.Pane>
        <Tab.Pane 
          eventKey="second" 
          className='tab-text'
        >
          First tab content
        </Tab.Pane>
        <Tab.Pane 
          eventKey="third" 
          className='tab-text'
        >
          Second tab content
        </Tab.Pane>
      </Tab.Content>
    </Col>
  )
}

export default TabInfo;