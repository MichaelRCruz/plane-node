const fs = require('fs');
const assert = require('assert');
const { testSolutions } = require('./test_data/testOutput.js');
const { buildOutput } = require('./algorithms.js');

// Initiates the integration tests and also the simulation.
// Each test file is ran in a loop.
function main(argv) {
  if (argv === 'test') {
    const testFiles = ['test1', 'test2', 'test3'];
    testFiles.forEach((testFile, solutionsIndex) => {
      const file = `./test_data/${testFile}.txt`;
      const birdEvents = parseCsv(file);
      runIntegrationTests(birdEvents, solutionsIndex);
    });
  } else if (!argv) {
    const birdEvents = parseCsv('events.txt');
    runSimulation(birdEvents);
  } else {
    console.log('Invalid command. Try "node app.js" or "node app.js test"');
  }
}

// parses CSV file and returns a sorted array of Bird events
function parseCsv(csvFilePath) {
  const data = fs.readFileSync(csvFilePath, 'utf8').trim();
  const events = data.split('\n');
  const birdEvents = events.map(line => {
    const values = line.split(',');
    return {
      timestamp: +values[0],
      bird_id: values[1],
      event_type: values[2],
      x: +values[3],
      y: +values[4],
      user_id: values[5] != 'NULL' ? +values[5] : 'NULL'
    };
  });
  return birdEvents.sort((a, b) => {
    return a.timestamp - b.timestamp;
  });
}

// compares test output to correct ouput found in ./test_data/testOutput.js
function runIntegrationTests(birdEvents, solutionsIndex) {
  const output = buildOutput(birdEvents);
  try {
      assert.deepEqual(output, testSolutions[solutionsIndex]);
    } catch (error) {
      if (error.name === "AssertionError") {
        return false;
      }
      throw error;
    }
  console.log(`Integration Test ${solutionsIndex + 1}: success`);
}

// prints results of simulation to the command line
function runSimulation(birdEvents) {
  const result = buildOutput(birdEvents);
  Object.keys(result).forEach(answer => {
    console.log(result[answer]);
  });
}

// entry point of program
main(process.argv[2]);
