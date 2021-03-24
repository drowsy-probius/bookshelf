function processor(job)
{
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`${job} on scanner.`);
      resolve(true);
    }, 4321);
  })
}

module.exports = processor;
