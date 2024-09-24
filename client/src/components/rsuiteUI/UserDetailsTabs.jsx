import { Tabs } from 'rsuite';
import React from 'react';
import {
  RemoveUserDetails,
  EditUserRoles,
  RaiseTicketOnResident,
} from '../EditResidentDetails';
import 'rsuite/Tabs/styles/index.css';
const TabsSection = ({ apartment_id, roomdetailsData }) => (
  <Tabs defaultActiveKey="1" appearance="pills">
    <Tabs.Tab eventKey="1" title="EditUser">
      <EditUserRoles
        apartment_id={apartment_id}
        roomdetailsData={roomdetailsData}
      />
    </Tabs.Tab>
    <Tabs.Tab eventKey="2" title="RemoveUser">
      <RemoveUserDetails
        apartment_id={apartment_id}
        roomdetailsData={roomdetailsData}
      />
    </Tabs.Tab>
    <Tabs.Tab eventKey="3" title="RaiseTicket">
      <RaiseTicketOnResident
        apartment_id={apartment_id}
        roomdetailsData={roomdetailsData}
      />
    </Tabs.Tab>
  </Tabs>
);

export default TabsSection;
