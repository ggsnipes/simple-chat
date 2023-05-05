import { useState } from "react";
import { createNewChat } from "../utils/utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons'

export function ChooseRecipient({ setIsNewChat, setUpdateConvoList }){
    const [recipientId, setRecipientId] = useState("")

    const handleSubmit = e => {
        e.preventDefault()
        createNewChat(recipientId).then(res => setUpdateConvoList( prev => !prev))
        
        setRecipientId("")
        setIsNewChat(false)
        
    }

    return (
        <div className="ChooseRecipient">
            <form onSubmit={handleSubmit}>
                <input onChange={e => setRecipientId(e.target.value)} placeholder="Enter recipient's user ID" type="text" name="" id="enterRecipient" />
                <button id="newChatSubmitBtn"><FontAwesomeIcon icon={faSquarePlus} size="1x" /></button>
            </form>
        </div>
        )
}