import { auth } from "../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { GoogleAuthProvider, signInWithRedirect, signInWithPopup } from "firebase/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'


export default function LoginPage() {
  const [user] = useAuthState(auth);

  const googleSignUp = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
    };  
    
  return (
    <main className="sign-page">
      <div className="sign-wrapper">
        <h3>simple chat</h3>
        <p>A basic instant messaging app powered by React.js & Firebase</p>
        <div id="darkline"></div>
          <button id="loginBtn" className="sign-out" onClick={googleSignUp}>
            <img className="login-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="" srcset="" />
            <span>Sign in with Google</span>
          </button>
      </div>
    </main>
    
  )
}