import Twitter from "twitter";
var client = new Twitter({
  consumer_key: process.env.TWITTER_API_TOKEN,
  consumer_secret: process.env.TWITTER_API_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET,
});
var params = { screen_name: "komattasorata" };
client.post(
  `statuses/destroy/1502644905906421763`,
  params,
  function (error, tweets, response) {
    if (!error) {
      console.log(response);
    }
  }
);
