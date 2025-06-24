import { useNavigate } from 'react-router-dom';
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
  //Access two methods for later use
  const navigate = useNavigate();
  const checkAccess = useUserStore(state => state.checkAccess);

  //Checks that the user has access token once the page has rendered, and if they do not sends them to login page
  useEffect(() => {
    async function checkingTokenAccess() {
      const res = await checkAccess();
      
      if (!res.valid) {
        navigate('/')
      }
    }
    checkingTokenAccess();
  })

  return(
    <Container fluid className='m-0 p-0 profile-container'>
      <Row>
        <Col>
          <Logo />
          <Header />
        </Col>
      </Row>
      <ProfileBody />
    </Container>
  )
};

export default Profile