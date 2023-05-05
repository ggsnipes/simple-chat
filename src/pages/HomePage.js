import './HomePage.css'
import ChatBox from '../components/ChatBox'
import Aside from '../components/Aside'
import { useState } from 'react'

export default function HomePage({ users }) {
    const [currentChatId, setCurrentChatId] = useState("theMegaChat")
    
    return (
        <main className='Main'>
            <Aside setChatId={ setCurrentChatId } currentChatId={currentChatId} users={ users } />
            <ChatBox chatId={ currentChatId }  users={users} />
        </main>
    )
    
}