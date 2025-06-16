import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/user.jsx';
import { useInfoStore } from '../../store/info.ts';
import defaultImage from '../../assets/default-profile-image.jpg';

function Login() {
  const [newUser, setNewUser] = useState({
    firstName: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const { loginUser, createUser } = useUserStore();

  let loginCardElement = document.querySelector('.js-login-card');

  let signupCardElement = document.querySelector('.js-signup-card');
  /*This is to login user and store user data in store for global use const { user, loginStoreInfo } = useUser();*/ 
  const updateFirstName = useInfoStore(state => state.updateFirstName)
  const updateProfileImage = useInfoStore(state => state.updateProfileImage)

  const handleUserLogin = async (e) => {
    if(e) {
      e.preventDefault();
    }

    const { success, message, data, login } = await loginUser(newUser);
    console.log('login:', login);
    localStorage.clear();
    updateFirstName(data.firstName);
    updateProfileImage(defaultImage);

    if (!login || (!success && !data)) {
      console.log('Message:', message);
    } else {
      console.log('Success:', success);
      console.log('Message:', message);
      console.log('User:', data);


      setNewUser({
        firstName: '',
        email: '',
        password: '',
      });

      navigate('/profile/', { state: {data: data, id: data._id } });
    }
  };


  const handleUserSignup = async (e) => {
    if(e) {
      e.preventDefault();
    }
    
    const { success, message, data } = await createUser(newUser);

    setNewUser({
      firstName: '',
      email: '',
      password: '',
    });

    Switch();

    console.log('Success:', success);
    console.log('Message:', message);
    console.log('User:', data)
  }

  function handleKeyDown(e) {
    console.log(e.key, 'What is here?')
    if (e.key === 'Enter' && loginCardElement.classList.contains('hidden')) {
      handleUserSignup();
    } else if (e.key === 'Enter' && signupCardElement.classList.contains('hidden')) {
      handleUserLogin();
    }
  }

  function Switch() {
    loginCardElement = document.querySelector('.js-login-card');

    signupCardElement = document.querySelector('.js-signup-card');

    if (signupCardElement.classList.contains('hidden')) {

      loginCardElement.classList.add('hidden');

      signupCardElement.classList.remove('hidden');

    } else if (loginCardElement.classList.contains('hidden')) {

      signupCardElement.classList.add('hidden');

      loginCardElement.classList.remove('hidden');

    }
  }

  return(
    <div className='login-signup-container vh-100'>
      <h1 className='app-name font-weight-bold'>
        Memraze
      </h1>
      <p className='app-description'>
        Share your passions and experiences with the world.
      </p>

      <div className='login-card js-login-card'>
          <input
            type='email'
            placeholder='Enter email'
            name='email'
            className='email-input'
            value={newUser.email}
            onChange={e => setNewUser({ ...newUser, email: e.target.value })}
            onKeyDown={handleKeyDown} 
          />

          <input
            type='password'
            placeholder='Enter password'
            name='password'
            className='password-input'
            value={newUser.password}
            onChange={e => setNewUser({ ...newUser, password: e.target.value})}
            onKeyDown={handleKeyDown} 
          />

          <button 
            className='login-button js-login-button'
            onClick={handleUserLogin}>
              Login
          </button>

          <p className='login-link js-login-link' onClick={Switch}>Create account</p>
      </div>
      <div 
        className='signup-card js-signup-card hidden'
      >
          <input  
            type='text'
            placeholder='Enter your first name'
            name='fname'
            className='fname-input'
            value={newUser.firstName}
            onChange={e => setNewUser({ ...newUser, firstName: e.target.value})}
            onKeyDown={handleKeyDown}
          />

          <input
            type='email'
            placeholder='Enter your email'
            name='email'
            className='email-input'
            value={newUser.email}
            onChange={e => setNewUser({ ...newUser, email: e.target.value })}
            onKeyDown={handleKeyDown} 
          />

          <input
            type='password'
            placeholder='Enter a password'
            name='password'
            className='password-input'
            value={newUser.password}
            onChange={e => setNewUser({ ...newUser, password: e.target.value})}
            onKeyDown={handleKeyDown} 
          />

          <button 
            type='submit'
            className='sign-up-button js-sign-up-button'
            onClick={handleUserSignup}>
              Sign Up
          </button>

          <p className='sign-up-link js-sign-up-link' onClick={Switch}>Already have an account?</p>
      </div>
    </div>
  )
}

export default Login