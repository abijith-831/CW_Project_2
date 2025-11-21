import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const getCompanyData = async ()=>{
    try {
        const response = await axios.get(API_URL)
        console.log('axx',response);
        
        return response.data
    } catch (error:any) {
        console.log(error);
        throw error
    }
}