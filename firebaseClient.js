import firebase from "firebase";
 const FIREBASE_CONFIG = {
 	 apiKey:process.env.NEXT_PUBLIC_APIKEY,
 	 authDomain:process.env.NEXT_PUBLIC_AUTHDOMAIN,
 	 projectId:process.env.NEXT_PUBLIC_PROJECTID,
 	 storageBucket:process.env.NEXT_PUBLIC_STORAGEBUCKET,
 	 messagingSenderId:process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
 	 appId:process.env.NEXT_PUBLIC_APPID,
 };
export default function firebaseClient(){
	if(!firebase.apps.length){
		firebase.initializeApp(FIREBASE_CONFIG);
	}
}