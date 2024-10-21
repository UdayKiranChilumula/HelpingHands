import express from 'express';
import {deleteUser,getAllUsers } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

//user 
router.delete('/delete/:id', deleteUser)
router.get('/',getAllUsers)




// router.post('/:userId/reading-list', createReadingList);
// router.post('/:userId/reading-list/add', addBookToReadingList);
// router.post('/:userId/reading-list/remove', removeBookFromReadingList);
// router.get('/:userId/reading-list',getReadingList);



export default router;
