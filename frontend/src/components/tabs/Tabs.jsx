import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';import './tabs.css';

function Tabs() {

  return(
    <Col sm={3} lg={2} className='tab-container vh-100'>
      <p className='mt-3 collection'>
        Your Collection
      </p>
      <Nav variant="pills" className="flex-column">
        <Nav.Item>
          <Nav.Link eventKey="first" className='tab-title'>Start new Tab</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="second" className='tab-title'>Tab 1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="third" className='tab-title'>Tab 2</Nav.Link>
        </Nav.Item>
      </Nav>
    </Col>
  )
}

export default Tabs