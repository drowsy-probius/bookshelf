import express from 'express';

import scanRouter from './api/scan';

const router = express.Router();

router.use('/', (req, res) => {res.send('hello')});

router.use('/api/scan', scanRouter);


export default router;