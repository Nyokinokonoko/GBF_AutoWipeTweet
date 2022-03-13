# GBF_AutoWipeTweet
## Nodejs script to auto wipe tweet by GBF
<br>
Note: You will need a set of OAuth details with user context (this script uses v1.0a via API v1.1 using Twit). The original approach was to completely use v2 but I could not manage to get the OAuth with PKCE working. The search part uses v2 so you will need a bearer token too (or rewrite the search part to use v1.1).
<br><br>
The script will check for the latest 5 tweets of the targeted user. If any of them are from Granblue Fantasy (source: グランブルー ファンタジー), it will be deleted via the `statuses/destroy/:id` endpoint of Twitter v1 API. Note that it will count toward the rate limited even if there is no new tweet (in which already checked tweet will be fetched again). Rate limit will also seperately count the delete request. (A future version might check only newly posted tweet by recording and comparing tweet ID of already checked tweets. But there is no concern of reaching the rate limit if you only run this script for the app. 446,400 fetch of tweets per month, double as if all tweet is from GBF, which is far from reaching the rate limit.)
<br><br>
Please also keep in mind that if the tweet happens to be deleted too fast after posted, it might no be present on the raid finder. 
<br><br>
This script, or me is not associated with Twitter or Cygames. 