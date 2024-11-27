"use server"

import { headers } from 'next/headers';

const axios = require('axios')

const jwt = process.env.JWT;


export const uploadJSONToIPFS = async(JSONBody) =>{ 

    const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';

    try{

        const res = await axios.post(url,JSONBody,{
            headers:{
                Authorization:`Bearer ${jwt}`
            }
        })

        return{
            success:true,
            pinataURL:"https://gateway.pinata.cloud/ipfs/" + res.data.IpfsHash,

        }
        
    }catch(error){
        console.log(error)

        return{
            success:false,
            message:error.message
        }
    }


}

export const uploadFileToIPFS = async(data) => {
    const pinanataMetadata = JSON.stringify({

        name:data.get('file').name,


        
    })
    data.append("pinataMetadata",pinanataMetadata);

    const pinataOptions = JSON.stringify({
        cidVersion:0,

    })
    data.append("pinataoptions",pinataOptions); 

    try{
        const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS',data,{
            maxBodyLength:"Infinity",
            headers:{
                "Content-Type": `multipart/form-data; boundary=${data,_boundary}`,
                Authorization:`Bearer ${jwt}`
            }
        })

        return{
            success:true,
            pinataURL:"https://gateway.pinata.cloud/ipfs/" + res.data.IpfsHash,

        }
        
    }
    catch(error){
        console.log(error); 

        return{
            success:false, 
            message:error.message
        }
    }
} 