import React, {useState, useEffect} from "react";

// reactstrap components
// import {
//
// } from "reactstrap";
import {OrderService} from '../services/OrderService.js'

// Core Components
import MainNavbar from "components/navbars/MainNavbar.js";
import MainFooter from "components/footers/MainFooter.js";

// Section Components
import TablesSection from "components/sections-page/TablesSection.js";
import MyCampaignsStatSection from "components/sections-page/MyCampaignsStatSection.js"

function Campaigns() {
    useEffect(() => {

    });

    useEffect(() => {
        // let service = new OrderService();

        // service.getOrdersCount().then((res) => {
        //     if (res.data.total > 0) 
        //         setShouldShowMyCampaignsSection(true);
        // });

     },[]);

    return (
        <>
            <MainNavbar type="dark"/>
            <div className="wrapper">
                
                <MyCampaignsStatSection/>
                           
                {/* <TablesSection/> */}
                <MainFooter/>
            </div>
            
        </>
    );
}

export default Campaigns;
