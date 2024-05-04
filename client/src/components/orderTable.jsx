import React, { useEffect, useState } from "react";
import axios from "axios";
// import burger from "./../assets/burger.png";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { Modal } from "./modal";

const OrderTable = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [food, setIsFood] = useState(null);

  const fetchingData = async () => {
    try {
      const getData = await axios.get("http://localhost:4000/food/getAll");
      console.log(getData.data.data);
      if (getData) {
        setIsFood(getData.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addTransaction = async (id) => {
    try {
      const sendData = await axios.post(
        `http://localhost:4000/transaction/addOrder`,
        { id: id }
      );
      alert(sendData.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchingData();
    // console.log(food);
  }, []);
  return (
    <div>
      <div className="border-2 border-black rounded-md h-[750px] mt-4">
        <div className=" border-b-2 border-black py-2">
          <div className="flex-1 flex justify-center ">All Item</div>
        </div>
        <div className="px-[30px] py-3">
          <div className="grid grid-cols-5 gap-3 overflow-y-auto no-scrollbar h-[620px]">
            {food?.map((value, index) => {
              return (
                <div className="" key={index}>
                  <div className="card border-2 border-black h-[300px] w-[230px]">
                    <div className="cardImage">
                      <img
                        src={`http://localhost:4000/${value.food_image}`}
                        alt=""
                        className="w-[220px]"
                      />
                    </div>
                    <div className="px-2">
                      <div className="cardTitle text-xl font-semibold mt-2">
                        {value.food_name}
                      </div>
                      <div className="cardPrice text-lg ">
                        {`${value.price.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                        })}`}
                      </div>
                      <div className="cardButton mt-2">
                        <button
                          onClick={() => addTransaction(value.id)}
                          className="w-full border-2 border-black px-3 py-2"
                        >
                          Add to Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="btnConfirm text-center mt-4">
            <button
              className="px-3 py-2 border-2 border-black rounded-md"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
      {isOpen && <Modal setIsOpen={setIsOpen} />}
    </div>
  );
};

export default OrderTable;
