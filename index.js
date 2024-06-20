const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let todoLists = [];
let id = 1;

app.get('/todos', (req, res) => {
  res.json(todoLists);
});


app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const todo = todoLists.find(t => t.id === id);
  if (!todo) {
    return res.status(404).json({ status: 'failure', error: 'Todo not found' });
  }
  res.json(todo);
});

app.post('/todos', (req, res) => {
    console.log(req.body)
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ status: 'failure', error: 'Title is required' });
  }
  const newTodo = { id: id++, title, description: description || '' };
  todoLists.push(newTodo);
  res.status(201).json(newTodo);
});

app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title, description } = req.body;
  const todo = todoLists.find(t => t.id === id);
  if (!todo) {
    return res.status(404).json({ status: 'failure', error: 'Todo not found' });
  }
  if (title) todo.title = title;
  if (description) todo.description = description;
  res.json(todo);
});

app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const todoIndex = todoLists.findIndex(t => t.id === id);
  if (todoIndex === -1) {
    return res.status(404).json({ status: 'failure', error: 'Todo not found' });
  }
  todoLists.splice(todoIndex, 1);
  res.status(200).json({status: 'success'});
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
