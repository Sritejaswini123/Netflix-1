import {createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import Header from "./Header"
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase"
import {useState,useRef} from "react"
import {checkValidData} from "../utils/validate"
import {updateProfile} from "firebase/auth"
const Login=()=>{
    const [isSignInForm,setisSignInForm]=useState(true)
    const [errormsg,setErrorMsg]=useState(null)
    const navigate=useNavigate()
    const email=useRef(null)
    const password=useRef(null)
    const handleButtonClick=()=>{
        const msg=checkValidData(email.current.value,password.current.value)
        setErrorMsg(msg)
        if(msg) return;
        if(!isSignInForm){
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    const user = userCredential.user;
    
    updateProfile(auth.user, {
      displayName: "Lokesh", photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(() => {
    }).catch((error) => {
      setErrorMsg(error)
    });
    navigate("/browse")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMsg(errorCode+"-"+errorMessage)
  });

        }
        else{
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    const user = userCredential.user;
    navigate("/browse")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMsg(errorCode+"-"+errorMessage)
  });
        }
    }
    const toggleSignInForm=()=>{
        setisSignInForm(!isSignInForm)
    }
    return(
        <div>
            <Header/>
            <div className="fixed md:absolute">
            <img className="h-screen object-cover md:w-screen" src="https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e0-ecd7979cc88b/a3873901-5b7c-46eb-b9fa-12fea5197bd3/IN-en-20240311-popsignuptwoweeks-perspective_alpha_website_large.jpg"
            alt="bgimage"/>
            </div>
            <form onSubmit={(e)=>e.preventDefault()} className="absolute w-2/3 md:w-3/12 p-12 my-40 mx-auto bg-black bg-opacity-80 text-white right-0 left-0">
                <h1 className="font-bold m-3 text-2xl">{isSignInForm ? "Sign In":"Sign Up"}</h1>
                {!isSignInForm && (
                    <input type="text" 
                    placeholder="Full Name" 
                    className="w-full p-3 my-2 bg-black bg-opacity-0 border border-solid border-white rounded-md"/>
                    )}
                <input ref={email} type="text" placeholder="Email" className="w-full p-3 my-2 bg-black bg-opacity-0 border border-solid border-white rounded-md"/>
                <input ref={password} type="password" placeholder="Password" className="w-full my-2 p-3 bg-black bg-opacity-0 border border-solid border-white rounded-md"/>
                <p className="text-red-500 font-bold">{errormsg}</p>
                <button className="rounded-lg py-4 my-4 bg-red-600 w-full" onClick={handleButtonClick}>{isSignInForm ? "Sign In":"Sign Up"}</button>
                <p className="p-2 text-center">{isSignInForm&& "OR"}</p>
                <p className="text-center cursor-pointer m-2 p-2" onClick={toggleSignInForm}>
                {isSignInForm ? "New to Netflix❔Sign Up":"Already A User,  Sign In"}</p>
                <p className="text-center m-2 p-2">{isSignInForm && "Forgot Password ?"}</p>
                <p className="text-xs text-center m-2 p-2">{isSignInForm && "This page is protected by Lok! to ensure you're not a bot."}</p>
            </form>
        </div>
    )
}
export default Login