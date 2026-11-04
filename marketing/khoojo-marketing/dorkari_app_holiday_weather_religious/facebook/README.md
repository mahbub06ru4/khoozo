# দরকারি — Facebook ad kit

Ready-to-post Bangla + English ads for the launch: four creatives, five post texts, headlines and a boost guide.

| What | Where |
|---|---|
| Square feed image (1080×1080) | `creatives/fb_square_1080x1080.png` |
| 4:5 feed image, Sehri/Iftar (1080×1350) | `creatives/fb_feed_1080x1350.png` |
| Story / Reels image (1080×1920) | `creatives/fb_story_1080x1920.png` |
| Link-ad banner (1200×628) | `creatives/fb_link_1200x628.png` |
| Post texts, headlines, descriptions, hashtags, first comment, reply templates (Bangla + English) | `facebook-ads.md` |
| Creative sources and renderer | `tools/ad_creatives.html`, `tools/build_creatives.py` |

Re-render the images after editing `tools/ad_creatives.html`: `python marketing/facebook/tools/build_creatives.py` (needs Pillow and Chrome or Edge; use `python3` on a Mac).

## Before you spend anything

1. **The app must be live on Google Play first.** The ads link to the store page, so publish (at least to production) before boosting. See `play_store_asset/PUBLISHING_GUIDE.md`.
2. **Build your tracking link** and use it everywhere in place of `[PLAY_STORE_LINK]`:
   ```
   https://play.google.com/store/apps/details?id=com.update360.app&referrer=utm_source%3Dfacebook%26utm_medium%3Dpaid%26utm_campaign%3Dlaunch
   ```
   Play Console (Statistics → Acquisition) then shows how many installs came from this campaign. Change `launch` for each new campaign (for example `ramadan`) to compare them.
3. **Check the facts in the creatives.** The sample Sehri/Iftar times in `fb_feed` are marked *নমুনা* (sample). Keep that mark.
4. If the Duas section is still hidden in the app, don't mention duas in any ad (none of the texts do).

## How to boost (step by step)

You can either boost a Page post or run it from Ads Manager. Ads Manager gives more control, so use it if you can.

**Option A: boost a Page post (fastest)**
1. On your Facebook **Page**, create a post with a text from `facebook-ads.md` and the matching image. Put the tracking link in the text.
2. Press **Boost post**. Goal: **Get more website visitors** (or **Get more engagement** for brand awareness). Destination: the tracking link. Button: **Install now** if offered, otherwise **Learn more**.
3. Audience, budget and duration: see the table below. Publish.

**Option B: Ads Manager (recommended)**
1. <https://adsmanager.facebook.com> → **Create** → objective **Traffic** (send people to the Play Store page). If you later register the app with Meta, switch to **App promotion** for install optimisation.
2. Ad set: audience and budget from the table. Placements: **Advantage+ (automatic)** first.
3. Ad: choose your Page, upload the creatives (feed and story sizes), paste the primary text and a headline, set the website URL to the tracking link, and pick **Install now**.
4. Create **two ads** in one ad set (for example square vs story) so Meta shows you which one works better.

## Suggested settings (a starting point; adjust to your budget)

| Setting | Suggestion |
|---|---|
| Location | Bangladesh. Optionally limit to Dhaka, Chattogram, Rajshahi, Khulna, Sylhet, Barishal and Rangpur to start |
| Age | 18–55 |
| Language | Bengali (and English) |
| Detailed targeting | Keep it **broad**. Use general interests such as mobile apps, weather or news. Do **not** target by religion (see policy notes) |
| Placements | Advantage+ (automatic): Facebook feed, Stories, Reels, Instagram |
| Budget | Start small, for example ৳300–500 per day for 5–7 days, then raise it on the ad that gets the cheapest installs |
| Schedule | Evenings and Thursday–Friday usually work well in Bangladesh; also run ahead of Ramadan and Eid |
| Creatives | `fb_square` and `fb_story` first. Add `fb_feed` (Sehri/Iftar) from a few weeks before Ramadan |

These numbers are suggestions, not measured results. Judge your own campaign by **cost per install** in Play Console and **link clicks** in Ads Manager.

## Meta ad-policy notes (read before publishing)

- **Don't imply you know the viewer's religion or other personal attributes.** The texts talk about features ("নামাজের সময়, ইফতারের কাউন্টডাউন") and never ask "আপনি কি মুসলিম?". Keep it that way, and avoid religion-based targeting.
- No fake reviews, download counts or "সেরা / এক নম্বর" claims. Say only what the app does today.
- Don't use newspaper, TV or government logos or names as if affiliated. The pinned comment carries the no-affiliation note.
- The app says **free** and **no ads**, both true today. If either changes, update every ad.
- If an ad is rejected, open the reason in Ads Manager, edit the text or image, and resubmit.

## After it runs

- Check **Play Console → Statistics → Acquisition** for installs from `utm_source=facebook`.
- Turn off the weaker ad after a few days and move its budget to the better one.
- Reply to comments with the reply templates in `facebook-ads.md`; fast replies help ad performance and reviews.
- Ask happy users to rate the app on Google Play. Never offer rewards for ratings.
