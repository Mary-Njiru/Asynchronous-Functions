//Question1
async function logMessage(message, delay) {
  await new Promise(resolve => setTimeout(resolve, delay));
  console.log(message);
}
logMessage("My name is Mary", 3000)


//Question2
const getUserData = id => {
    // Simulate async API call
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ id, name: `User ${id}` });
      }, 100);
    });
  };
  
  const logUserData = async ids => {
    for (const id of ids) {
      const userData = await getUserData(id);
      console.log(userData);
    }
  };
  
  const userIds = [1, 2, 3];
  logUserData(userIds);

//Question3

const performTask = () => {
    // Simulate async task
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Resolve the Promise with a random number between 0 and 1
        const result = Math.random();
        if (result > 0.5) {
          resolve(`Task succeeded with result ${result}`);
        } else {
          reject(new Error(`Task failed with result ${result}`));
        }
      }, 100);
    });
  };
  
  const handleTaskResult = async () => {
    try {
      const result = await performTask();
      console.log(result);
    } catch (error) {
      console.error(error.message);
    }
  };
  
  handleTaskResult();


//Question4

const unstableTask = (taskName, failureProbability) => {
    return new Promise((resolve, reject) => {
      const randomNumber = Math.random();
      if (randomNumber > failureProbability) {
        resolve(`${taskName} succeeded`);
      } else {
        reject(new Error(`${taskName} failed`));
      }
    });
  };
  
  const executeWithRetry = (taskName, retries, failureProbability) => {
    return new Promise((resolve, reject) => {
      let attempts = 0;
      const attemptTask = () => {
        attempts++;
        unstableTask(taskName, failureProbability)
          .then(result => {
            console.log(`${taskName} attempt ${attempts} succeeded`);
            resolve(result);
          })
          .catch(error => {
            if (attempts < retries) {
              console.log(`${taskName} attempt ${attempts} failed, retrying...`);
              attemptTask();
            } else {
              console.log(`${taskName} failed after ${attempts} attempts`);
              reject(error);
            }
          });
      };
      attemptTask();
    });
  };
  
  executeWithRetry('attemptedTask', 3, 0.5)
    .then(result => {
      console.log(result);
    })
    .catch(error => {
      console.error(error.message);
    });







