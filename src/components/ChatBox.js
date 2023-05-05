import './ChatBox.css'
import Message from '../components/Message'
import MessageHeader from './MessageHeader'
import SendMessage from '../components/SendMessage'
import { useEffect, useRef, useState } from "react";
import { query, collection, orderBy, onSnapshot, limit} from "firebase/firestore";
import { db } from "../firebase";

export default function ChatBox({ chatId, users }) {
    const [messages, setMessages] = useState([]);
    const scollToRef = useRef()

    useEffect(() => {
        const q = query(
          collection(db, `/messages/${chatId}/message_list`),
          orderBy("createdAt", "desc"),
          limit(50)
        );
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
          let messages = [];
          QuerySnapshot.forEach((doc) => {
            messages.push({ ...doc.data(), id: doc.id });
          });
          setMessages(messages.reverse())
        });
        return () => unsubscribe;
        
      }, [chatId]);
    
    useEffect(() => {
      scollToRef.current.scrollIntoView()
    }, [messages])

    return (
        <section className="ChatBox">
          <MessageHeader chatId={chatId} users={users} />
          <div className="messages-wrapper">
            
          {messages?.map((message) => (
              <Message chatId={chatId} key={message.id} message={message} />
              
            ))
            
            }

              <span ref={scollToRef}></span>
          </div>
           
              <SendMessage scollToRef={scollToRef} chatId={chatId} />
                      
        </section>
    )
}