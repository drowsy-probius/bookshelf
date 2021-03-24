const fs = require('fs');

class WorkerQueue{
  constructor(workFunction, jsonFilePath, interval=1000)
  {
    this.q = [];
    this.interval = interval;
    this.jsonFilePath = jsonFilePath;
    this.concurrency = 4;
    this.currentJobs = 0;

    this.reload();

    this.workFunction = workFunction;

    this.consume = setInterval(() => {
      this.save();
      this.work();
    }, this.interval);
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
      throw new Error(`queue is empty`);
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
      if(err)
      {
        throw err;
      }
    })
  }

  work()
  {
    if(!this.empty() && this.currentJobs < this.concurrency)
    {
      const job = this.top();
      this.pop();
      console.log(`before ${job}: ${this.currentJobs}`); /** debug code */
      this.currentJobs += 1;
      this.workFunction(job)
      .then(()=>{
        this.currentJobs += -1;
        console.log(`after ${job}: ${this.currentJobs}`); /** debug code */
      })
    }
  }
}

module.exports = WorkerQueue;
