import React, { useState } from "react";
import { saveContactAPI } from "../services/allAPI";
import { useNavigate } from "react-router-dom";

const AddContact = () => {
  const navigate = useNavigate();

  const [contactDetails, setContactDetails] = useState({
    name: "",
    phone: "",
    email: "",
    contactImg: "",
  });

  const resetButton = () => {
    setContactDetails({ name: "", phone: "", email: "", contactImg: "" });
  };

  const backButton = ()=>{
    navigate("/")
  }

  const handleAddContact = async (e) => {
    e.preventDefault();
    const { name, phone, email, contactImg } = contactDetails;
    if (name && phone && email && contactImg) {
      try {
        const result = await saveContactAPI(contactDetails);
        // console.log(result);
        if (result.status >= 200 && result.status < 300) {
          alert("Contact Added");
          resetButton();
          navigate("/");
        } else {
          console.log(result);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please fill the form");
    }
  };

  return (
    <>
      <div className="h-lvh flex justify-center items-center">
        <div className="max-w-[400px] rounded bg-slate-800 h-max p-5">
          <h1 className="text-white text-xl pb-5 font-light">Add Contact</h1>
          <form action="" className="flex flex-col gap-3">
            <input
              onChange={(e) =>
                setContactDetails({
                  ...contactDetails,
                  name: e.target.value,
                  contactImg: `https://ui-avatars.com/api/?background=random&name=${e.target.value}`,
                })
              }
              type="text"
              placeholder="Full name"
              className="px-3 py-2 rounded text-center"
              required
            />
            <p className="text-white font-extralight text-xs">
              Mobile number must include country code
            </p>
            <input
              onChange={(e) =>
                setContactDetails({ ...contactDetails, phone: e.target.value })
              }
              type="number"
              placeholder="Mobile Number"
              className="px-3 py-2 rounded text-center"
              required
            />
            <input
              onChange={(e) =>
                setContactDetails({ ...contactDetails, email: e.target.value })
              }
              type="email"
              placeholder="Email Address"
              className="px-3 py-2 rounded text-center"
            />
            <div className="flex justify-between gap-2 mt-4">
              <button
                onClick={(e) => handleAddContact(e)}
                className="bg-green-300 hover:bg-green-700 hover:text-white w-full px-5 py-2 rounded"
              >
                Add
              </button>
              <button
                type="reset"
                onClick={resetButton}
                className="bg-red-400 hover:bg-red-800 hover:text-white w-max px-5 py-2 rounded"
              >
                Reset
              </button>
              <button onClick={backButton} className="bg-slate-400 hover:bg-slate-800 hover:text-white w-max px-5 py-2 rounded">
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddContact;
