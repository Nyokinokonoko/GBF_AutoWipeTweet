import fetch from "node-fetch";
import "dotenv/config";
import Twit from "twit";

const T = new Twit({
  consumer_key: process.env.TWITTER_API_TOKEN,
  consumer_secret: process.env.TWITTER_API_SECRET,
  access_token: process.env.TWITTER_OAUTH_ACCESSTOKEN,
  access_token_secret: process.env.TWITTER_OAUTH_ACCESSSECRET,
});

const executionInterval = 30000;

async function getLatestTweet(target) {
  const gettingTweetResponse = await fetch(
    `https://api.twitter.com/2/users/${target}/tweets?exclude=retweets&tweet.fields=source&max_results=5`,
    {
      method: "get",
      headers: { Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}` },
    }
  );
  const tweet = await gettingTweetResponse.json();
  let result = { id: tweet.data[0].id, content: tweet.data[0].text };
  return result;
}

async function deleteGBFTweet() {
  eventLog("Checking for tweets...");
  let newestTweet = await getLatestTweet(process.env.TARGET_USERID);
  if (newestTweet.content.includes(":参戦ID\n参加者募集！\n")) {
    T.post(
      "statuses/destroy/:id",
      { id: newestTweet.id },
      function (err, data, response) {
        if (err) {
          console.log(err);
        } else {
          eventLog(`Deleted tweet with ID ${newestTweet.id}`);
        }
      }
    );
  }
}

function eventLog(message) {
  console.log(`[GBF_AutoWipeTweet] ${new Date().toLocaleString()}: ${message}`);
}

eventLog(
  `Successfully launched. Execution interval: ${executionInterval / 1000}s`
);
deleteGBFTweet();
let runEvery30Second = setInterval(() => deleteGBFTweet(), executionInterval);
