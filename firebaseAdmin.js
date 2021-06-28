import * as admin from "firebase-admin";
 // const service ={
 // 	  "type":process.env.TYPE,
 // 	  "project_id":process.env.PROJECT_ID,
 // 	  "private_key_id":process.env.PRIVATE_KEY_ID,
 // 	  "private_key":process.env.PRIVATE_KEY,
 // 	  "client_email":process.env.CLIENT_EMAIL,
 // 	  "client_id":process.env.CLIENT_ID,
 // 	  "auth_uri":process.env.AUTH_URI,
 // 	  "token_uri":process.env.TOKEN_URI,
 // 	  "auth_provider_x509_cert_url":process.env.AUTH_PROVIDER_X509_CERT_URL,
 // 	  "client_x509_cert_url":process.env.CLIENT_X509_CERT_URL
 // };
import crypto from 'crypto';

import { encrypted } from './service-account.enc';

const algorithm = 'aes-128-cbc';
const decipher = crypto.createDecipheriv(
  algorithm,
  process.env.GOOGLE_ENCRYPTION_KEY,
  process.env.GOOGLE_ENCRYPTION_IV
);

export const getDecryptedSecret = () => {
  let decrypted = decipher.update(encrypted, 'base64', 'utf8');

  decrypted += decipher.final('utf8');

  return JSON.parse(decrypted);
};

export const verifyIdToken = token => {
	if(!admin.apps.length) {
        admin.initializeApp({
		  credential: admin.credential.cert(getDecryptedSecret()),
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