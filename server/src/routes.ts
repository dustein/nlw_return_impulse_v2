import express from 'express';
import { send } from 'process';

export const router = express.Router();

router.get("/", (req, res) => {
  res.send({message: "Pasta Raiz"})
});

router.get("/feedback", (req, res) => {
  res.status(201).send({message: 'Feedback Salvo'})
});

