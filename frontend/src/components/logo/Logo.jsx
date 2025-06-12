import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './logo.css'
import { useInfoStore } from '../../store/info.ts'

function Logo() {
  const updateFirstName = useInfoStore(state => state.updateFirstName)

  const updateProfileImage = useInfoStore(state => state.updateProfileImage)

  function handleUserLogout() {
    console.log('I was clicked')

    updateFirstName('');
    updateProfileImage('');

    localStorage.clear();
  }


  return(
    <div className='profile-app-name-container'>
      <h6 className='profile-app-name font-weight-bold'>
        Memraze
      </h6>
      <p className='logout' 
      onClick={handleUserLogout}>
        Logout
      </p>
    </div>
  )
}

export default Logo