import { useContext } from "react";
import {Link} from "react-router-dom";
import  { PostContext } from "../../store/PostContext";
const Posts = (props) => {
  const { data } = props;
  const {setPostData} = useContext(PostContext);
  return (
    <div className="h-[20rem] bg-white w-[18rem] p-4 relative z-0">
      <div className="w-[100%] flex items-center justify-center h-[60%]">
        <Link to="/view-post" onClick={()=>setPostData(data)}>
          <img src={data.image} alt="" className='w-[100%] h-48' />
        </Link>
      </div>
      <div className="h-[30%] mt-2">
        <h3 className="my-2 font-bold">&#x20b9; {data.price}</h3>
        <h6 className="text-ellipsis overflow-hidden whitespace-nowrap text-[#666] text-sm my-1">
          {data.name}
        </h6>
        <p className="text-ellipsis overflow-hidden whitespace-nowrap text-[#666] text-sm my-1">
          {data.description}
        </p>
        <div className="h-[5%] flex justify-between text-xs">
          <h6>{data.location}</h6>
          <h6>{data.date.toString().split(" ").slice(1,4).join(" ")}</h6>
        </div>
        <div className="bg-white rounded-full w-[30px] h-[30px] absolute right-3 top-3 flex items-center justify-center">
          <i className="fa-regular fa-heart"></i>
        </div>
      </div>
    </div>
  );
};
export default Posts;
