import { useState,useContext  } from "react";
import logo from "../../../public/images/OLX-Symbol.png"
import { FirebaseContext } from "../../store/FirebaseContext";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [username,setUsername]=useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState('');

  const {firebase,firestore,db} = useContext(FirebaseContext);
  const navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    try {
      if(!username||!mobile){
        setError('Please fill all the fields');
      }else{
        const auth = firebase.getAuth();
        const result = await firebase.createUserWithEmailAndPassword(auth,email,password);
        await firebase.updateProfile(auth.currentUser,{displayName:username});
        await firestore.addDoc(firestore.collection(db,"users"),{
          id:result.user.uid,
          username:username,
          mobile:mobile
        });
        navigate('/login',{replace:true});
      }
    } catch (error) {
      console.log(error);
      if(error.code==='auth/invalid-email'){
        setError("Invalid Email")
      }
      if(error.code==='auth/weak-password'){
        setError("Password musth be atleast 6 characters");
      }
      if(error.code==="auth/missing-email"){
        setError("Please enter email")
      }
      if(error.code==="auth/email-already-in-use"){
        setError("Email already used")
      }
    }
  }

  return (
    <div className="flex min-h-[100vh] h-[100%] w-[100%] items-center justify-center">
        <div className="border-2 border-black h-[75%] w-[20vw] p-8">
            <div className="h-28 pt-4 flex items-center justify-center">
                <img src={logo} className="h-[80%]" alt="" />
            </div>
            <div className="flex flex-col my-3">
            <label>Username</label>
            <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Enter your username" className='border-2 border-[#002F34] rounded-md text-xs py-2 ps-3'/>
            </div>
            <div className="flex flex-col my-3">
            <label>Email</label>
            <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your e-mail" className='border-2 border-[#002F34] rounded-md text-xs py-2 ps-3'/>
            </div>
            <div className="flex flex-col my-3">
            <label>Mobile</label>
            <input type="number" value={mobile} onChange={(e)=>setMobile(e.target.value)} placeholder="Enter your mobile number" className='border-2 border-[#002F34] rounded-md text-xs py-2 ps-3'/>
            </div>
            <div className="flex flex-col my-3">
            <label>Password</label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password" className='border-2 border-[#002F34] rounded-md text-xs py-2 ps-3'/>
            </div>
            {error && <p className='text-lg text-[#ff4646]'>{error}</p>}
            <div className="flex flex-col my-3">
                <button className='border-2 my-2 bg-[#002f34] text-white py-2 font-bold tracking-widest transition ease-in-out delay-350  hover:bg-white hover:text-[#002F34] hover:border-2 hover:border-[#002F34]' onClick={handleSubmit}>SIGNUP</button>
                <button className='font-semibold tracking-wide' onClick={()=>navigate("/login")}>LOGIN</button>
            </div>
        </div>
    </div>
  )
}
export default Signup