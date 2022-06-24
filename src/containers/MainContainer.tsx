import React from "react";

import { Filters } from "components/Filters";
import { Sorters } from "components/Sorters";

const MainContainer = () => {
    console.log("main container")
    return (
        <div className="container">
            <Filters/>
            <Sorters/>
        </div>
    )
}

export { MainContainer };