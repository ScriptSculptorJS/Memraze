import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './tab-info.css';
import { useUserStore } from '../../store/user.jsx';
import { useInfoStore } from '../../store/info.ts';
import { shallow } from 'zustand/shallow';

function TabInfo() {
  //Create state for live new tab information and declare and set value top the request type
  const [ newTab, setNewTab ] = useState({
    title: '',
    description: '',
  })
  const requestType = 'tab';

  //Accessing methods and a property from Info and User stores
  const updateUser = useUserStore(state => state.updateUser);
  const updateTabs = useInfoStore(state => state.updateTabs);
  const tabs = useInfoStore(state => state.tabs, shallow);

  //Declare and set value as an empty array
  let newDescriptionArray = [];

  //Goes through the tabs array and renders html for each tab's description pane
  for (let i = 0; i < tabs.length; i++) {
    newDescriptionArray.push(
        <Tab.Pane 
          key={i + 1}
          eventKey={i + 1} 
          className='tab-text'
        >
          {tabs[i].description}
        </Tab.Pane>
    )
  }
  
  //Updates user's new tab in the db, updates the tabs array in the Info store, and reloads the page
  const handleNewTab = async () => {
    const res = await updateUser(newTab, requestType);
    
    const newTabsArray = res.data.data.tabs;
    updateTabs(newTabsArray);

    window.location.reload();
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
              onClick={() => handleNewTab()}
            >
              Create
            </Button>
          </Form>
        </Tab.Pane>
        {newDescriptionArray}
      </Tab.Content>
    </Col>
  )
}

export default TabInfo;