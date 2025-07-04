import React from "react";
import RateCalculator from "./RateCalculator";
import EMICalculator from "./EMICalculator";
import ScenarioComparison from "./ScenarioComparison";

export default function LoanCalculatorPage() {
    return(   
    <div>
        <RateCalculator/>
        <EMICalculator/>
        <ScenarioComparison/>
    </div>
    );
}