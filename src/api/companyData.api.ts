import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const getCompanyData = async (selectedState?:string)=>{
       try {
        let url = `${API_URL}&limit=50`;

        if (selectedState) {
        url += `&filters%5BCompanyStateCode%5D=${selectedState}`;
        }

        const response = await axios.get(url);
    return response.data;
    } catch (error:any) {
        console.log(error);
        throw error
    }
}