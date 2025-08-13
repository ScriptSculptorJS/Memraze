import User from '../models/users.model.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
import jwt from 'jsonwebtoken';

export const getAccess = async (req, res) => {
  return res.json({ valid: true, message: 'Authorized'});
};

export const createUser = async (req, res) => {
  const user = req.body; // user will send this data

  try {

    if (user.email === '' || user.password === '') {
      console.log('Please provide all fields')
    };

    if (!validator.isEmail(user.email)) {
      console.log('Email is not valid')
    }
    const exists = await User.findOne({ email: user.email });

    if (exists) {
      console.log('Email already exists');
    } else {
      // Generate salt and hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);

      const newUser = new User({
        ...user,
        password: hashedPassword,
      });

      const newentry = await newUser.save();

      res.status(201).json({
        user: newentry
      })
    };

  } catch (err) {

    if (err instanceof Error) {
      res.status(400).json({
        status: '400 Bad Request',
        message: err.message,
        success: 'Failed'
      })

    } else {

      console.error('Internal Server Error:', err);
      res.status(500).json({ 
        success: false, 
        status: '500 Internal Server Error',
        message: '500 Internal Server Error, User not created'
      });
    }
  }
};

export const updateUser = async (req, res) => {
  
  const newInfo = req.body;
  const access = req.cookies.accessToken;
  let updatedInfo;

  const decoded = jwt.decode(access);
  
  const id = decoded.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: 'User not found'});
  }

  try {
    if (newInfo.requestType === 'description') {
      updatedInfo = await User.findByIdAndUpdate(id, {
        description: newInfo.newObject
      })
    } else if (newInfo.requestType === 'tab') {
      updatedInfo = await User.findByIdAndUpdate(id, {
        $push: {
          tabs: {
            $each: [newInfo.newObject],
            $position: 0
          }
        }
      }, { new: true });

    } else if (newInfo.requestType === 'delete tab') {
      updatedInfo = await User.findByIdAndUpdate(id, {
        $pull: {
          tabs: {
            title: newInfo.newObject
          }
        }
      }, { new: true })

    } else if (newInfo.requestType === 'delete post') {
      updatedInfo = await User.findByIdAndUpdate(id, {
        $pull: {
          [`tabs.${newInfo.index}.posts`]: {
            title: newInfo.newObject
          }
        }
      }, { new: true })

    } else if (newInfo.requestType === 'post') {
      updatedInfo = await User.findByIdAndUpdate(id, {
        $push: {
            [`tabs.${newInfo.index}.posts`]: {
              $each: [newInfo.newObject],
              $position: 0
            }
          }
        }, {new: true})

    } else if (newInfo.requestType === 'update post') {
      updatedInfo = await User.findByIdAndUpdate(id, {
        $set: {
          [`tabs.${newInfo.index}.posts.${newInfo.updatedInfo.postId}.title`]: newInfo.updatedInfo.title,
          [`tabs.${newInfo.index}.posts.${newInfo.updatedInfo.postId}.content`]: newInfo.updatedInfo.content
        }
      }, { new: true })

    } else if (newInfo.requestType === 'update tab') {
      updatedInfo = await User.findByIdAndUpdate(id, {
        $set: {
          [`tabs.${newInfo.index}.title`]: newInfo.newObject.title,
          [`tabs.${newInfo.index}.description`]: newInfo.newObject.description
        }
      }, { new: true })
    }

    res.status(200).json({ success: true, data: updatedInfo });

  } catch (error) {

    console.log(error)
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export const deleteTab = async (req, res) => {
  const oldTitle = req.body;
  const access = req.cookies.accessToken;

  const decoded = jwt.decode(access);
  const id = decoded.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: 'User not found'});
  }
}

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: 'User not found'});
  }
  
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'User deleted'})
  } catch (err) {
    console.log('Error in deleting user:', err.message);
    res.status(500).json({ success: false, message: 'Server error'});
  }
}