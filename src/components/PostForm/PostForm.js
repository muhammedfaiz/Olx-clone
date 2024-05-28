import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext, FirebaseContext } from "../../store/FirebaseContext";
import { uploadBytes,ref,getDownloadURL } from "firebase/storage";
import firebase from "firebase/compat/app";

const PostForm = () => {
  const [error,setError]=useState('');
  const [prodName, setProdName] = useState("");
  const [category, setCategory] = useState("Cars");
  const [Description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState(null);
  const [loading,setLoading]=useState(false);

  const navigate = useNavigate();
  const {firestore,db,storage} = useContext(FirebaseContext);
  const {user} = useContext(AuthContext);
  const handlePost = ()=>{
    if(!prodName||!category||!Description||!location||!price||!images){
      setError("Please fill all the fields");
    }else{
      setLoading(true);
      const currDate = Date.now();
      const date = new Date();
      const storageRef = ref(storage,`productimages/${currDate+images.name}`);
      uploadBytes(storageRef,images).then((data)=>{
        getDownloadURL(ref(storage,`productimages/${currDate+images.name}`))
        .then(async(url)=>{
          await firestore.addDoc(firestore.collection(db,'products'),{
            name:prodName,
            category:category,
            description:Description,
            location:location,
            price:price,
            image:url,
            userId:user.uid,
            date:date.toDateString()
          })
        });
        setLoading(false);
        navigate("/");
      }).catch((err)=>{
        console.log(err);
      })
    }
  }
  return (
    <div className="flex min-h-[100vh] h-[100%] w-[100%] items-center justify-center py-32">
        <div className="border-2 border-black h-[75%] w-[70%] p-8">
            <div className="pt-2 flex items-center justify-start">
                <h3 className="text-3xl font-semibold">CREATE POST</h3>
            </div>
            <div className="flex flex-col my-3 w-[50%]">
            <label>Product Name</label>
            <input type="text" value={prodName} onChange={(e)=>setProdName(e.target.value)} placeholder="Enter your product name" className='border-2 border-[#002F34] rounded-md text-xs py-2 ps-3'/>
            </div>
            <div className="flex flex-col my-3 w-[50%]">
            <label>Category</label>
            <select value={category} onChange={(e)=>setCategory(e.target.value)} className='border-2 border-[#002F34] rounded-md text-xs py-2 ps-3'>
            <option key='1' value="Cars" >Cars</option>
                    <option key='2' value="Bikes" >Bikes</option>
                    <option key='3' value="Home Appliances" >Home Appliances</option>
                    <option key='4' value="Electronics" >Electronics</option>
                    <option key='5' value="Mobile Phones" >Mobile Phones</option>
                    <option key='6' value="Others" >Others</option>
            </select>
            </div>
            <div className="flex flex-col my-3 w-[50%]">
            <label>Description</label>
            <textarea value={Description} onChange={(e)=>setDescription(e.target.value)} cols={'20'} rows={'5'} className='border-2 border-[#002F34] rounded-md text-xs py-2 ps-3'></textarea>
            </div>
            <div className="flex flex-col my-3 w-[50%]">
            <label>Location</label>
            <input type="text" value={location} onChange={(e)=>setLocation(e.target.value)} placeholder='Enter your location'  className='border-2 border-[#002F34] rounded-md text-xs py-2 ps-3' />
            </div>
            <div className="flex flex-col my-3 w-[50%]">
            <label>Price</label>
            <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder='&#8377;100' className='border-2 border-[#002F34] rounded-md text-xs py-2 ps-3' />
            </div>
            <div className="flex flex-col my-3 w-[50%]">
            <label>Photos</label>
            <img src={images ? URL.createObjectURL(images):""} alt="" className=' w-[200px] my-8'/>
            <input type="file" onChange={(e)=>setImages(e.target.files[0])} className='border-2 border-[#002F34] rounded-md text-xs py-2 ps-3' />
            </div>
            {error && <p className='text-lg text-[#ff4646]'>{error}</p>}
            <div className="flex flex-col my-3">
                <button onClick={handlePost} disabled={loading} className={`border-2 my-2 bg-[#002f34] text-white py-2 font-bold tracking-widest transition ease-in-out delay-350 ${!loading && 'hover:bg-white hover:text-[#002F34] hover:border-2 hover:border-[#002F34]'} ${loading && 'bg-[#002F34]/50 '}`}>POST</button>
                {loading && <p className='text-center text-sm tracking-widest font-semibold text-[#002F34]'>Posting...</p>}
            </div>
        </div>
    </div>
  )
}
export default PostForm