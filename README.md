# GBF_AutoWipeTweet
Nodejs script to auto wipe tweet by GBF

Note: You will need a set of OAuth details with user context (this script uses v1.0a via API v1.1 using Twit). The original approach was to completely use v2 but I could not manage to get the OAuth with PKCE working. The search part uses v2 so you will need a bearer token too (or rewrite the search part to use v1.1).

The most recent commit set the script to fetch the latest 5 tweet from targeted user (5 is minimum per request, and it counts towards rate limit even if same tweet is fetch again) for every 30 seconds. And only look at the latest one, which will move on to be deleted if the latest tweet is tweeted via "グランブルー ファンタジー", so both daily stamina tweet and quest help tweet will be deleted. However, since there is a 30 seconds window, if you tweet right after tweeting from GBF, the tweet will not be caught. (This might be update in the future to run through all 5 fetched tweet.)

Please also keep in mind that if the tweet happens to be deleted too fast after posted, it might no be present on the raid finder. 

This script, or me is not associated with Twitter or Cygames. 