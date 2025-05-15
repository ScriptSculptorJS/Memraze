import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUserStore } from '../store/user.js';
import Header from './header.jsx';
import defaultImage from '../assets/default-profile-image.jpg';

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
  if (!user.image) {
    user.image = defaultImage;
  };

  //console.log(JSON.parse(localStorage.getItem('user')));

  /*const logout = () => {
    navigate...
  }*/

  // When have a logout button use logout function
  return(
    <>
      <Header firstName={user.firstName} image={user.image}/>
      <p>{user.firstName}</p>
      <p>{id}</p>
      <p>{message}</p>
    </>
  )
};

export default Profile