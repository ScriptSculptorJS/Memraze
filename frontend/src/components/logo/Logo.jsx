import { useNavigate } from 'react-router-dom';
import './logo.css'
import { useInfoStore } from '../../store/info.ts'
import { useUserStore } from '../../store/user.jsx'

function Logo() {
  const navigate = useNavigate();

  const updateFirstName = useInfoStore(state => state.updateFirstName)

  const updateProfileImage = useInfoStore(state => state.updateProfileImage)

  const firstName = useInfoStore(state => state.firstName);

  const { logoutUser } = useUserStore();
  const { storage } = useInfoStore();

  const handleUserLogout = async () => {
    console.log('I was clicked')
    const pass = await logoutUser();
    console.log(pass, 'pass');
    if (pass.pass === 'OK') {
      updateFirstName('');
      updateProfileImage('');

      console.log(firstName);

      localStorage.clear();
      window.location.reload();
    }
    
    
    /*navigate('/');*/
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