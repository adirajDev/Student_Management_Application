import express from 'express'
import { getCurrentUser } from '../controllers/auth.controller.js';
import { requireUser } from '../middleware/requireUser.js';

const router = express.Router();

router.get('/me', requireUser, getCurrentUser);

export default router;
