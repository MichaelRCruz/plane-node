👇 click it. it's a video

[![robo-plane](https://img.youtube.com/vi/Dt0DjIel7zs/0.jpg)](https://www.youtube.com/watch?v=Dt0DjIel7zs&feature=youtu.be)

# ✈️ plane-node

### Thank you for looking at my code!

#### overview
My intent with this application, aside from arriving to the correct solution, was mainly aimed at code readability. The directory has been organized into a few main files.
0. ```app.js``` – the entry point to the application and all logic for testing and parsing CSV files.
1. ```algorithms.js``` – includes six functions handling all questions with the help of some utility functions.
2. ```utils.js``` – reusable functions or, simply put, helper functions.

#### assumptions
0. Data has been sorted by time.
1. No duplicate drops. No Bird has been dropped more than once.
2. There exists a final END_RIDE event for each DROP. All END_RIDE events have a corresponding START_RIDE event. Distance is measured as a perfectly straight line from its original drop location. No two Birds ended up at equal distances.
3. Each ride distance is measured as a straight line from START_RIDE to END_RIDE, i.e., there are no intermediate coordinates between START_RIDE and END_RIDE. Total distance represents the sum of all ride distances. Proximity to the DROP_EVENT has no influence in the total distance traveled calculation. No two Birds traveled total equal distances.
4. There exists a _final_ END_RIDE event and _all_ END_RIDE events have a corresponding START_RIDE event. No two Birds had equal wait times.
5. Average speed is interpreted as global average speed. The average speed of each ride is summed up from all rides. This value is then divided by total number of rides.

#### prerequisites
Node version 10.4.0 or higher.

#### installing
1. Unzip the source directory.
2. Change directory into the application.
```console
$ cd michael_cruz_technical_challenge
```

#### running the tests and running and running the tests
```console
$ node app.js test
```
If all three tests pass, you will be prompted with the following.
```console
Integration Test 1: success
Integration Test 2: success
Integration Test 3: success
```

#### Running the Application
```console
$ node app.js
```
If you run the application with the ```events.txt``` file, provided with the challenge, you will be prompted with my official solution.
```console
24 total drops.
LQBF was farthest away at distance 190.98428733714593.
G2I0 traveled longest at distance 784.6776596261359.
8951 paid the most at $24.90.
5LYM had the longest wait time at 4127 seconds.
Average speed traveled across all rides is 0.7087360645488971 per second.
```
