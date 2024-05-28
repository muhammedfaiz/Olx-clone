import { useContext, useEffect, useState } from "react"
import { PostContext } from "../../store/PostContext"
import { FirebaseContext } from "../../store/FirebaseContext";

const PostDetail = () => {
    const [user,setUser]=useState(null);
    const {postData}=useContext(PostContext);
    const {firestore,db}=useContext(FirebaseContext);
    useEffect(()=>{
        async function getUser(){
            const query = firestore.query(firestore.collection(db,"users"),firestore.where('id','==',postData.userId))
            const userData = await firestore.getDocs(query);
            userData.forEach((person)=>{
                setUser(person.data());
            })
        }
        getUser();
    },[])
  return (
    <div className="bg-[#eaeaea]">
        <div className="flex flex-col mx-16 pt-36">
            <div className="flex flex-col justify-between md:flex-row w-[100%]">
                <div className="w-[100%] md:w-[60%]">
                    <img src={postData.image} alt="" className="w-[100%]"/>
                </div>
                <div className="w-[100%] md:w-[35%]">
                    <div className="border-2 p-6 rounded-md border-gray-500 my-4 md:mb-0 md:my-4 bg-white">
                        <h1 className="text-3xl font-bold mb-2">&#8377; {postData.price}</h1>
                        <h4>{postData.name}</h4>
                        <div className="flex justify-between"><p>{postData.location}</p><p>{postData.date}</p></div>
                    </div>
                    <div className="border-2 p-6 my-4 rounded-md border-gray-500 bg-white">
                        <h1 className="text-3xl font-bold">{user ? user.username : ""}</h1>
                        <h4 className="text-xl my-3">{user ? user.mobile :""}</h4>
                        <div className="flex justify-between"><button className='tracking-widest border-2 border-[#002F34] my-2 font-semibold rounded-sm p-2 w-[100%] hover:bg-black hover:text-white'>CHAT WITH SELLER</button></div>
                    </div>
                </div>
            </div>
            <div>
                <div className="my-4 w-[100%] md:w-[60%]">
                    <div className="border-2 p-6 rounded-md border-gray-500 mb-4 md:mb-0 md:my-4 bg-white">
                        <h1 className="text-lg font-bold">Details</h1>
                        <h4>Category:{postData.category}</h4>
                    </div>
                    <div className="border-2 p-6 rounded-md border-gray-500 mb-4 md:mb-0 md:my-4 bg-white">
                        <h1 className="text-lg font-bold">Description</h1>
                        <h4>{postData.description}</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
export default PostDetail