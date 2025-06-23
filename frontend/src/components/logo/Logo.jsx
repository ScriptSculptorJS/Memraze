import { useNavigate } from 'react-router-dom';
import './logo.css'
import { useUserStore } from '../../store/user.jsx'

function Logo() {
  const navigate = useNavigate();

  const logoutUser = useUserStore(state => state.logoutUser);

  const handleUserLogout = async () => {
    console.log('I was clicked')
    const pass = await logoutUser();
    console.log(pass, 'pass');
    if (pass.pass === 'OK') {

      localStorage.clear();
      window.location.reload();
    }
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