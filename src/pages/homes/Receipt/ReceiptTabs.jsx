import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Receipt from "./Receipt";
import DoctorAppointment from "./DoctorAppointment";
import DueEntry from "./DueEntry";

const ReceiptTabs = () => {
  return (
    <div className="container mx-auto text-xl  min-h-screen">
      <h1 className="text-white p-10"> Receipt List </h1>
      <Tabs>
        <div>
          <TabList className="bg-blue-800 py-3 rounded-lg text-center">
            <Tab
              className="tab tab-bordered text-[#38BDF8] text-[20px] 
            border-none 
            "
            >
              Receipt Entry
            </Tab>
            <Tab className="tab tab-bordered text-[#38BDF8] text-[20px] border-none focus:outline-none">
              Appointment
            </Tab>
            <Tab className="tab tab-bordered text-[#38BDF8] text-[20px] border-none focus:outline-none ">
              Due Entry
            </Tab>
          </TabList>
        </div>

        <TabPanel>
          <Receipt />
        </TabPanel>
        <TabPanel>
          <DoctorAppointment />
        </TabPanel>
        <TabPanel>
          <DueEntry />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default ReceiptTabs;
