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
        ],
        "Owner Announcements": [
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
        ],
        "Security Announcements": [
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
        ],
    }
];
const getApartmentDetails = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/dashboard/apartment_details`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};

const UserDetailsforApartment = async () => {
    try {
        const response = await axios.get('http://localhost:5000/dashboard/user_apartment_details', {
            withCredentials: true
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
        return null;

    }
}

export { DashBoardSideDashutils, getApartmentDetails, UserDetailsforApartment };
