import { Suspense, lazy, useContext, useEffect,useState } from "react"
import PostShimmer from "./PostShimmer"
import { FirebaseContext } from "../../store/FirebaseContext"

const Posts = lazy(()=>import("./Posts"));

const QuickMenu = () => {
  const [products, setProducts] = useState([]);
  const {firestore,db}=useContext(FirebaseContext);
  
  useEffect(()=>{
    async function getProducts (){
      try{
        const query = firestore.query(firestore.collection(db,'products'));
        const prodata = await firestore.getDocs(query);
        const data = prodata.docs.map(doc=>{
          return{...doc.data(),id:doc.id}
        });
        setProducts([...data,]);
      }catch(err){
        console.log(err)
      }
    }
    getProducts();
  },[firestore,db])
  return (
    <div className="flex justify-center my-10">
        <div className="p-8 bg-[#e9e9e9] w-[90%]">
            <h3 className="font-semibold tracking-wider my-2">Quick Menu</h3>
            <div className="flex flex-wrap gap-12">
              {products.map(product=>{
                console.log(product)
                return(
                  <Suspense key={product.id} fallback={<PostShimmer/>}>
                    <Posts key={product.id} data={product}/>
                  </Suspense>
                )
              })}                
            </div>
        </div>
    </div>
  )
}
export default QuickMenu