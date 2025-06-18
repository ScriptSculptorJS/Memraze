import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './tab-info.css';
import { useUserStore } from '../../store/user.jsx';
import { useInfoStore } from '../../store/info.ts';

function TabInfo() {
  const [ newTab, setNewTab ] = useState({
    title: '',
    description: '',
  })

  const updateUser = useUserStore(state => state.updateUser);
  const updateTabs = useInfoStore(state => state.updateTabs);
  let tabs;
  
  const handleNewTab = async (e) => {
    e.preventDefault();
    console.log(newTab)
    const res = await updateUser(newTab);
    console.log(res.data.data.tabs, 'do we see that tabs array with the updated info here?');
    const newTabsArray = res.data.data.tabs;
    updateTabs(newTabsArray);
  }

  return(
    <Col sm={9} lg={10} className='tab-info-container'>
      <Tab.Content>
        <Tab.Pane eventKey="0" className='tab-text'>
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
          eventKey="1" 
          className='tab-text'
        >
          First tab content
        </Tab.Pane>
        <Tab.Pane 
          eventKey="2" 
          className='tab-text'
        >
          Second tab content
        </Tab.Pane>
      </Tab.Content>
    </Col>
  )
}

export default TabInfo;