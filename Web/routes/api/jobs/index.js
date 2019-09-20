import express from 'express';

const router = express.Router();
function post(req, res, next) {
    res.send('SUCCESS JOBS post');
}

router.post('/', post);

export default router;
