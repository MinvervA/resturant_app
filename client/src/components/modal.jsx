import { useEffect, useState } from "react";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import axios from "axios";
export const Modal = ({ setIsOpen }) => {
  const [input, setInput] = useState("");
  const [order, setOrder] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const fetchOrder = async () => {
    try {
      const getData = await axios.get(
        "http://localhost:4000/transaction/getAllOrder"
      );
      // console.log(getData.data.total);
      setOrder(getData.data.data);
      setTotalPrice(getData.data.total);
    } catch (error) {
      console.log(error);
    }
  };

  const cancleOrder = async () => {
    try {
      if (order.length === 0) {
        return setIsOpen((prev) => !prev);
      } else {
        const cancle = await axios.get(
          "http://localhost:4000/transaction/cancleOrder"
        );
        alert(cancle.data.message);
        setIsOpen((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const finishTrans = async () => {
    try {
      if (order.length > 0 && !input) {
        return alert("harap pesan terlebih dahulu dan masukan nama!");
      }
      const sendData = await axios.post(
        "http://localhost:4000/transaction/confirmOrder",
        { customer_name: input }
      );
      alert(sendData.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const subsOrder = async (id) => {
    try {
      console.log(id);
      const subs = await axios.post(
        `http://localhost:4000/transaction/subsOrder`,
        { id: id }
      );
      alert(subs.data.message);
      fetchOrder();
    } catch (error) {
      console.log(error);
    }
  };

  const addOrder = async (id) => {
    try {
      console.log(id);
      const add = await axios.post(
        `http://localhost:4000/transaction/plusOrder`,
        { id: id }
      );
      alert(add.data.message);
      fetchOrder();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);
  return (
    <div className="h-screen flex flex-col justify-center items-center absolute left-0 top-0 right-0 bg-black/60">
      {/* <div className="absolute left-0 right-0 top-0 bottom-0 h-[500px] w-[500px] bg-red-500"></div> */}
      <div className="h-[650px] w-[500px] bg-slate-100 border-2 border-black rounded-md pt-[20px] px-[20px] relative">
        <div
          className="absolute rounded-md w-[50px] h-[50px] bg-red-500 text-white text-3xl font-bold border-2 border-black flex justify-center items-center top-[0] right-[-55px] cursor-pointer"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          X
        </div>
        <div className="border-2 border-black h-[100px] px-[20px] py-[20px]">
          <h1 className="font-semibold">Masukan Nama Pemesan :</h1>
          <input
            type="text"
            className="py-2 w-full bg-transparent focus:outline-none"
            placeholder="ketik disini..."
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="border-2 border-black h-[450px] mt-5 overflow-y-auto no-scrollbar py-2 px-3">
          {order &&
            order.map((value, index) => {
              // setTotalPrice((prev) => prev + value?.qty * value?.food?.price);
              return (
                <div
                  key={index}
                  className="w-full border-2 border-black h-[100px] flex mb-2"
                >
                  <img
                    src={`http://localhost:4000/${value?.food?.food_image}`}
                    alt=""
                    className="size-[85px]"
                  />
                  <div className="pt-2">
                    <div className="">{value?.food?.food_name}</div>
                    <div className="flex items-center gap-1">
                      <div className="">Qty :</div>
                      <div className="">{value?.qty}</div>
                      <div className="">X</div>
                      <div className="">{`${value?.food?.price.toLocaleString(
                        "id-ID",
                        {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                        }
                      )}`}</div>
                      <div className="">=</div>
                      <div className="">{`${(
                        value?.qty * value?.food?.price
                      ).toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      })}`}</div>
                    </div>
                    <div className="flex gap-4 items-center mt-1">
                      <button onClick={() => subsOrder(value.food_id)}>
                        <CiCircleMinus size={25} />
                      </button>

                      <button onClick={() => addOrder(value.food_id)}>
                        <CiCirclePlus size={25} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="flex justify-between mt-3 font-semibold text-xl">
          <div className="">Total</div>
          <div className="">{`${totalPrice.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          })}`}</div>
        </div>
      </div>
      <div className="mt-5 flex gap-2 items-center justify-start">
        <button
          onClick={() => cancleOrder()}
          className="rounded-md bg-red-500 text-white px-3 text-3xl font-bold border-2 border-black"
        >
          Cancle
        </button>
        <button
          onClick={() => finishTrans()}
          className="rounded-md bg-white text-black px-3 text-3xl font-bold border-2 border-black"
        >
          Finish
        </button>
      </div>
    </div>
  );
};
