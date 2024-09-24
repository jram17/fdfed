import { HiUserCircle } from "react-icons/hi2";
import { TbHomeSearch } from "react-icons/tb";
import axios from 'axios';
const DashBoardSideDashutils = [
    {
        "Personals": [
            {
                "name": "My Profile",
                "path": "/dashboard/myprofile",
                "icon": HiUserCircle
            },
            {
                "name": "My Apartments",
                "path": "/dashboard/myapartments",
                "icon": TbHomeSearch
            }
        ]
    }
];
const getApartmentDetails = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/dashboard/apartment_details`);
        if (response.status === 200) {
            console.log(response);
            return response.data;
        }
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch apartment details');
    }
};

export { DashBoardSideDashutils, getApartmentDetails };
