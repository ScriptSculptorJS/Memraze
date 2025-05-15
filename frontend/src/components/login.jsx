import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/user.js';
import { useAuthContext } from '../hook/useAuthContext.jsx';
 
function Login() {
  const [newUser, setNewUser] = useState({
    firstName: '',
    email: '',
    password: '',
    cityState: '',
    age: '',
    pronouns: '',
    gender: '',
    orientation: '',
    lookingFor: '',
  });
  const { user, dispatch } = useAuthContext();

  const navigate = useNavigate();
  const { loginUser, createUser } = useUserStore();

  const handleUserLogin = async (e) => {
    e.preventDefault();

    const { success, message, data, login } = await loginUser(newUser, dispatch);
    console.log('login:', login);

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
        cityState: '',
        age: '',
        pronouns: '',
        gender: '',
        orientation: '',
        lookingFor: '',
      });

      navigate('/profile/', { state: {data: data, id: data._id } });
    }
  };


  const handleUserSignup = async (e) => {
    e.preventDefault();
    
    const { success, message, data } = await createUser(newUser);

    setNewUser({
      firstName: '',
      email: '',
      password: '',
      cityState: '',
      age: '',
      pronouns: '',
      gender: '',
      orientation: '',
      lookingFor: '',
    });

    Switch();

    console.log('Success:', success);
    console.log('Message:', message);
    console.log('User:', data)
  }

  function Switch() {

    const loginCardElement = document.querySelector('.js-login-card');

    const signupCardElement = document.querySelector('.js-signup-card');

    if (signupCardElement.classList.contains('hidden')) {

      loginCardElement.classList.add('hidden');

      signupCardElement.classList.remove('hidden');

    } else if (loginCardElement.classList.contains('hidden')) {

      signupCardElement.classList.add('hidden');

      loginCardElement.classList.remove('hidden');

    }
  }

  return(
    <div className='login-signup-container'>
      <h1 className='app-name'>
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
          />

          <input
            type='password'
            placeholder='Enter password'
            name='password'
            className='password-input'
            value={newUser.password}
            onChange={e => setNewUser({ ...newUser, password: e.target.value})} 
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
          />

          <input
            type='email'
            placeholder='Enter your email'
            name='email'
            className='email-input'
            value={newUser.email}
            onChange={e => setNewUser({ ...newUser, email: e.target.value })} 
          />

          <input
            type='password'
            placeholder='Enter a password'
            name='password'
            className='password-input'
            value={newUser.password}
            onChange={e => setNewUser({ ...newUser, password: e.target.value})} 
          />

          <input
            type='text'
            placeholder='Enter your city, state'
            name='cityState'
            className='cityState-input'
            value={newUser.cityState}
            onChange={e => setNewUser({ ...newUser, cityState: e.target.value})}
          />

          <input
            type='text'
            placeholder='Enter your age'
            name='age'
            className='age-input'
            value={newUser.age}
            onChange={e => setNewUser({ ...newUser, age: e.target.value})}
          />

          <input
            type='text'
            placeholder='Enter your pronouns'
            name='pronouns'
            className='pronouns-input'
            value={newUser.pronouns}
            onChange={e => setNewUser({ ...newUser, pronouns: e.target.value})}
          />

          <select 
            className='gender-input js-gender-input' 
            value={newUser.gender}
            onChange={e => setNewUser({ ...newUser, gender: e.target.value})}
          >
            <option>Select your gender</option>
            <option>Agender</option>
            <option>Bigender</option>
            <option>Cisgender</option>
            <option>Genderfluid</option>
            <option>Genderqueer</option>
            <option>Intersex</option>
            <option>Man</option>
            <option>No-binary</option>
            <option>Transgender</option>
            <option>Woman</option>
            <option>Not listed</option>
          </select>

          <select   
            className='orientation-input js-orientation-input'
            value={newUser.orientation}
            onChange={e => setNewUser({ ...newUser, orientation: e.target.value})}
          >
            <option>Select your sexual orientation</option>
            <option>Agender</option>
            <option>Aromatic</option>
            <option>Asexual</option>
            <option>Bisexual</option>
            <option>Cisgender</option>
            <option>Gay</option>
            <option>Heterosexual</option>
            <option>Homosexual</option>
            <option>Intersex</option>
            <option>Lesbian</option>
            <option>Pansexual</option>
            <option>Queer</option>
            <option>Questioning/unsure</option>
            <option>Same gender loving</option>
            <option>Transgender</option>
            <option>Not listed</option>
          </select>

          <select 
            className='lookingFor-input js-lookingFor-input'
            value={newUser.lookingFor}
            onChange={e => setNewUser({ ...newUser, lookingFor: e.target.value})}
          >
            <option>What are you looking for</option>
            <option>Casual dating</option>
            <option>Committed partnership</option>
            <option>Ethical non-monogamy</option>
            <option>Friends w/ benefits</option>
            <option>Friendship</option>
            <option>Long-term dating</option>
            <option>Married couple friendship</option>
            <option>Monogamous relationship</option>
            <option>Open relationship</option>
            <option>Open to exploring</option>
            <option>Polyamorous relationship</option>
            <option>Not listed</option>
          </select>

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