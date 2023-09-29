/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig


module.exports = {
  env: {
    APIKEY: process.env.APIKEY,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    PROJECT_ID: process.env.PROJECT_ID,
    STORAGE_BUCKET: process.env.STORAGE_BUCKET,
    MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
    APP_ID: process.env.APP_ID,
    API_BACKEND: process.env.API_BACKEND,
    PASS: process.env.PASS,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    UPLOAD_PRESET: process.env.UPLOAD_PRESET
  }
};

