import { HiUserCircle } from "react-icons/hi2";
import { TbHomeSearch } from "react-icons/tb";
import axios from 'axios';
import { MdOutlineSecurity } from "react-icons/md";
import { FaBox } from "react-icons/fa";
import { SlCalender } from "react-icons/sl"
import { TfiLayoutAccordionSeparated } from "react-icons/tfi";

const DashBoardSideDashutils = [
    {
        "Personals": [
            {
                "name": "My Profile",
                "path": "/dashboard",
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
                "name": "Create Events",
                "path": "/dashboard/owner/createevents",
                "icon": SlCalender
            },
            {
                "name": "My Abodes",
                "path": "/dashboard/owners/myapartments",
                "icon": TfiLayoutAccordionSeparated
            }
        ],
        "Security Announcements": [
            {
                "name": "InOut Log",
                "path": "/dashboard/security-log",
                "icon": MdOutlineSecurity
            },
            {
                "name": "Parcel Log",
                "path": "/dashboard/parcel-log",
                "icon": FaBox
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
