import express from 'express';

const router = express.Router();

function get(req, res, next) {
    res.send('SUCCESS DIFF GET');
}

router.get('/', get);

export default router;
