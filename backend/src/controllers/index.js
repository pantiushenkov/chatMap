import express from 'express';

const router = express.Router();

//import Home from './Home'
import Login from './Auth'
import Add from './Chat'
import Search from './Search'

router.use('/', Login);
router.use('/', Add);
router.use('/', Search);

export default router;
