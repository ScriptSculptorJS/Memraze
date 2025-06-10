import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import './tab-info.css';

function TabInfo() {

  return(
    <Col sm={9} lg={10} className='tab-info-container'>
      <Tab.Content>
        <Tab.Pane eventKey="first" className='tab-text'>
          First tab content
        </Tab.Pane>
        <Tab.Pane eventKey="second" className='tab-text'>
          Second tab content
        </Tab.Pane>
      </Tab.Content>
    </Col>
  )
}

export default TabInfo;