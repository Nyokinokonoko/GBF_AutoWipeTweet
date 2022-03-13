import fetch from "node-fetch";
import "dotenv/config";
import Twit from "twit";

const T = new Twit({
  consumer_key: process.env.TWITTER_OAUTH_CONSUMERKEY,
  consumer_secret: process.env.TWITTER_OAUTH_CONSUMERSECRET,
  access_token: process.env.TWITTER_OAUTH_ACCESSTOKEN,
  access_token_secret: process.env.TWITTER_OAUTH_ACCESSSECRET,
});

const target_source = "グランブルー ファンタジー";

async function getLatestTweet(target) {
  const gettingTweetResponse = await fetch(
    `https://api.twitter.com/2/users/${target}/tweets?exclude=retweets&tweet.fields=source&max_results=5`,
    {
      method: "get",
      headers: { Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}` },
    }
  );
  const tweet = await gettingTweetResponse.json();
  let result = [
    tweet.data[0].id,
    tweet.data[0].source,
    tweet.data[1].id,
    tweet.data[1].source,
    tweet.data[2].id,
    tweet.data[2].source,
    tweet.data[3].id,
    tweet.data[3].source,
    tweet.data[4].id,
    tweet.data[4].source,
  ];
  return result;
}

async function deleteGBFTweet(targetTweetID) {
  T.post(
    "statuses/destroy/:id",
    { id: targetTweetID },
    function (err, data, response) {
      if (err) {
        console.log(err);
      }
    }
  );
}

async function checkLast5Tweets() {
  let checkTarget = await getLatestTweet(process.env.TARGET_USERID);
  let tweetIDs = [
    checkTarget[0],
    checkTarget[2],
    checkTarget[4],
    checkTarget[6],
    checkTarget[8],
  ];
  let sources = [
    checkTarget[1],
    checkTarget[3],
    checkTarget[5],
    checkTarget[7],
    checkTarget[9],
  ];

  for (let i = 0; i < 5; i++) {
    if (sources[i] === target_source) {
      await deleteGBFTweet(tweetIDs[i]);
      console.log(`Deleted tweet by GBF. (ID: ${tweetIDs[i]})`);
    }
  }

  let currentDate = new Date();
  let dateTime =
    "Last Check: " +
    currentDate.getDate() +
    "/" +
    (currentDate.getMonth() + 1) +
    "/" +
    currentDate.getFullYear() +
    " @ " +
    currentDate.getHours() +
    ":" +
    currentDate.getMinutes() +
    ":" +
    currentDate.getSeconds();

  console.log(`Finished checking the latest 5 tweets. (${dateTime})`);
}

let runEvery30Second = setInterval(() => checkLast5Tweets(), 30000);
