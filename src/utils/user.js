import { query, collection, doc , onSnapshot, setDoc} from "firebase/firestore";
import { auth, db } from "../firebase";


export function GetUsers( setUsers ) {
    const q = query(
      collection(db, `/users`),
    );
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let users = [];
    QuerySnapshot.forEach((doc) => {
      users.push({ ...doc.data(), id: doc.id });
    })
    setUsers(users);
    });
    return () => unsubscribe;
  }


  
export async function RegisterUser(){
  console.log('Added user to db');
  const { uid, displayName, photoURL ,email } = auth.currentUser;
      await setDoc(doc(db, `users`, uid ), {
      name: displayName,
      avatar: photoURL,
      conversations: ["theMegaChat"],
      userName: displayName.split(' ')[0].charAt(0).toUpperCase() + displayName.split(' ')[0].slice(1) ,
      email : email
    });
}


export function GetUsersConversations(){


  
}

export function updateUser(){


}