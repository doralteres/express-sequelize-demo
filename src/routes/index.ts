import { Router } from 'express';

import teamsRouter from './teams.router';

const router = Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.json({
    site: 'Demo-Api',
    message: 'Welcome! for more info visit https://github.com/doralteres',
  });
});

router.use('/api/teams', teamsRouter);

export default router;
