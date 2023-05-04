import "./Aside.css"
import { auth } from "../firebase";
import ChatCard from './ChatCard'
import { ChooseRecipient } from "./ChooseRecipient";
import ProfileHeader from './ProfileHeader'
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { query, collection, orderBy, onSnapshot, where } from "firebase/firestore";



export default function Aside({ setChatId, currentChatId, users }) {
    const { uid, displayName, photoURL } = auth.currentUser;
    const [conversationList, setConversationList] = useState(null) // list of user conversations id
    const [isNewChat, setIsNewChat] = useState(false) // for toggling the conditional rendering of the new chat ID input


    useEffect(() => {
        const q = query(collection(db, "messages"), where("membersId", "array-contains", uid), orderBy("last_message_date", "desc"), );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let conversations = [];
            querySnapshot.forEach((doc) => {
                conversations.push(doc.data());
            });
            setConversationList(conversations)
        });
        
    }, []);

    
    return (
        <aside className="Aside">
            <ProfileHeader setChatId={setChatId}  users={users} setIsNewChat={setIsNewChat}/>

           {isNewChat && <ChooseRecipient setIsNewChat={setIsNewChat} />}

            <section className="chat-list" >
                
                {conversationList?.map(conversation => (
                   <ChatCard 
                   key={conversation.id} 
                   conversation={conversation} 
                   setChatId={setChatId} 
                   currentChatId={currentChatId}
                   setConversationList={setConversationList}
                   conversationList={conversationList}
                   users={users}
                   />
                ))}

            </section>
        </aside>
    )
}