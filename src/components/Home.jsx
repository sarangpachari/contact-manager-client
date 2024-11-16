import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getAllContactsAPI, getOneContactAPI, removeContactAPI } from "../services/allAPI";

const Home = ({setEditContactDetails}) => {
  const [allContacts, setAllContacts] = useState([]);

  const getAllContacts = async () => {
    try {
      const result = await getAllContactsAPI();
      if (result.status >= 200 && result.status < 300) {
        // SUCCESS
        setAllContacts(result.data);
      } else {
        // ERROR
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeContact = async (id, name) => {
    confirm(`Are you sure to delete ${name} ?`);
    try {
      const result = await removeContactAPI(id);
      if (result.status >= 200 && result.status < 300) {
        // SUCCESS
        setAllContacts(allContacts.filter((contact) => contact.id !== id));
      } else {
        // ERROR
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editContactBtn = async(id)=>{
    try {
      const result = await getOneContactAPI(id)
      if (result.status >= 200 && result.status < 300) {
        //SUCCESS
        setEditContactDetails(result.data)
      }else{
        //ERROR
        console.log(result)
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(() => {
    getAllContacts();
  }, [allContacts]);

  return (
    
    <>
      <div className="bg-[#333d79ff] h-lvh flex justify-center items-center">
        <div className="md:max-w-full bg-[#faebefff] h-max rounded-3xl p-5 flex flex-col items-center gap-3">
          <h1 className="text-slate-800 text-center text-2xl font-light mt-8">
            Contacts Management Application
          </h1>
          <Link to={"/add"}>
            <button className="bg-red-600 text-sm text-white px-3 py-2 rounded w-40 mt-5 hover:bg-green-300 hover:text-slate-800">
              Add Contact
            </button>
          </Link>
          <div className="flex flex-wrap justify-center gap-5 py-10">
            {/* CARD */}
            {allContacts?.length > 0 ? (
              allContacts.map((contact) => (
                <div
                  key={contact?.id}
                  className="w-[350px] bg-white rounded-xl h-max px-3 py-5 flex flex-col justify-center"
                >
                  <div className="w-full flex justify-center items-center gap-3">
                    <div className="w-1/4 h-full flex justify-center items-center">
                      <img
                        className="rounded-full"
                        src={contact?.contactImg}
                        alt=""
                      />
                    </div>
                    <div className="w-3/4 h-full">
                      <h1 className="font-semibold">
                        Name : <span>{contact?.name}</span>
                      </h1>
                      <h1 className="text-sm">
                        Phone : <span>{contact?.phone}</span>
                      </h1>
                      <h1 className="text-sm">
                        Email : <span>{contact?.email}</span>
                      </h1>
                    </div>
                  </div>
                  <div className="pt-5 flex justify-end pe-5 gap-4">
                    <Link to={`/${contact?.id}/edit`}>
                      <button onClick={() => editContactBtn(contact?.id)}>
                        <FaEdit className="text-slate-800" />
                      </button>
                    </Link>
                    <button
                      onClick={() => removeContact(contact?.id, contact?.name)}
                    >
                      <FaTrash className="text-red-600" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                No Contacts Found !
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
