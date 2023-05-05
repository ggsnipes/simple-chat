# simple chat

A basic instant messaging client powered by **React.js** & **Firebase** and created with *love* by a couple of GA students.

[Check it out!](https://unsafe-chat.web.app/)

**Read below if you're curious about the development process.**

<sub>**TLDR:** *A short story about losing one's NoSQL database virginity.*</sub>

# Planning process

The biggest challenge building this app was the data structure for storing messages & users. None of us had used Firebase/Firestore before and we were all more familiar with SQL databases. Consequently it took as a few refactors to get a data structure that worked well for us.

## Wireframe for UI
![Screenshot](https://github.com/mountmike/simple-chat/blob/main/public/wireframe1.png)

## Colour pallet for UI
![Screenshot](https://github.com/mountmike/simple-chat/blob/main/public/colours.png)

## Data Model

![Screenshot](https://github.com/mountmike/simple-chat/blob/main/public/datamodel1.png)


### Messages collection
````   
messages: {
    CHAT_ID: {
        chat_name: "The Mega Chat",
        id: "theMegaChat"
        group_chat: true,
        last_message: "hi everyone",
        last_message_date: 23 April 2023 at 20:13:35
        members: [
            "Mike",
            "Amal",
            "Simon
        ],
        membersIds: [
            "7SUwybd14MN880Ao6DgFru11Ghz2",
            "QHE9yI6OwfWaFqLdlEielrdQaPv2",
            "Pazs7qLhqUOh5WaE0oIoHc6yZhG3"
        ]
        message_list: COLLECTION (see below)
    }
}

````
### Message_list collection (nested inside each chat document)
````   
message_list: {
    MESSAGE_ID: {
        avatar: "https://avatar-url.png",
        createdAt: 23 April 2023 at 21:13:35,
        name: "Mike",
        uid: "Yr48LUY1a1N3M4F2JIDnVVVmrt32",
        test: "hi everyone"
    }
}

````

### Users collection
````   
users: {
    USER_ID: {
        avatar: "https://avatar-url.png",
        email: "mike@email.com",
        name: "Mike Tharratt",
        userName: "Mike",
        conversation_list: [
            "7SUwybd14MN880Ao6DgFru11Ghz2",
            "QHE9yI6OwfWaFqLdlEielrdQaPv2",
            "Pazs7qLhqUOh5WaE0oIoHc6yZhG3"
        ]
    }
}
````

## Planing Pt.2

The inital version of the app created a single group chat that anyone could join but we wanted something a little more sophisticated so after returning to the drawing board with the data structure we started building again. Below is the initial psuedocode for managing multiple conversations with different people:

1. On signup => add user to users collection in db and create them a 'conversations' array.
2. On login => make a query to users collection and populate conversationList state with conversations which passes down to the `<Aside>` component.
3. Then, in `<Aside>` make a db call with the list of conversation IDs and store an array of objects in a state that contains the metainfo for each convo.
4. Add to UI a feature that clicking on a <ChatCard> sets the currentChatId to the target.value and then the <ChatBox> should re-render with that convo.
5. Create function for "new chat" button that pushes a new chatID to the db > users > [conversations] and sets currentChatId to that value.

  
## Additional features were then added:
- Ability to delete messages once they are sent.
- Ability to delete conversations once they are created.
- Displaying the date/time a message was sent in a reasonable fashion.
- Updating the conversation document with metadata for every message sent so the "last_message" & "last_message_date" fields would populate and fill in the conversation cards.

## Planing Pt.3

At this stage our app was starting to feel more like a chat app that we were setting out to create, however there was some spaghetti surrounding some of our db querries and plenty of bugs to boot. Heading back to the drawing board for the 3rd time and reading through some more Firestore documentation, I decided to restructure some queries. Most notably was using a real time listener on the **messages** collection to grab messages where the "membersid" array contained the current user ID. This was far more efficient and enabled a lot of simple features that one would expect in an app like this such as new messages coming through instantly and arranging themselves in the `<aside>` from most recently received.

## Future features:
- ability to create new group chats
- editing user profiles
- Search function in `<aside>` for filtering conversations.
- Add notifications type functionality to make it clear when a new message is recieved.
- managing contacts/friends list
- sending images/emojis

## Contributors:

- Mike: https://github.com/mountmike
- Simon: https://github.com/Squshedfrog
- Amal: https://github.com/ggsnipes