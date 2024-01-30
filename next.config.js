await import("./src/env.js");
import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();

/** @type {import("next").NextConfig} */
const config = {
    // Allowed image domains
    images: {
        domains: [
          "platform-lookaside.fbsbx.com", //facebook
          "scontent-atl3-2.xx.fbcdn.net", //facebook
          "firebasestorage.googleapis.com", //firebase-storage
          "pbs.twimg.com", //twitter
          "utfs.io", // uploadthing
          "uploadthing.com", // uploadthing
          "avatars.githubusercontent.com", // github
          "cdn.discordapp.com", // discord
        ],
      },
};

export default withNextIntl(config);

