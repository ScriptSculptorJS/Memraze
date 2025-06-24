import './logo.css'
import { useUserStore } from '../../store/user.jsx'

function Logo() {
  //Accessing method from User Store
  const logoutUser = useUserStore(state => state.logoutUser);

  //Runs the logoutUser method, and if it was successful we clear local storage and reload page
  const handleUserLogout = async () => {
    const pass = await logoutUser();
    
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