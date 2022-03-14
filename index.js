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
  let result = [tweet.data[0].id, tweet.data[0].source];
  return result;
}

async function deleteGBFTweet() {
  let newestTweet = await getLatestTweet(process.env.TARGET_USERID);
  if (newestTweet[1] === target_source) {
    T.post(
      "statuses/destroy/:id",
      { id: newestTweet[0] },
      function (err, data, response) {
        if (err) {
          console.log(err);
        } else {
          console.log(`Deleted tweet with ID ${newestTweet[0]}`);
        }
      }
    );
  }
}

let runEvery30Second = setInterval(() => deleteGBFTweet(), 30000);
