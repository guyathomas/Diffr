import express from 'express';
import diff from './diff';
import jobs from './jobs';

const router = express.Router();
router.use('/diff', diff);
router.use('/jobs', jobs);

export default router;