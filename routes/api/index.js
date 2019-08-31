import express from 'express';
import diff from './diff';

const router = express.Router();
router.use('/diff', diff);

export default router;