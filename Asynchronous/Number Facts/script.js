const RANDOM_URL = "http://numbersapi.com/random/year";
const BASE_URL = "http://numbersapi.com/";
const WRONG_URL = "http://numbersapi.nope.nope/";
async function showNumberTrivia() {
  try {
    let res = await fetch(RANDOM_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await res.json();
    return data.text;
  } catch (err) {
    throw new Error("Problem with fetching in showNumberTrivial");
  }
}

async function showNumberRace() {
  try {
    let randomFetches = [];
    for (let i = 0; i < 4; i++) {
      let randomNumber = Math.floor(Math.random() * 100) + 1;
      randomFetches.push(fetch(BASE_URL + randomNumber + "?json"));
    }
    let promise = await Promise.race(randomFetches);
    let data = await promise.json();
    return data.text;
  } catch (err) {
    throw new Error("Problem with fetching in showNumberRace");
  }
}

async function showNumberAll() {
  try {
    let randomFetches = [];
    for (let i = 0; i < 3; i++) {
      let randomNumber = Math.floor(Math.random() * 100) + 1;
      randomFetches.push(fetch(BASE_URL + randomNumber + "?json"));
    }
    randomFetches.push(fetch(WRONG_URL));
    let promises = await Promise.allSettled(randomFetches);
    let successTexts = [];
    let failedTexts = [];

    for (let promiseObj of promises) {
      if (promiseObj.status === "rejected") failedTexts.push(promiseObj.reason);
      else {
        let data = await promiseObj.value.json();
        successTexts.push(data.text);
      }
    }
    return [successTexts, failedTexts];
  } catch (err) {
    throw new Error("Problem with fetching in showNumberAll");
  }
}

async function main() {
  try {
    let text = await showNumberTrivia();
    console.log("Show number trivial: " + text);
    text = await showNumberRace();
    console.log("Show number Reace: " + text);
    text = await showNumberAll();
    console.log("Show number all fulfilled: " + text[0]);
    console.log("Show number all rejected: " + text[1]);
  } catch (err) {
    console.log(err.message);
  }
}

main();
