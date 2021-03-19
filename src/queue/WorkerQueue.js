class WorkerQueue{
  constructor(workFunction, interval)
  {
    this.q = [];
    this.interval = interval
    this.repeat = setInterval(() => {
      this.work(workFunction);
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

  work(workFunction)
  {
    const job = this.q.top();
    this.q.pop();
    workFunction(job);
  }
}

module.exports = WorkerQueue;
