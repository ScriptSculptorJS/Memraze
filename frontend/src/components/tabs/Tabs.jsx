import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';import './tabs.css';
import { useInfoStore } from '../../store/info.ts';

function Tabs() {
  const tabs = useInfoStore(state => state.tabs);
  
  let newTabsArray = [];
  
  for (let i = 0; i < tabs.length; i++) {
    newTabsArray.push(
        <Nav.Item key={i + 1}>
          <Nav.Link  eventKey={i + 1} className='tab-title'>{tabs[i].title}</Nav.Link>
        </Nav.Item>
    )
  };

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