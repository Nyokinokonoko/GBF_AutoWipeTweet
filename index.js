import fetch from "node-fetch";
import "dotenv/config";

const target_source = "グランブルー ファンタジー";

async function getLatestTweet(target) {
  const gettingTweetResponse = await fetch(
    `https://api.twitter.com/2/users/${target}/tweets?exclude=retweets&tweet.fields=source`,
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
    const deleteTweet = await fetch(
      `https://api.twitter.com/2/tweets/${newestTweet[0]}`,
      {
        method: "delete",
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
        },
      }
    );
    return deleteTweet;
  }
}

console.log(await deleteGBFTweet());
