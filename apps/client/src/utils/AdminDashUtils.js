import  axios  from "axios";

const getAllSubscriptions = async()=>{
    try{
        const response = await axios.get('http://localhost:5000/payment/get-subscription-details');
        if(response.status===200){
            return {
                status:true,
                subscriptons:response.data.subscriptions
            }

        }
    }catch(error){
            console.error(error);
            return {
            status:false
        }
    }
}

export{getAllSubscriptions}
