import { Container } from "./SignUp.style"
import BackgroundImage from "../../components/BackgroundImage"
import Header from "../../components/Header"
import { useState } from "react"
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { firebaseAuth } from "../../utils/firebase-config"
import { useNavigate } from "react-router-dom"

interface FormValues {
  email : string;
  password : string
}

export default function SignUp() {

  const navigate = useNavigate()

  const [showPassword,setShowPassword] = useState<Boolean>(false)
  const [formValues,setFormValues] = useState<FormValues>({
    email : "",
    password : ""
  })

  const handleSignIn = async ()=> {
    try {
      const {email,password} : FormValues = formValues
      await createUserWithEmailAndPassword(firebaseAuth,email,password)
      
    } catch (error) {
      console.log(error)
    }
  }

  onAuthStateChanged(firebaseAuth,(currentUser)=>{
    if(currentUser) navigate("/")
  })

  return (
    <Container showpassword={showPassword.toString()}>
      <BackgroundImage />
      <div className="content">
        <Header login={true} />
        <div className="body flex column a-center j-center">
          <div className="text-flex column">
            <h1>Unlimited movies, TV shows and more</h1>
            <h4>Watch anywhere. Cancel anytime.</h4>
            <h6>Ready to Watch? Enter your email to create or restart membership</h6>
          </div>
          <div className="form">
            <input 
              type="email" 
              placeholder="Email Address" 
              name="email" 
              value={formValues.email} 
              onChange={(e)=>
                setFormValues(()=>({...formValues,email : e.target.value}))
              }
            />
            {
            showPassword ? 
              <input 
                type="password" 
                placeholder="Password" 
                name="password" 
                value={formValues.password} 
                onChange={(e)=>
                  setFormValues(v=>({...formValues,password : e.target.value}))
                } 
              /> 
              : ""
            }
            {
              !showPassword ? <button onClick={()=>setShowPassword(true)}>Get Started</button> : "" 
            }
          </div>
          <button onClick={handleSignIn}>Sign Up</button>
        </div>
      </div>
    </Container>
  )
}
