import { FacebookAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import auth from '../firebase.init';


const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const useFirebase = () => {

    const [user, setUser] = useState({});

    const handleSignInWIthGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                setUser(user)
                console.log("User: ", user)
            }).catch((error) => {
                console.log("Error: ", error)
            });
    }

    const handleFacebookSignIn = () => {
        signInWithPopup(auth, facebookProvider)
            .then((result) => {
                const user = result.user;
                setUser(user)
                console.log("User: ", user)
            })
            .catch((error) => {
                console.log("Error: ", error)
            });
    }

    const handleSignOut = () => {
        signOut(auth).then(() => {
            setUser({})
        })
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            }
        });
    }, [])

    return { user, handleSignOut, handleSignInWIthGoogle, handleFacebookSignIn };

}

export default useFirebase; 