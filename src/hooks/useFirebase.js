import { FacebookAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import auth from '../firebase.init';


const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const useFirebase = () => {

    const [user, setUser] = useState({
        name: "",
        email: "",
    });

    const handleSignInWIthGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                const newUser = {
                    name: user.displayName,
                    email: user.email
                }
                setUser(newUser)
                console.log("User: ", user)
            }).catch((error) => {
                console.log("Error: ", error)
            });
    }

    const handleFacebookSignIn = () => {
        signInWithPopup(auth, facebookProvider)
            .then((result) => {
                const user = result.user;
                const newUser = {
                    name: user.displayName,
                    email: user.email
                }
                setUser(newUser)
                console.log("Facebook User: ", user)
            })
            .catch((error) => {
                console.log("Error: ", error)
            });
    }

    const handleSignOut = () => {
        signOut(auth).then(() => {
            const newUser = {
                name: "",
                email: ""
            }
            setUser(newUser)
        })
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const newUser = {
                    name: user.displayName,
                    email: user.email
                }
                setUser(newUser)
            } else {
                const newUser = {
                    name: "",
                    email: ""
                }
                setUser(newUser)
            }
        });
    }, [])

    return { user, handleSignOut, handleSignInWIthGoogle, handleFacebookSignIn };

}

export default useFirebase; 