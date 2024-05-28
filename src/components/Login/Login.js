import { useContext, useState } from "react"
import logo from "../../../public/images/OLX-Symbol.png"
import { AuthContext, FirebaseContext } from "../../store/FirebaseContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email,setEmail]=useState('');
  const [password, setPassword] = useState("");
  const {firebase} = useContext(FirebaseContext);
  const {setUser} = useContext(AuthContext);
  const [error,setError]=useState();
  const navigate = useNavigate();
async function handleSubmit (e){
    e.preventDefault();
    try {
      const auth = firebase.getAuth();
      const result = await firebase.signInWithEmailAndPassword(auth,email,password);
      if(result){
        navigate("/",{replace:true});
      }

      await firebase.onAuthStateChanged(auth,(user)=>{
        if(user){
          setUser(user);
        }else{
          console.log("not logged In");
        }
      })
    } catch (error) {
      console.log(error.code);
      if(error.code ==="auth/invalid-email"||error.code ==="auth/missing-password"||error.code==="auth/invalid-credential"){
        setError("Invalid Credentials")
      }
    }
  }
  return (
    <div className="flex min-h-[100vh] h-[100%] w-[100%] items-center justify-center">
        <div className="border-2 border-black h-[65%] w-[20vw] p-8">
            <div className="h-28 pt-4 flex items-center justify-center">
                <img src={logo} alt="logo" className='h-[80%]'/>
            </div>
            <div className="flex flex-col my-3">
            <label>Email</label>
            <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your e-mail" className='border-2 border-[#002F34] rounded-md text-xs py-2 ps-3' />
            </div>
            <div className="flex flex-col my-3">
            <label>Password</label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password" className='border-2 border-[#002F34] rounded-md text-xs py-2 ps-3' />
            </div>
            {error && <p className='text-lg text-[#ff3939]'>{error}</p>}
            <div className="flex flex-col my-3">
                <button className='border-2 my-2 bg-[#002f34] text-white py-2 font-bold tracking-widest transition ease-in-out delay-350  hover:bg-white hover:text-[#002F34] hover:border-2 hover:border-[#002F34]' onClick={handleSubmit}>LOGIN</button>
                <button className="font-semibold tracking-wide" onClick={()=>navigate("/signup")}>SIGNUP</button>
            </div>
        </div>
    </div>
  )
}
export default Login