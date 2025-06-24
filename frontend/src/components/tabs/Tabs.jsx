import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';import './tabs.css';
import { useInfoStore } from '../../store/info.ts';
import { useUserStore } from '../../store/user.jsx';
import { shallow } from 'zustand/shallow';
import './tabs.css';

function Tabs() {
  //Accessing properties and methods from Info and User Stores and declaring type and giving it a value
  const tabs = useInfoStore(state => state.tabs, shallow);
  const updateTabs = useInfoStore(state => state.updateTabs);
  const updateUser = useUserStore(state => state.updateUser);
  const type = 'delete tab';
  
  //Declaring and giving the value of an empty array for later use
  let newTabsArray = [];
  
  //Takes the tabs that the user has and renders a new tab for each one
  for (let i = 0; i < tabs.length; i++) {
    newTabsArray.push(
        <Nav.Item key={i + 1}>
          <Nav.Link  eventKey={i + 1} className='tab-title'><span className='title'>{tabs[i].title} </span><span className='delete-tab' onClick={() => handleDeleteTab(tabs[i].title)}>x</span></Nav.Link>
        </Nav.Item>
    )
  };

  //Deletes the selected tab from the db, and updates the tabs value in the Info Store with the new tabs array. Then, reloads the page to show tab was removed
  const handleDeleteTab = async (title) => {
    const res = await updateUser(title, type);
    console.log(res, 'what are we getting within the tabs component as the response?')
    
    const updatedTabsArray = res.data.data.tabs;
    updateTabs(updatedTabsArray);

    window.location.reload();
  }

  return(
    <Col sm={3} lg={2} className='tab-container vh-100'>
      <p className='mt-3 collection'>
        Your Collection
      </p>
      <Nav variant="pills" className="flex-column">
        <Nav.Item>
          <Nav.Link eventKey="0" className='tab-title js-pill'>Start new Tab</Nav.Link>
        </Nav.Item>
        {newTabsArray}
      </Nav>
    </Col>
  )
}

export default Tabs