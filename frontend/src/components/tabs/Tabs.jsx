import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';import './tabs.css';
import { useInfoStore } from '../../store/info.ts';
import { useUserStore } from '../../store/user.jsx';
import { shallow } from 'zustand/shallow';
import './tabs.css';

function Tabs() {
  const tabs = useInfoStore(state => state.tabs, shallow);
  const updateTabs = useInfoStore(state => state.updateTabs);
  const updateUser = useUserStore(state => state.updateUser);
  const type = 'delete tab';
  
  let newTabsArray = [];
  
  //Why are the long titles not getting ellipsis based on the css I provided in css file?
  for (let i = 0; i < tabs.length; i++) {
    newTabsArray.push(
        <Nav.Item key={i + 1}>
          <Nav.Link  eventKey={i + 1} className='tab-title'><span className='title'>{tabs[i].title} </span><span className='delete-tab' onClick={() => handleDeleteTab(tabs[i].title)}>x</span></Nav.Link>
        </Nav.Item>
    )
  };

  const handleDeleteTab = async (title) => {

    console.log(title, 'Just before making the axios request within the tabs component');

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