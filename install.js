const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const steps = [
  'Getting required dependencies',
  'Preparing packages',
  'Installing packages',
  'Getting things ready'
  // Add more steps as needed
];

rl.question('First, do you agree that Ruto Must Go? [Y/n] ', (answer) => {
  if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
    console.log('Thank you for joining the revolution.');
    runSteps(steps, () => {
      console.log('\nCompleted successfully.');
      rl.close();
    });
  } else {
    console.log('Failure, traitor, imbecile, nothing for people like you.');
    rl.close();
  }
});

function runSteps(steps, callback) {
  let currentStep = 0;

  function runNextStep() {
    const step = steps[currentStep];
    simulateLoading(step, () => {
      currentStep++;
      if (currentStep < steps.length) {
        runNextStep();
      } else {
        callback();
      }
    });
  }

  runNextStep();
}

function simulateLoading(step, callback) {
  let progress = 0;
  const interval = setInterval(() => {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`${step}... [${'#'.repeat(progress / 5)}${'.'.repeat(20 - progress / 5)}] ${progress}%`);
    progress += 5;
    if (progress > 100) {
      clearInterval(interval);
      process.stdout.write('\n');
      setTimeout(callback, 500);
    }
  }, 250);
}
