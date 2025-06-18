import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';import './tabs.css';
import { useInfoStore } from '../../store/info.ts';

function Tabs() {

  const tabs = useInfoStore(state => state.tabs);
  console.log(tabs);

  let html;

  const container = document.querySelector('.js-pill');
  console.log(container);
  

  if (tabs.length === 0) {
    /*container.classList.add('active');*/

    console.log(html);
  } /*else {
    let num = 0

    container.appendChild(`
        <Nav.Item>
          <Nav.Link eventKey="0" className='tab-title'>Start new Tab</Nav.Link>
        </Nav.Item>
    `)

    for (let i = 0; i < tabs.length; i++) {
      const item = tabs[i];
      container.appendChild(`
        <Nav.Item>
          <Nav.Link eventKey=${i + 1} className='tab-title'>${item.title}</Nav.Link>
        </Nav.Item>
      `)
    }

    /*tabs.map(tab => {
      num++;

      html += `
        <Nav.Item>
          <Nav.Link eventKey=${num.toString()} className='tab-title'>${tab.title}</Nav.Link>
        </Nav.Item>
    `}) */
    
    /*console.log(html, 'after mapping');*/

  

  

  


  return(
    <Col sm={3} lg={2} className='tab-container vh-100'>
      <p className='mt-3 collection'>
        Your Collection
      </p>
      <Nav variant="pills" className="flex-column">
        <Nav.Item>
          <Nav.Link eventKey="0" className='tab-title js-pill'>Start new Tab</Nav.Link>
        </Nav.Item>
      </Nav>
    </Col>
  )
}

export default Tabs