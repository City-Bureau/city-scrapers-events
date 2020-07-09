# City Scrapers Events

Static site that displays a calendar of the most recently scraped events from [City Scrapers](https://cityscrapers.org/) projects based off of the [`city-scrapers-template`](https://github.com/City-Bureau/city-scrapers-template/) repo. The site is served on [GitHub Pages](https://pages.github.com/) and was created with [`create-react-app`](https://github.com/facebook/create-react-app).

See the current site for the [`city-scrapers`](https://github.com/City-Bureau/city-scrapers/) repo here: [City Scrapers Events](https://city-bureau.github.io/city-scrapers-events/).

## Setup

You'll need a City Scrapers project that is writing output to a newline-delimited JSON file at a public URL (AWS S3 and Microsoft Azure Blob Storage are two supported output locations). You'll also need [Node](https://nodejs.org/en/) installed.

Create a copy of this repo, customize, and deploy it with these steps:

1. Generate a repo based on this one by clicking the "Use this template" button. This creates a new repo from this template instead of a fork because you'll likely want to manage your repo independently. Here's [more info on template repos from GitHub](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template).

2. Clone the new repo you generated (replacing the URL with your account/organization and the new repo name if you changed it):

   ```shell
   git clone https://github.com/{ACCOUNT}/city-scrapers-events.git
   ```

3. Install the dependencies you'll need to run the site:

   ```shell
   npm install
   ```

4. Replace the logo in `./src/logo.png` and update the values for `EVENT_SOURCE` and `REGION_OPTIONS` in [`./src/config.js`](./src/config.js) to match your output location and areas.

   - `EVENT_SOURCE` should be the public URL of your newline-delimited JSON file of results created by running `scrapy combinefeeds` in a City Scrapers project. Usually you'll want to use the file ending in `upcoming.json` and not `latest.json` to avoid loading a large amount of past meetings that users likely won't get to.
   - The `value` for each region option should be the location prefix used in scraper names (i.e. `chi` is used for Chicago scrapers like `chi_library`).

5. Run this command to view your site locally at [http://localhost:3000](http://localhost:3000) and make sure it's displaying events:

   ```shell
   npm start
   ```

6. After you're satisfied with your changes, be sure to commit them locally and then update the GitHub repo by running:

   ```shell
   git push origin main
   ```

7. Once you're ready to deploy the site, run:

   ```shell
   npm run deploy
   ```

   This will build your site, create a `gh-pages` branch if it doesn't already exist, and push it to your repo so that it can be deployed on GitHub Pages. After this command is finished you should be able to see your site live at `https://{ACCOUNT}.github.io/{REPONAME}`. You'll need to run this command any time you want changes to be displayed on the site.

## City Scrapers

If you're interested in setting something like this up for your area but aren't sure where to start you can learn more about City Scrapers at [https://cityscrapers.org/](https://cityscrapers.org/).

## License

This application is open source code under the [MIT license](LICENSE).
