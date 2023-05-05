import "./Message.css"
import { auth, db } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Moment from 'react-moment';

export default function Message({ message, chatId }) {
    const { uid } = auth.currentUser;

    const deleteMessage = async (e) => {
        await deleteDoc(doc(db, `/messages/${chatId}/message_list`, message.id))
    }  
    
    return (
        <div className={message.uid === uid ? "Message message-owner" : "Message"}>
            <section className="left">
                <span className="message-name">{message.name}</span>
                <span>{message.text}</span>
            </section>
            <section className="right">
                <Moment fromNow className="time-sent">{message.createdAt && message.createdAt.toDate()}</Moment>
                { message.uid === uid ? 
                <button id="deleteMsgBtn"  onClick={deleteMessage} className="delete-btn" value={message.text}>
                <FontAwesomeIcon icon={faXmark} />
                </button>
                :
                ""
                }
            </section>

        </div>
    )
}