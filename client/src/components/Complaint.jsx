import React,{useState,useEffect} from 'react'
import axios from 'axios'
function Complaint({apartment_id}) {
  const [complaints,setComplaints]=useState([]);

  useEffect(()=>{

    const getData=async()=>{
        try {
          const response=await axios.get(`http://localhost:5000/complaints/${apartment_id}`,{ withCredentials: true })

          setComplaints(response.data);
        } catch (error) {
          console.log(error);
          
        }
    }
    getData()
  },[])
  return (
    <div>Complaint</div>
  )
}

export default Complaint