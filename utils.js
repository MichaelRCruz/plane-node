// simple pythagorean theorem
function getHypotenuse(dropX, dropY, endX, endY) {
  const a = dropX - endX;
  const b = dropY - endY;
  return Math.sqrt( (a * a) + (b * b) );
}

// groups based on given attribute. deletes NULL keys (DROP EVENTS)
function groupEventsByAttribute(birdEvents, attribute) {
  let groupedEvents = {};
  birdEvents.forEach(event => {
    const key = event[attribute]
    if (groupedEvents[key]) {
      groupedEvents[key].push(event);
    } else {
      groupedEvents[key] = [event];
    }
  });
  delete groupedEvents['NULL'];
  return groupedEvents;
}

// calculates ride cost on per ride basis returns value in pennies to avoid
// floating point rounding errors
function calculateRideCost(rideTime) {
  if (rideTime < 60) {
    return 0;
  } else {
    let pennies = Math.ceil(rideTime / 60) * 15;
    return pennies += 100;
  }
}

// simple sorting function returns largest value
function getLargestValue(events, attribute) {
  const sortedByLargest = events.sort((a, b) => {
    return b[attribute] - a[attribute];
  });
  return sortedByLargest[0];
}

module.exports = {
  getHypotenuse,
  groupEventsByAttribute,
  calculateRideCost,
  getLargestValue
};
