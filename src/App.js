import './App.css';
import { auth } from "./firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Banner from './components/Banner'
import { useEffect, useState } from 'react';
import { GetUsers ,RegisterUser } from './utils/user';

function App() {
  
  const [users, setUsers] = useState(null)
  const [user] = useAuthState(auth);
  
  useEffect(()=> {
    GetUsers(setUsers)
    },[user])
    
  if(user && users){
    if(!users.map(user => (user.id)).includes(user.uid)){
     
      RegisterUser()
      }
    }
  
  return (
    <div className="App">
      {user && <Banner user={user}/>}
      {!user ? <LoginPage /> : <HomePage users={users} />}
    </div>
  );
}

export default App;
