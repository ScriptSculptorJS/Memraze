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
  console.log(req.body, 'with non-hashed password');

  try {

    if (user.email === '' || user.password === '') {
      console.log('Please provide all fields')
    };

    if (!validator.isEmail(user.email)) {
      console.log('Email is not valid')
    }
    const exists = await User.findOne({ email: user.email });

    console.log('Do we see user already exists?', exists);

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

      console.log(newUser, 'with hashed password now');

      const newentry = await newUser.save();
      console.log('Is id here?', newentry);

      console.log('New user created. Please log in: ', newentry);

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
  console.log(req.body, `What is showing up here when I send in the newTab's information to the backend`)
  const newInfo = req.body;
  const access = req.cookies.accessToken;
  let updatedInfo;
  console.log(newInfo);

  const decoded = jwt.decode(access);
  console.log(decoded.id, 'Is this the id now that was came from decoding the token?');
  const id = decoded.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: 'User not found'});
  }

  try {
    if (newInfo.requestType === 'description') {
      console.log('we are in the if else statement to determine whether it is a description or tab')
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
      console.log('We are in the backend before updating the deletion of the tab', newInfo.newObject);
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
      console.log('We are in the backend just before updating the users post in a tab', newInfo.newObject);
      console.log(newInfo.index);

      updatedInfo = await User.findByIdAndUpdate(id, {
        $push: {
            [`tabs.${newInfo.index}.posts`]: {
              $each: [newInfo.newObject],
              $position: 0
            }
          }
        }, {new: true})
    } else if (newInfo.requestType === 'update post') {

      console.log(newInfo.index, newInfo.newObject, newInfo.updatedInfo)
      updatedInfo = await User.findByIdAndUpdate(id, {
        $set: {
          [`tabs.${newInfo.index}.posts.${newInfo.updatedInfo.postId}.title`]: newInfo.updatedInfo.title,
          [`tabs.${newInfo.index}.posts.${newInfo.updatedInfo.postId}.content`]: newInfo.updatedInfo.content
        }
      }, { new: true })
    }
    console.log(updatedInfo)
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

  /*try {
    const updatedInfo = await User.findByIdAndUpdate(id, {
      $pull: {
        tabs: {
          title: oldTitle
        }
      }
    })
    res.status(200).json({ success: true, data: updatedInfo });
  } catch(err) {
    res.status(500).json({ success: false, message: 'Server error'});
  }*/

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