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
    <Tabs.Tab eventKey="1" title="Edit Roles">
      <EditUserRoles
        apartment_id={apartment_id}
        roomdetailsData={roomdetailsData}
      />
    </Tabs.Tab>
    <Tabs.Tab eventKey="2" title="Remove User">
      <RemoveUserDetails
        apartment_id={apartment_id}
        roomdetailsData={roomdetailsData}
      />
    </Tabs.Tab>
    <Tabs.Tab eventKey="3" title="Raise Ticket">
      <RaiseTicketOnResident
        apartment_id={apartment_id}
        roomdetailsData={roomdetailsData}
      />
    </Tabs.Tab>
  </Tabs>
);

export default TabsSection;
