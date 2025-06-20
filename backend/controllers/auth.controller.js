import User from '../models/users.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';

// create token with user id
const createAccessToken = (id) => {
  return jwt.sign(
    {id}, 
    process.env.ACCESS_TOKEN_SECRET, 
    //set this to 15 minutes later
    { expiresIn: '15m' });
};

const createRefreshToken = (id) => {
  return jwt.sign(
    {id}, 
    process.env.REFRESH_TOKEN_SECRET, 
    // set this to 7 days (7d) later
    { expiresIn: '7d' });
}

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, 'what do you see for email?')
  console.log(password, 'What do you see for password?')

  try {
    let errorMessage = '';

    if (!email) {

      console.log('Field is missing.')
      errorMessage += 'email missing.'
      
    } else if (!validator.isEmail(email)) {

      console.log('Email is not valid')
      errorMessage += 'email not being valid.'

    };;

    const foundUser = await User.findOne({ email: email });

    if (!foundUser) {

      console.log('User not found');

      res.status(404).json({
        success: false,
        status: `User not found in database due to: ${errorMessage}`,
        message: 'Email or password is incorrect',
      });

      return;

    };

    const validPassword = await bcrypt.compare(
      password,
      foundUser.password
    );

    if (!password) {

      console.log('Password is missing');

      res.status(401).json({
        success: false,
        status: 'Password is missing',
        message: 'Email or password is incorrect'
      });

      return;

    } else if(!validPassword) {

      console.log('Password is missing or incorrect');

      res.status(401).json({
        success: false,
        status: 'Password is incorrect',
        message: 'Email or password is incorrect'
      });

      return;

    };

    console.log('In login', foundUser._id);

    const accessToken = createAccessToken(foundUser._id);

    const refreshToken = createRefreshToken(foundUser._id);

    res.cookie('accessToken', accessToken, {
      maxAge: 15 * 60 * 1000, // 15 minute
    })

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: 'none', //cross-site cookie availability
      //maxAge: 5* 60 * 1000, // 5 minutes
      maxAge: 7 * 24 * 60 * 1000, //cookie expiry: set to match rT(refreshToken) (ex: 7*24*60*60*1000 = 7 days)
    })

    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);

    res.status(200).json({ 
      login: true,
      success: true, 
      data: foundUser, 
    });

  } catch (err) {

    console.error('Internal Server Error:', err.message);

    res.status(500).json({ 
      login: false,
      success: false, 
      status: '500 Internal Server Error',
      message: '500 Internal Server Error: User not logged in'
    })

  }
};

export const logout = (req, res) => {

  const cookies = req.cookies;

  if (!cookies?.refreshToken) {
    return res.sendStatus(204);
  };

  console.log('we made it here without error')
  
  res.clearCookie('refreshToken', {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
  });

  res.clearCookie('accessToken', {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
  });

  res.json({ login: false, message: 'Cookie cleared' });
};