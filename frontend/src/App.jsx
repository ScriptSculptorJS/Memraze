import { Routes, Route } from 'react-router-dom';
import Login from './components/login.jsx';
import Profile from './components/profile.jsx';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </>
  )
}

export default App
