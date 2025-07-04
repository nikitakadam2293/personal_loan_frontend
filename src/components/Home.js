import React, { useState } from "react";
import LoanCalculatorPage from "./LoanCalculatorPage";
import GetApplicantById from "./GetApplicantById";

export default function HomePage() {
    const [active, setActive] = useState(null);

    return(
        <div style={{ padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px"}}>
                <button onClick={() => setActive("loan")}>Loan Calculator</button>
                <button onClick={() => setActive("getById")}>Get By ID</button>
        </div>

        <h1>Personal Loan Portal</h1>

        {active === "loan" && <LoanCalculatorPage/>}
        {active === "getById" && <GetApplicantById/>}
        {/* {!active && <p>Select an option above.</p>} */}
        </div>
    );
}