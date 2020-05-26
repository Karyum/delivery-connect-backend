import express from 'express';

import { Auth } from '../controllers';
import { verifyToken } from '../middleware';

const router = express.Router();

router.post('/authenticate', Auth.authenticate);
// router.post('/addUser', Auth.addUser);
router.get('/logout', Auth.logout);

export default router;
