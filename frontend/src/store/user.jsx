import {create} from 'zustand'
import axios from 'axios'


export const useUserStore = create((set) => ({
  loginUser: async (newUser) => {

    console.log(newUser.email, newUser.password, 'before fetch')

    // Helps to store the access and refresh tokens in the cookies
    axios.defaults.withCredentials = true

    try {

      const res = await axios.post('http://localhost:5000/api/auth', newUser)

      const data = res.data
      
      return { success: true, message: 'User created successfully', data: data.data, login: res.data.login }

    } catch (err) {

      console.log('What is the error:', err)

      return { success: err.response.data.success, message: err.response.data.message, status: err.response.status, statusMessage: err.response.data.status }

    }
  },
  logoutUser: async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/logout');

      console.log(res)
      
      if (res.statusText === 'OK') {
        console.log('do we get ok?', res.statusText);
        return { pass: res.statusText };
        /*window.location.href = '/';*/
      } else {
        return {message: `Issue logging out user', ${res.statusText}`, status: 'Failed'}
      }
    } catch(err) {
      return{ message: err.response.data, status: err.response.status}
    }
  },
  updateUser: async (newInfo, requestType, index) => {
    try {
      console.log(newInfo, 'Is the tab info showing up here before making the axios request?');
      console.log('We are here now! Just before requesting to update data')
      console.log(requestType, 'what do we have here when we send the type?')


      const res = await axios.put('http://localhost:5000/api/users', {
        newObject: newInfo,
        requestType,
        index
      })

      console.log(res, 'This is info from the update put request');
      return res;
    } catch (err) {
      console.log('Error in updating user data');
    }
  },
  createUser: async (newUser) => {
    try {

      const res = await axios.post('http://localhost:5000/api/users', newUser)

      const data = res.data
      console.log('iS DATA HERE"', data)

      return { success: true, message: 'User created successfully', data: data.user }

    } catch (err) {

      console.log('Error in creating user: ', err)

    }
  },
  checkAccess: async () => {

    axios.defaults.withCredentials = true

    try {
      
      const res = await axios.get('http://localhost:5000/api/users')
      console.log(res, 'user res')
    
      if (res.data.valid) {

        return { valid: true, success: true, message: res.data.message }

      } else {

        return { valid: false, success: false, message: res.data.message }

      }

    } catch (err) {

      console.log('Error collecting user data')

    }
  }
}))