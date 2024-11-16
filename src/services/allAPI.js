import commonAPI from "./commonAPI"
import SERVERURL from "./serverURL"

export const saveContactAPI = async (contactDetails)=>{
    return await commonAPI("POST",`${SERVERURL}/allContacts`,contactDetails)
}

export const getAllContactsAPI = async ()=>{
    return await commonAPI("GET",`${SERVERURL}/allContacts`,[])
}

export const removeContactAPI = async (id)=>{
    return await commonAPI("DELETE",`${SERVERURL}/allContacts/${id}`,[])
}

export const getOneContactAPI = async (id)=>{
    return await commonAPI("GET",`${SERVERURL}/allContacts/${id}`,[])
}

export const updateContactAPI = async (id,contactDetails)=>{
    return await commonAPI("PUT",`${SERVERURL}/allContacts/${id}`,contactDetails)
}