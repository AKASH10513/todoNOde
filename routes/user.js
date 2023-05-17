import express from 'express';
import{Register, getAllUser, userById,updateUser,deleteUser ,Login,getMyProfile,Logout} from '../controllers/user.js'
import {User} from '../models/user.js'
import {isAuthenticated} from '../middlewares/auth.js'


const router = express.Router();





router.post("/add",Register);

router.post("/login",Login);

router.get("/me",isAuthenticated,getMyProfile);

router.get("/logout",isAuthenticated,Logout);


router.get("/id/:id",userById);


router.put("/id/:id",updateUser);

router.delete("/id/:id",deleteUser);


export default router;