//import Firebase from 'firebase';
import Firebase from '@firebase/app'
import '@firebase/database'

let config = {    
    apiKey: "AIzaSyD5-gBn3YwTwRFnXCI6h4juZturdmwuD1I",
    authDomain: "sparepartsshop-bd4a4.firebaseapp.com",
    databaseURL: "https://sparepartsshop-bd4a4.firebaseio.com/"
}

let app = Firebase.initializeApp(config);
export const db = app.database();