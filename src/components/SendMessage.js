import { useState } from 'react'
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp, updateDoc, doc } from "firebase/firestore";
import './SendMessage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

export default function SendMessage({ chatId , scollToRef  }) {
  const [message, setMessage] = useState("")

  const sendMessage = async (e) => {
    e.preventDefault()
    const { uid, displayName, photoURL } = auth.currentUser;
    await addDoc(collection(db, `/messages/${chatId}/message_list`), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
    });
    

    const messageRef = doc(db, "messages", chatId);
    await updateDoc(messageRef, {
      last_message: message.slice(0, 25) + "...",
      last_message_date: serverTimestamp()
    });
    setMessage("");
    scollToRef.current.scrollIntoView()
    
  }
  
  return (
      <form onSubmit={(e) => sendMessage(e)} className="SendMessage">
        <label htmlFor="messageInput" hidden>
        Enter Message
        </label>
        <input
          id="messageInput"
          name="messageInput"
          type="text"
          className="form-input__input"
          placeholder="type message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button disabled={message ? false : true } type="submit" id='sendMessageBtn'>
        <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
  )
}