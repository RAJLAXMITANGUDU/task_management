const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');
const router = express.Router();

router.use(auth);
router.get('/', async (req, res) => {
  const tasks = await Task.find({ userId: req.user._id });
  res.json(tasks);
});
router.post('/', async (req, res) => {
  const task = new Task({ ...req.body, userId: req.user._id });
  await task.save();
  res.json(task);
});
router.put('/:id', async (req, res) => {
  const updated = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    req.body,
    { new: true }
  );
  res.json(updated);
});
router.delete('/:id', async (req, res) => {
  await Task.deleteOne({ _id: req.params.id, userId: req.user._id });
  res.send({ message: 'Deleted' });
});

module.exports = router;
