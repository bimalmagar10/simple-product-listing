module.exports = {
  reactStrictMode: true,
  images: {
    domains:['postimg.cc'],
  },
  env: {
      TYPE:process.env.TYPE,
      PROJECT_ID:process.env.PROJECT_ID,
      PRIVATE_KEY_ID:process.env.PRIVATE_KEY_ID,
      PRIVATE_KEY:process.env.PRIVATE_KEY,
      CLIENT_EMAIL:process.env.CLIENT_EMAIL,
      CLIENT_ID:process.env.CLIENT_ID,
      AUTH_URI:process.env.AUTH_URI,
      TOKEN_URI:process.env.TOKEN_URI,
      AUTH_PROVIDER_X509_CERT_URL:process.env.AUTH_PROVIDER_X509_CERT_URL,
      CLIENT_X509_CERT_URL:process.env.CLIENT_X509_CERT_URL,
      DATABASE_URL:process.env.DATABASE_URL,
      NEXT_PUBLIC_APIKEY:process.env.NEXT_PUBLIC_APIKEY,
      NEXT_PUBLIC_AUTHDOMAIN:process.env.NEXT_PUBLIC_AUTHDOMAIN,
      NEXT_PUBLIC_PROJECTID:process.env.NEXT_PUBLIC_PROJECTID,
      NEXT_PUBLIC_STORAGEBUCKET:process.env.NEXT_PUBLIC_STORAGEBUCKET,
      NEXT_PUBLIC_MESSAGINGSENDERID:process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
      NEXT_PUBLIC_APPID:process.env.NEXT_PUBLIC_APPID,
      NEXT_PUBLIC_STRIPE_KEY:process.env.NEXT_PUBLIC_STRIPE_KEY
  }
}