import './header.css';
import { useInfoStore } from '../../store/info.ts';

function Header({ firstName, image }) {

  const userFirstName = useInfoStore(state => state.firstName)
  const userProfileImage = useInfoStore(state => state.profileImage)

  return(
    <div className='header-container'>
      <div className='profile-image-container'>
        <img src={userProfileImage} className='profileImage'/>
      </div>
      <h5>
        {userFirstName}
      </h5>
      <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut. 
      </p>
    </div>
  )
}

export default Header