import { Router } from 'express';
import { teamsModel } from '../models/teams.model';
import { Sequelize } from 'sequelize';

const router = Router();

router.get('/', (req, res) => {
  const db: Sequelize = req.app.get('db');
  db.model(teamsModel)
    .findAndCountAll()
    .then(({ rows, count }) => {
      res.json({ rows, count });
    })
    .catch((e) => {
      console.error(e);
      res.status(500).send(e);
    });
});

router.post('/', (req, res) => {
  const db: Sequelize = req.app.get('db');
  db.model(teamsModel)
    .create(req.body)
    .then((values) => {
      res.status(201).json(values);
    })
    .catch((e) => {
      console.error(e);
      res.status(500).send(e);
    });
});

router.get('/:id', (req, res) => {
  const db: Sequelize = req.app.get('db');
  db.model(teamsModel)
    .findByPk(req.params.id)
    .then((data) => {
      res.json({ data });
    })
    .catch((e) => {
      console.error(e);
      res.status(500).send(e);
    });
});

router.put('/:id', (req, res) => {
  const db: Sequelize = req.app.get('db');
  db.model(teamsModel)
    .update(req.body, { where: { id: req.params.id } })
    .then((values) => {
      res.status(201).json({ updatedRows: values });
    })
    .catch((e) => {
      console.error(e);
      res.status(500).send(e);
    });
});

router.delete('/:id', (req, res) => {
  const db: Sequelize = req.app.get('db');
  db.model(teamsModel)
    .destroy({ where: { id: req.params.id } })
    .then((value) => {
      res.status(201).json({ value });
    });
});

export default router;
