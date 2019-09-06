const {
  getHypotenuse, groupEventsByAttribute, calculateRideCost, getLargestValue
} = require('./utils.js');

// Q1: Loops through events sorted by time and returns 'DROP' events count
function getDropEvents(birdEvents) {
  let dropEvents = [];
  birdEvents.forEach( event => {
    if (event.event_type === 'DROP') {
      dropEvents.push(event);
    }
  });
  return dropEvents.length;
}

// Q2: Loops through events grouped by Bird ID. Dependent on events sorted by time.
// Assumes last event by time is where the Bird ends up.
function getFarthestBird(eventsByBirdId) {
  let birdDistances = [];
  Object.keys(eventsByBirdId).forEach(bird => {
    const birdEvents = eventsByBirdId[bird];
    const dropEvent = birdEvents[0];
    const endEvent = birdEvents[birdEvents.length - 1];
    const coordinates = [dropEvent.x, dropEvent.y, endEvent.x, endEvent.y];
    const distance = getHypotenuse(...coordinates);
    birdDistances.push({ bird, distance });
  });
  return getLargestValue(birdDistances, 'distance');
}

// Q3: Loops through events grouped by Bird ID. Dependent on events sorted by time.
// Relies on Pythagorean Theorem to calculate distance between rides.
function getLongestTraveled(eventsByBirdId) {
  let birdTravelTimes = [];
  Object.keys(eventsByBirdId).forEach(bird => {
    const birdEvents = eventsByBirdId[bird];
    let totalDistance = 0;
    for (let i = 1; i < birdEvents.length - 1; i += 2) {
      const startEvent = birdEvents[i];
      const endEvent = birdEvents[i + 1];
      const coordinates = [startEvent.x, startEvent.y, endEvent.x, endEvent.y];
      totalDistance += getHypotenuse(...coordinates);
    }
  birdTravelTimes.push({ bird, totalDistance });
    totalDistance = 0;
  });
  return getLargestValue(birdTravelTimes, 'totalDistance');
}

// Q4: Loops through events grouped by user. Calculates ride cost per ride and
// sums on all rides. Relies on events sorted by time.
function getTotalCostPerUser(eventsByUser) {
  let totalCostsPerUser = [];
  Object.keys(eventsByUser).forEach(user => {
    const userEvents = eventsByUser[user];
    let totalCost = 0;
    for (let i = 0; i < userEvents.length - 1; i += 2) {
      const rideTime = userEvents[i + 1].timestamp - userEvents[i].timestamp;
      totalCost += calculateRideCost(rideTime);
    }
    totalCost = (totalCost / 100).toFixed(2);
    totalCostsPerUser.push({ user, totalCost });
    totalCost = 0;
  });
  return getLargestValue(totalCostsPerUser, 'totalCost');
}

// Q5: Loops through events sorted by Bird ID. Continues through events containing
// only one ride.
function getLongestWaitTime(eventsByBird) {
  let waitTimes = [];
  Object.keys(eventsByBird).forEach(bird => {
    const birdEvents = eventsByBird[bird];
    let longestWaitTime = 0;
    if (birdEvents.length === 3) {
      waitTimes.push({ bird, longestWaitTime: 0 });
    } else {
      for (let i = 3; i <= birdEvents.length - 2; i += 2) {
        const startTime = birdEvents[i].timestamp;
        const endTime = birdEvents[i - 1].timestamp;
        const waitTime = startTime - endTime;
        if (waitTime > longestWaitTime) {
          longestWaitTime = waitTime;
        }
      }
      waitTimes.push({ bird, longestWaitTime });
      longestWaitTime = 0;
    }
  });
  return getLargestValue(waitTimes, 'longestWaitTime');
}

// Q6: Loops through events grouped by Bird ID. Calculates speed D/T for each ride.
// Sums speed of each ride in simulation. Divides by total number of rides in
// the simulation.
function getGlobalAverageSpeed(eventsByBird) {
  let sumOfAverageSpeeds = 0;
  let totalRides = 0;
  Object.keys(eventsByBird).forEach(bird => {
    const birdEvents = eventsByBird[bird];
    for (let i = 1; i < birdEvents.length - 1; i += 2) {
      totalRides++;
      const startEvent = birdEvents[i];
      const endEvent = birdEvents[i + 1];
      const coordinates = [startEvent.x, startEvent.y, endEvent.x, endEvent.y];
      const rideDistance = getHypotenuse(...coordinates);
      const rideDuration = endEvent.timestamp - startEvent.timestamp;
      sumOfAverageSpeeds += rideDistance / rideDuration;
    }
  });
  return sumOfAverageSpeeds / totalRides;
}

// Simple function to return a readable data structure for simulation and
// simulation output.
function buildOutput(birdEvents) {
  const eventsByBirdId = groupEventsByAttribute(birdEvents, 'bird_id');
  const eventsByUserId = groupEventsByAttribute(birdEvents, 'user_id');
  const drops = getDropEvents(birdEvents);
  const farBird = getFarthestBird(eventsByBirdId);
  const longTraveled = getLongestTraveled(eventsByBirdId);
  const cost = getTotalCostPerUser(eventsByUserId);
  const wait = getLongestWaitTime(eventsByBirdId);
  const speed = getGlobalAverageSpeed(eventsByBirdId);
  const output = {
    Q1: `${drops} total drops.`,
    Q2: `${farBird.bird} was farthest away at distance ${farBird.distance}.`,
    Q3: `${longTraveled.bird} traveled longest at distance ${longTraveled.totalDistance}.`,
    Q4: `${cost.user} paid the most at $${cost.totalCost}.`,
    Q5: `${wait.bird} had the longest wait time at ${wait.longestWaitTime} seconds.`,
    Q6: `Average speed traveled across all rides is ${speed} per second.`
  }
  return output;
}

module.exports = { buildOutput };
