import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './tab-info.css';
import NewPost from '../newPost/NewPost.jsx';
import Post from '../post/Post.jsx';
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

  //For testing purposes only
  /*const testTabsArray = [{
    title: 'Fishing',
    description: 'Record of all my fishing adventures!',
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
    newDescriptionArray.push(
        <Tab.Pane 
          key={i + 1}
          eventKey={i + 1} 
          className='tab-text'
        >
          <h6>{testTabsArray[i].description}</h6>
          <NewPost tabNumber={i}/>
          <Post posts={testTabsArray[i].posts}/>
        </Tab.Pane>
    )
  }*/

  //Goes through the tabs array and renders html for each tab's description pane
  for (let i = 0; i < tabs.length; i++) {
    newDescriptionArray.push(
        <Tab.Pane 
          key={i + 1}
          eventKey={i + 1} 
          className='tab-text'
        >
          <h6>{tabs[i].description}</h6>
          <NewPost tabNumber={i} />
          <Post posts={tabs[i].posts} />
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