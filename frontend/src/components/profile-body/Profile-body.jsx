import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from '../tabs/Tabs.jsx';
import TabInfo from '../tab-info/Tab-info.jsx';
import './profile-body.css';

function ProfileBody() {

  return(
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row className='tab-content-row'>
        <Tabs />
        <TabInfo />
      </Row>
    </Tab.Container>
  )
}

export default ProfileBody