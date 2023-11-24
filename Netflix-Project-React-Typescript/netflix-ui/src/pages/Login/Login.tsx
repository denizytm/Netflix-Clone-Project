import { Container } from "./Login.style"
import BackgroundImage from "../../components/BackgroundImage"
import Header from "../../components/Header"
import { useState } from "react"
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { firebaseAuth } from "../../utils/firebase-config"
import { useNavigate } from "react-router-dom"

interface FormValues {
  email : string;
  password : string
}

export default function Login() {

  const navigate = useNavigate()

  const [showPassword,setShowPassword] = useState<Boolean>(false)
  const [formValues,setFormValues] = useState<FormValues>({
    email : "",
    password : ""
  })

  const handleLogIn = async ()=> {
    try {
      const {email,password} : FormValues = formValues
      await signInWithEmailAndPassword(firebaseAuth,email,password)

    } catch (error) {
      console.log(error)
    }
  }

  onAuthStateChanged(firebaseAuth,(currentUser)=>{
    if(currentUser) navigate("/")
  })

  return (
    <Container>
      <BackgroundImage />
      <div className="content">
        <Header login={false} />
        <div className="form-container flex column a-center j-center">
          <div className="form flex column a-center j-center">
            <div className="title">
              <h3>Login</h3>
            </div>
            <div className="container flex column">
              <input 
                type="email" 
                placeholder="Email Address" 
                name="email" 
                value={formValues.email} 
                onChange={(e)=>
                  setFormValues(()=>({...formValues,email : e.target.value}))
                }
              />
              <input 
                type="password" 
                placeholder="Password" 
                name="password" 
                value={formValues.password} 
                onChange={(e)=>
                  setFormValues(v=>({...formValues,password : e.target.value}))
                } 
              /> 
            <button onClick={handleLogIn} >Log In</button> 
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
