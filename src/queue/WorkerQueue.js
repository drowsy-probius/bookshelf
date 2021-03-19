const fs = require('fs');

class WorkerQueue{
  constructor(workFunction, interval, jsonFilePath)
  {
    this.q = [];
    this.interval = interval;
    this.jsonFilePath = jsonFilePath;
    this.workFuntion = workFunction;
    this.repeat = setInterval(() => {
      this.work();
    }, this.interval)
  }
  
  pop()
  {
    this.q.shift();
  }

  push(value)
  {
    this.q.push(value);
  }

  top()
  {
    if(this.q.length > 0)
    {
      return this.q[0];
    }
    else
    {
      return -1;
    }
  }

  empty()
  {
    return this.q.length == 0
  }

  reload()
  {
    if (fs.existsSync(this.jsonFilePath))
    {
      const json = fs.readFileSync(this.jsonFilePath);
      this.q = JSON.parse(json);
    }
  }

  save()
  {
    const jsonString = JSON.stringify(this.q);
    fs.writeFile(this.jsonFilePath, jsonString, (err) => {
      if(err) throw err;
    })
  }

  work()
  {
    const job = this.q.top();
    this.q.pop();
    this.workFunction(job);
  }
}

module.exports = WorkerQueue;
