function Header({ firstName, image }) {

  return(
    <div className='header-container'>
      <div className='profile-image-container'>
        <img src={image} className='profileImage'/>
      </div>
      <div className='profile-header-text-container'>
        <h2>
          {firstName}
        </h2>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut. 
        </p>
      </div>
    </div>
  )
}

export default Header