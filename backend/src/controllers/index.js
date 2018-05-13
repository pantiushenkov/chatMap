import express from 'express';

const router = express.Router();

//import Home from './Home'
import Login from './Auth'

router.use('/', Login);
// router.use(Login);

export default router;
