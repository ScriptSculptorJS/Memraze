import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './tabs.css';
import { useInfoStore } from '../../store/info.ts';
import { useUserStore } from '../../store/user.jsx';
import { shallow } from 'zustand/shallow';
import './tabs.css';

function Tabs() {
  const [ updatedTab, setUpdatedTab ] = useState({
    title: '',
    description: '',
  })

  const [ show, setShow ] = useState(false);
  const [ showAlert, setShowAlert ] = useState(false);
  //Accessing properties and methods from Info and User Stores and declaring type and giving it a value
  const tabs = useInfoStore(state => state.tabs, shallow);
  const updateTabs = useInfoStore(state => state.updateTabs);
  const updateUser = useUserStore(state => state.updateUser);
  let type;
  
  //Declaring and giving the value of an empty array for later use
  let newTabsArray = [];

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseAlert = () => setShowAlert(false);
  const handleShowAlert = () => setShowAlert(true);

  //For testing purposes only
  /*const testTabsArray = [{
    title: 'Fishing trips I have gone on',
    description: 'Record of all my fishing adventures',
    posts: [
      {
        date: 'May 31, 2025',
        title: 'Fishing at Mineral Lake',
        content: 'Unfortunately, Noelle and Collin did not make it, but we were able to get out on the pontoon with the two older kids and Heather. We caught about 2 fish each, and dad caught two but let them go back into the water. We still have the fish in the freezer. Next time I am going to clean them before heading home because they were really tough when I waited until I got home.'
      }
    ]
  },
  {
    title: 'Crabbing',
    description: 'Record of all my crabbing adventures in 2025',
    posts: [
      {
        date: 'June 22, 2025',
        title: 'Third adventure to Westport for the day to do some crabbing',
        content: `Mom joined dad and I this time. We dropped two cages this time. One was put on the 5th branch and the other was placed on the 3rd branch. We did much better this time because we had 4 keepers. There was a fifth one that could have been a keeper based off of being a male and big enough. however, it was a soft shell crab. One of the 4 keepers was actually larger than the measurer. We took mom out to the long dock for her first time. We ventured around the shops and stopped at Granny's where dad and I bought some candy. We then grabbed a bite to eat at the Blackbeard's Brewery.`
      },
      {
        date: 'May 24, 2025',
        title: 'Second weekend day going crabbing in Westport',
        content: `This time dad joined me on the adventure. We dropped the cage on the 7th branch to see if it would be better further out. Came to find that it was not as great as the 5th branch was. We did catch one keeper though. While the cage was in the water I took him out to the large deck that many people use for fishing and crabbing. While we were on our way back to the car we saw a baby seal near the dock and crying for its momma. It was his first time out there. Then, we ate at Burnett's. Lastly, we took a drive over to check out the crandberry fields.`
      },
      {
        date: 'May 3, 2025',
        title: 'First time crabbing in Westport this year',
        content: `I dropped the cage on the 5th branch and went straight over to the bathrooms on foot. When I came out I saw the lookout tower, and ventured up the stairs to take a look around. That is when I noticed a long deck I have never been to before. I decided to walk over to it. When I got out further I noticed that one of the branches of the docks in Westport had many large seals or sea lions chilling and making lots of noise on it. I made it all the way to the end of the long deck and saw seals following a boat that was throwing out left over pieces of their catches from the day. I walked back into town and stopped at Blackbeard's Brewery to get their handcrafted rootbeer and some garlic fries. It was delicios. When I pulled the cage up I was able to take home 2 crab that was shared amongst dad, mom and I.`      
      }
    ]
  }]
  for (let i = 0; i < testTabsArray.length; i++) {
    newTabsArray.push(
        <Nav.Item key={i + 1}>
          <Nav.Link  eventKey={i + 1} className='tab-title'><span className='title'>{testTabsArray[i].title} </span><span className='delete-tab' onClick={() => handleDeleteTab(testTabsArray[i].title)}>x</span></Nav.Link>
        </Nav.Item>
    )
  };*/
  
  //Takes the tabs that the user has and renders a new tab for each one

  

  for (let i = 0; i < tabs.length; i++) {
    newTabsArray.push(
        <Nav.Item key={i + 1}>
          <Nav.Link  eventKey={i + 1} className='tab-title'><span className='title'>{tabs[i].title} </span><span className='delete-tab' onClick={() => handleShowTabOptions(i)}>
          &#8942;
            <div className='tabOptions hidden' id={i}>
              <ul>
                <li onClick={() => {handleShow(tabs[i].title), setUpdatedTab({...updatedTab, title: tabs[i].title, description: tabs[i].description});
                }}>
                  Edit
                </li>
                <li className='delete' onClick={() => {handleShowAlert(); setUpdatedTab({...updatedTab, title: tabs[i].title, description: tabs[i].description})}}>
                  Delete
                </li>
              </ul>
            </div>
          </span></Nav.Link>
          <Modal show={show} className={tabs[i].title} onHide={() => handleClose()}>
            <Modal.Header closeButton>
              <Modal.Title>Update tab information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Tab title</Form.Label>
                  <Form.Control
                    type="title"
                    value={updatedTab.title}
                    onChange={e => setUpdatedTab({ ...updatedTab, title: e.target.value })}
                    autoFocus
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Tab description</Form.Label>
                  <Form.Control as="textarea" rows={3} value={updatedTab.description}
                  onChange={e => setUpdatedTab({ ...updatedTab, description: e.target.value})} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => handleClose()}>
                Close
              </Button>
              <Button variant="primary" onClick={() => {handleClose(); handleUpdatedTab(i)}}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={showAlert} className={tabs[i].title} onHide={() => handleCloseAlert()}>
            <Modal.Header closeButton>
              <Modal.Title>Are you sure you want to delete this tab?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => handleCloseAlert()}>
                No
              </Button>
              <Button variant="primary" onClick={() => {handleCloseAlert(); handleDeleteTab()}}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
        </Nav.Item>
    )
  };

  const handleShowTabOptions = (i) => {

    const optionListContainerElement = document.getElementsByClassName('tabOptions')[i];
    
    const tabOptionsButtonElement = document.getElementsByClassName('delete-tab')[i];
    
    if (optionListContainerElement.classList.contains('hidden')) {

      optionListContainerElement.classList.remove('hidden');

      document.addEventListener('click', e => {

        if (e.target !== optionListContainerElement && e.target !== tabOptionsButtonElement) {

          optionListContainerElement.classList.add('hidden');

        }
      })
    } else {

      optionListContainerElement.classList.add('hidden');

    }
  }

  //Deletes the selected tab from the db, and updates the tabs value in the Info Store with the new tabs array. Then, reloads the page to show tab was removed
  const handleDeleteTab = async () => {
    type = 'delete tab';
    const res = await updateUser(updatedTab.title, type);
    console.log(res, 'what are we getting within the tabs component as the response?')
    
    const updatedTabsArray = res.data.data.tabs;
    updateTabs(updatedTabsArray);

    window.location.reload();
  }

  const handleUpdatedTab = async (i) => {
    type = 'update tab';

    const res = await updateUser(updatedTab, type, i);

    const updatedTabsArray = res.data.data.tabs;

    updateTabs(updatedTabsArray);

  }

  return(
    <Col sm={3} lg={2} className='tab-container min-vh-100'>
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