import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from '../tabs/Tabs.jsx';
import TabInfo from '../tab-info/Tab-info.jsx';
import './profile-body.css';
import { useInfoStore } from '../../store/info.ts';

function ProfileBody() {
  //Access property from Info Store and declares num variable
  const tabs = useInfoStore(state => state.tabs);
  let num;
  
  //Checks if the user has tabs or not and gives num a value depending on the result. This makes either the tab to create a new tab active or the latest user's tab active
  if (tabs.length === 0) {
    num = 0;
  } else {
    num = 1;
  }
  
  return(
    <Tab.Container id="left-tabs-example" className='tabs-container' defaultActiveKey={num}>
      <Row className='tab-content-row'>
        <Tabs />
        <TabInfo />
      </Row>
    </Tab.Container>
  )
}

export default ProfileBody