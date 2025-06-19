import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from '../tabs/Tabs.jsx';
import TabInfo from '../tab-info/Tab-info.jsx';
import './profile-body.css';
import { useInfoStore } from '../../store/info.ts';

function ProfileBody() {
  const tabs = useInfoStore(state => state.tabs);
  let num;
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