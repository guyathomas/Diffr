import express  from 'express';
import jobs from './jobs';

const router = express.Router();

router.get('/jobs', jobs)

export default router;