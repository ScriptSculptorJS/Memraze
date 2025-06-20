import './header.css';
import { useInfoStore } from '../../store/info.ts';
import DescriptionModal from '../descriptionModal/DescriptionModal.jsx';

function Header() {

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
      <DescriptionModal />
    </div>
  )
}

export default Header