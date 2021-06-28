import * as admin from "firebase-admin";
// const service ={
// 	  "type": process.env.TYPE,
// 	  "project_id": process.env.PROJECT_ID,
// 	  "private_key_id": process.env.PRIVATE_KEY_ID,
// 	  "private_key": process.env.PRIVATE_KEY,
// 	  "client_email":  process.env.CLIENT_EMAIL,
// 	  "client_id": process.env.CLIENT_ID,
// 	  "auth_uri": process.env.AUTH_URI,
// 	  "token_uri": process.env.TOKEN_URI,
// 	  "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
// 	  "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL
// };
const serviceAccount = {
  "type": "service_account",
  "project_id": "product-listing-3f9ae",
  "private_key_id": "f4cc524cd285c29c02f5ef90f5c26c7e48403425",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC9L7SN/MoRNnRT\ntOSA7hHl56VXWa1HYEi+Lbzdmo6A8urHtq9jYTs0NGIjccK2Lgkum8LAmBb7HRXy\nlnKoThPY7MUbmblPYQgEdqUXk415vJ1+PM0sVW2z/+xNhe8arQ3Cdawl0RrRZLqV\n4/jiTNGGNVykpUdyifkVJVfYkZTJ34rAgU5QaceP03qiPyti6My9InZmhdXvmPYu\nGvIuqA4C24e7/arc63wqnPz+PYbd3B1D4pFQcoNFkh0mpALh53eIyZ2KuMIloigo\n1KP11NUQmvQTtmnIFSK+5YVVHdxAP8FPFPzobjy/iDVBRtDt9csG4cgDZK6HDKJW\nrT6EjGbDAgMBAAECggEAWs9lWap3zB9ZYzy3WnPsP3Eb2nv/Qv2irTcDK1QfByKT\nM94q/gcUBhEG8oCOuCgM3ESEDTJ0BYGGoXU6ADPKLxwn2QHHA6VN1ealhFWdWUwC\nRTAmRBuVlwtHgEbD6QgcTLVzNovS1aQGNCDDvMym3kcK+zUiwIYd+9p6+keXJfbE\n+aJ/DKZdWl5gw8BfC31wlOyeWwr8VO+01CwtV3ShH6yt0mS4NlVNY3raAbZPuObS\nBsfsGqYVl3TAIExEi4GPtpJOJTTAmplXyeNkoIba0exkDcsHe5BCyiEz4CJUxLv/\nJMJENFq7dEwOaa62Q55rb43xRCiNlfV26kozS3b+sQKBgQD1azskjOFc9Zfw9GnK\nll9Kc7JBSHmOvQIpKI0QakqH715EWtD8G9KSrYl9u+W134dgI8kr38gAiYlPxln9\nWpmDYCwJz8Gs0aFzerw0scHd80nyJLcABguMaqE63hTdvq0TNRvzzImBHkwkkQ1f\nB9w/XB0eKuyRbNhI1YAklHx0pQKBgQDFV9E/21lUtKqcKsnyNPljJgdqEJwP/b3d\nSDYP9dwgoJ4DkfsaHcZhYpPRk6+tUtic60j6ppoiqbiyYe4GT8VkFdl7Ysrle6Jq\n7MvFpDwl5pZ46EAyOHYYH9vykMPpsnmiAKLpxfNI8W3IFbGseOaYGhUj1LYDGx+n\n+Lpo+aFJRwKBgAmoXZxzms7Ar2kBBUS+pCNW6DXfd0EhuPsLqHlz5VjyF4CTHlQ9\neAzjnVyAT2rX0Aj9f4YleUZkIy4rfREWRqI/35vHPDTjzvmvY8ajFCD62PcZcMYk\ndsHg1FVvtdyAC2mNFnuCmgqluZNaze7mbUllA5RTVhnm8Z/0HuXRnhAtAoGAR1sO\nlWlp7p/5BMjQBp0zA6/PhIGG/J1CVs3yhmje9Ik/OYlCY1oazkHHs0MUhbZsDqlg\n1QkCuL/nwdB5MZ0MgbkIz32UYdAHlWQT9l4BRa8P/53zAHW79dMnQ5kmzcy0AGj8\nf00NP/XUPUHi4btBngPoWvFh8tOO6bydIrIIqKcCgYEAooZnUQZbNvNspUUieXEn\n2pXirDZ0cWHlTK5FX/X4cG/FJ73tsi+OLrEB+/lEPQc0mRExBt601VmSb+//xR63\nvOa50ffk/L4Mh+MAaxwIW5FDyzqvyOSfUTuaV50DF38jRWcPTm1jH2ezqqGUfxVa\nwLwAKaLTwIm9afYokeR33/w=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-tjbd7@product-listing-3f9ae.iam.gserviceaccount.com",
  "client_id": "113340568961442580639",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-tjbd7%40product-listing-3f9ae.iam.gserviceaccount.com"
};

export const verifyIdToken = token => {
	if(!admin.apps.length) {
        admin.initializeApp({
		  credential: admin.credential.cert(serviceAccount),
		  databaseURL:process.env.DATABASE_URL
		})
	}
	return admin
	.auth()
	.verifyIdToken(token)
	.catch(error => {
		throw error;
	});
};