import { db, auth } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Moment from 'react-moment';

export default function ChatCard({ conversation, setChatId, users, currentChatId }) {
    const { uid } = auth.currentUser;

    const handleClick = (e) => {
        setChatId(conversation.id)
    }

    const conversationName = () => { 
        const currentName = auth.currentUser.displayName.split(" ")[0]
        return conversation.chat_name ? conversation.chat_name : conversation.members.filter(name => name !== currentName) 
    }

    const conversationAvatar = () => {
        const recipientId = conversation.membersId.filter(id => id !== uid)[0]
        const recipientUser = users.filter(user => user.id === recipientId)[0]
        if (conversation.id === "theMegaChat") {
            return "/DALLE_avatar.png"
        } else if (recipientUser) {
            return recipientUser.avatar
        } else {
            return "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
        }
    }

    const deleteChat = async () => {
        await deleteDoc(doc(db, 'messages', conversation.id));
    }
    
    return (
        <article className={currentChatId === conversation.id ? "chat-wrapper active" : "chat-wrapper"} onClick={handleClick} >
            <div className="card-left-wrapper">
                <img className="chat-img" src={conversationAvatar()} alt="" />
                <div className="message-preview-wrapper">
                    <h5 className="display-name">
                        {conversationName()}
                    </h5>
                    <span className="message-preview">{conversation.last_message}</span>
                </div>
            </div>
            <div className="card-right-wrapper">
                {conversation.id !== "theMegaChat" ?
                <button id="deleteChatBtn" onClick={deleteChat}>
                        <FontAwesomeIcon icon={faXmark} />
                </button>
                :
                null }
                <div className="time-received-wrapper">
                    <Moment fromNow className="card-time">{conversation.last_message_date && conversation.last_message_date.toDate()}</Moment>
                </div>
            </div>
        </article>
    )
}