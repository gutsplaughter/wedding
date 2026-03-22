# Wedding Website
A redesigned wedding website. Forked from [Ram Patra's Wedding Website](https://github.com/rampatra/wedding-website).

RSVP invite code: `271117`

# Highlights
1. __RSVP feature__ which directly uploads data to a Google sheet.
2. __Receive email alerts__ when someone RSVPs.
3. __Add to Calendar__ feature which supports four different calendars.
4. A __Youtube video__ showcasing the venue.
5. __Google Map__ showing the venue's location.

# Getting Started
1. `$ git clone https://github.com/rampatra/wedding-website.git` - clone this project to your computer
2. `$ cd wedding-website` - go inside the project directory
3. `$ npm install` - install dependencies
4. `$ gulp` - compile sass to css, minify js, etc.
5.  Open `index.html` file on your browser by just double-clicking on it.
6.  See below for more configuring options!

# Documentation

1.   Linking RSVP section to Google Sheets: https://blog.rampatra.com/wedding-website

2.   Deploying a website w/ private GitHub repo, Cloudflare (Domains + Workers & Pages), and added website password protection --

2A.  Setting your private GitHub repository:
   - Create a new repo (or fork an existing one), you are not limited to the naming scheme required by GitHub Pages.
   - Upload your files to the repo.
   - At the bottom of the repo settings you can set the visibility to private.

2B.  Configuring Cloudflare Domains: [https://dash.cloudflare.com/<USER>/home/domains (<USER> is custom account user ID)]
   - Purchase your domain with Cloudflare.
   - Ensure your purchased domain is onboarded on Cloudflare.
   - Copy the functions directory from this repo (https://github.com/Charca/cloudflare-pages-auth) and paste into your current project's root directory.
      - OPTIONAL: Replace the _middleware.ts and cfp_login.ts files in the original repo with the ones in this repo. This enables multi-password authentication for the website w/ ',' delimiter.
   - Make sure your .html file is in the /src folder

2C.  Configuring Cloudflare Workers & Pages: [https://dash.cloudflare.com/<USER>/home/workers-and-pages (<USER> is custom account user ID)]
   - Create a new application. Under the "Pages" tab, import an existing Git repository. Log in to your GitHub account w/ OAuth and select the repository you want to link. Before clicking Save and Deploy, perform the following:
      1. update the Build settings (FOR SVELTE(?)):
            Build command: npm run build
            Build output: build
            Root directory:
            Build comments: Enabled
         update the Build settings (FOR GULP):
            Build command: npm run build
            Build output:
            Root directory:
            Build comments: Enabled
      2. Add an environment variable: Variable_Name=CFP_PASSWORD; Value=<YOUR_PASSWORD>
         OPTIONAL: If you've updated _middleware.ts and cfp_login.ts, you can set a <YOUR_PASSWORD> value to use multiple passwords, such as HI,HEY,HI THERE to have three working passwords.
      3. If using Gulp, make sure your package.json has at least lines (for Cloudflare to call Gulp):
         "scripts": {
            "build": "gulp",
         }
   - Now click Save and Deploy. This should create a new application.
   - In the application settings, under the Settings tab, perform the following:
      1. Update Fail open/closed to 'Fail closed'. This will protect (close down) your site when the daily function request limit is reached, instead of opening it up.

2D.  Configuring Cloudflare subdomain:
   - In Workers & Pages, in your application, under the Custom domains tab, click "Set up a custom domain."
   - Add & activate two custom domains:
      1. no subdomain (ex: eliseandryanaregettingmarried.com)
      2. www subdomain (ex: www.eliseandryanaregettingmarried.com)
   - After activation, Cloudflare should be setting up DNS. To finalize, perform the following:
      1. On the far right side of any custom domain, right click on the ... and click "Manage Cloudflare DNS."
      2. Under DNS management, ensure at least both are showing. If not, you need to "Add record":
         no subdomain: Type=CNAME; Name=<DOMAIN_NAME>; Content=<APPLICATION_NAME>; Proxy_Status=Proxied; TTL=Auto
         www subdomain: Type=CNAME; Name=www; Content=<APPLICATION_NAME>; Proxy_Status=Proxied; TTL=Auto
      where, for example:
         <DOMAIN_NAME> = eliseandryanaregettingmarried.com (the domain name you bought)
         <APPLICATION_NAME> = cloudflareauthtest.pages.dev (the application name you created)

**   Conclusion:
   - DNS should now be verified.
   - Your website should be working on no subdomain and www subdomain.
   - Your website should be multi-password protected.
   - Every new change pushed to your selected branch will update your website automatically.

**   Extra Notes:
   - Changes may take up to 24 hours to propagate; once complete, your website should be accessible via your custom domain.
      - In the meantime, you can view whether the DNS record is configured correctly with the Linux dig command:
         dig WWW.EXAMPLE.COM +nostats +nocomments +
         *You do require Linux (you can do this on WSL after installing the dig package)
   - To further develop the password protection page, make changes in the respective TypeScript files and view your changes in the browser, run the following lines in CMD (cd in root directory):
      - npm install -g wrangler
      - npx wrangler pages dev build -b CFP_PASSWORD=test
   - ADD ON: You can create a local server (BrowserSync) to access which can live reload your page with new changes.
      - npm install browser-sync --save-dev
      - npm install dotenv
      - run "gulp" in terminal. It will open a browser tab showing your website live view.
      - ***By default, adding BrowserSync will cause Cloudflare compilation to fail. The LOCAL_DEV conditional in the gulpfile prevents Cloudflare from running it, as long as you have dotenv installed w/ npm.