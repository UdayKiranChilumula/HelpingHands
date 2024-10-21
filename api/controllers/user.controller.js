// user.controllers.js

import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
import User from  '../models/user.model.js';


export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Optionally, perform additional clean-up tasks (e.g., delete related data)

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    next(error);
  }
};




  export const getAllUsers = async (req, res, next) => {
    try {
      // Fetch all users from the database
      const users = await User.find({}, '-password'); // Exclude the password field
  
      // Check if any users were found
      if (!users || users.length === 0) {
        return res.status(404).json({ message: 'No users found' });
      }
  
      // Return the list of users
      res.status(200).json(users);
    } catch (error) {
      // Handle errors
      next(error);
    }
  };



