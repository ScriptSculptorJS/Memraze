import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUserStore } from '../../store/user.jsx';
import './profile.css';
import Header from '../header/Header.jsx';
import Logo from '../logo/Logo.jsx';
import ProfileBody from '../profile-body/Profile-body.jsx';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Profile() {
  const [message, setMessage] = useState();
  const navigate = useNavigate();
  const { checkAccess } = useUserStore();

  useEffect(() => {
    async function checkingTokenAccess() {
      console.log('is this triggering upon refreshing page?');
      const res = await checkAccess();
      console.log(res);
      if (!res.valid) {
        navigate('/')
      }
    }
    checkingTokenAccess();
  })
  //const signOut = useSignOut();
  //const navigate = useNavigate();
  const location = useLocation();
  const id = location.state.id;
  const user = location.state.data;
  console.log(id)
  
  console.log(user);

  /*const logout = () => {
    navigate...
  }*/

  // When have a logout button use logout function
  return(
    <>
      <Container fluid className='m-0 p-0 profile-container vh-100'>
        <Row>
          <Col>
            <Logo />
            <Header />
          </Col>
        </Row>
        <ProfileBody />
      </Container>
    </>
  )
};

export default Profile