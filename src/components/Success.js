import { Link, useParams } from "react-router-dom";
import { BsCheck2Circle } from "react-icons/bs";

const Success = () => {
  const { orderId } = useParams();
  return (
    <div className="flex flex-col gap-2 flex-grow justify-center items-center font-poppins">
      <BsCheck2Circle className="" size="6rem" color="green" />
      <h1 className="font-bold text-3xl">Thank You</h1>
      <p className="">Your order has been recieved</p>
      <p className="font-semibold"> Order ID : {orderId}</p>
      <Link to="/">
        <button className="font-poppins bg-slate-900 mt-4 p-2 text-white w-full">
          Go To HomePage
        </button>
      </Link>
    </div>
  );
};

export default Success;

//1677415119
