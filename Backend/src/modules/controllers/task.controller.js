const { v4: uuidv4 } = require('uuid');
let tasks = [];

module.exports.getAllTasks = async (req, res, next) => {
  res.send({data: tasks});
};

module.exports.createNewTask = (req, res, next) => {
  const body = req.body;
  if (body.hasOwnProperty('text') && body.hasOwnProperty('isCheck')) {
    
    body.id = uuidv4();
    tasks.push(body);
    res.send({data: tasks});
  } else {
    res.status(422).send('Error! Params not correct');
  }
};

module.exports.changeTaskInfo = (req, res, next) => {
  console.log(req.body);
  const body = req.body;
  if (body.hasOwnProperty('id') && (body.hasOwnProperty('text') || body.hasOwnProperty('isCheck'))) {
    tasks.forEach((item, i) => {
      if(item.id === body.id) {
        for(let key in body) {
          tasks[i][key] = body[key];
        }
      }
    });
    res.send({data: tasks});
  } else {
    res.status(422).send('Error! Params not correct');
  }
};

module.exports.deleteTask = (req, res, next) => {
  if (!req.query.id) return res.status(422).send('Error! Params not correct');
  const task = tasks.filter(item => item.id === req.query.id);
  if (task.length) {
    tasks.forEach((item, i) => {
      if(item.id === req.query.id) {
        tasks.splice(i, 1);
      }
    });
    res.send({data: tasks});
  } else {
    res.status(404).send('Task not found');
  }
};

module.exports.deleteTasks = (req, res, next) => {
  tasks = [];
  res.send({data: []});
};

