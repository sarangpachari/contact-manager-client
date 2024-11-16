import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateContactAPI } from "../services/allAPI";

const EditContact = ({ editContactDetails }) => {
  const navigate = useNavigate();
  const [editedDetails, setEditedDetails] = useState({
    name: editContactDetails.name,
    phone: editContactDetails.phone,
    email: editContactDetails.email,
    contactImg:editContactDetails.contactImg
  });
  
  
  const backButton = () => {
    navigate("/");
  };
  const updateContact = async (e, id, editingDetails) => {
    e.preventDefault();
    const { name, phone, email,contactImg } = editedDetails;
    try {
      if (!name && !phone && !email &&!contactImg) {
        navigate("/");
      } else {
        const result = await updateContactAPI(id, editingDetails);
        if (result.status >= 200 && result.status < 300) {
          alert("Contact updated successfully");
          navigate('/')
        } else {
          alert("Failed to update contact");
          console.log(result);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="h-lvh flex justify-center items-center">
        <div className="max-w-[400px] rounded bg-purple-800 h-max p-5">
          <h1 className="text-white text-xl pb-5 font-light">Edit Contact</h1>
          <form action="" className="flex flex-col gap-3">
            <input
              defaultValue={editContactDetails?.name}
              onChange={(e) =>
                setEditedDetails({ ...editedDetails, name: e.target.value })
              }
              type="text"
              placeholder="Full name"
              className="px-3 py-2 rounded text-center"
            />
            <p className="text-white font-extralight text-xs">
              Mobile number must include country code
            </p>
            <input
              defaultValue={editContactDetails?.phone}
              onChange={(e) =>
                setEditedDetails({ ...editedDetails, phone: e.target.value })
              }
              type="number"
              placeholder="Mobile Number"
              className="px-3 py-2 rounded text-center"
            />
            <input
              defaultValue={editContactDetails?.email}
              onChange={(e) =>
                setEditedDetails({ ...editedDetails, email: e.target.value })
              }
              type="email"
              placeholder="Email Address"
              className="px-3 py-2 rounded text-center"
            />
            <div className="flex justify-between gap-2 mt-4">
              <button
                onClick={(e) =>
                  updateContact(e, editContactDetails.id, editedDetails)
                }
                className="bg-orange-100 hover:bg-green-700 hover:text-white w-full px-5 py-2 rounded"
              >
                Apply Changes
              </button>
              <button
                onClick={backButton}
                className="bg-slate-800 hover:bg-slate-400 hover:text-black text-white w-max px-5 py-2 rounded"
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditContact;
