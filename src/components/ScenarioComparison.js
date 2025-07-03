import React, { useState } from "react";
import { compareScenarios } from "../api/api";

export default function ScenarioComparison() {
  const [scenarios, setScenarios] = useState([
    { loanAmount: "", annualRate: "", tenureAmount: "" }
  ]);
  const [errors, setErrors] = useState([]);
  const [result, setResult] = useState(null);
  const [serverError, setServerError] = useState(null);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...scenarios];
    updated[index][name] = value;
    setScenarios(updated);
  };

  const addScenario = () => {
    setScenarios([
      ...scenarios,
      { loanAmount: "", annualRate: "", tenureAmount: "" }
    ]);
  };

  const validateScenarios = () => {
    const newErrors = scenarios.map((s) => {
      const e = {};

      // Loan Amount
      if (!s.loanAmount || isNaN(s.loanAmount)) {
        e.loanAmount = "Loan amount is required";
      } else if (parseFloat(s.loanAmount) < 40000) {
        e.loanAmount = "Loan amount must be at least 40,000";
      } else if (parseFloat(s.loanAmount) > 4000000) {
        e.loanAmount = "Loan amount must be at most 4,000,000";
      }

      // Annual Rate
      if (!s.annualRate || isNaN(s.annualRate)) {
        e.annualRate = "Annual rate is required";
      } else if (parseFloat(s.annualRate) < 10) {
        e.annualRate = "Annual rate must be at least 10";
      } else if (parseFloat(s.annualRate) > 24) {
        e.annualRate = "Annual rate must be at most 24";
      }

      // Tenure
      if (!s.tenureAmount || isNaN(s.tenureAmount)) {
        e.tenureAmount = "Tenure is required";
      } else if (parseInt(s.tenureAmount) < 3) {
        e.tenureAmount = "Tenure must be at least 3 months";
      } else if (parseInt(s.tenureAmount) > 60) {
        e.tenureAmount = "Tenure must be at most 60 months";
      }

      return e;
    });

    const hasErrors = newErrors.some((e) => Object.keys(e).length > 0);
    return hasErrors ? newErrors : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);
    setResult(null);

    const validationErrors = validateScenarios();
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);

    try {
      const res = await compareScenarios({ scenario: scenarios });
      setResult(res.data);
    } catch (err) {
      if (err.response?.data?.errors) {
        setServerError(err.response.data.errors.join(", "));
      } else {
        setServerError(err.message);
      }
    }
  };

  return (
    <div>
      <h2>Scenario Comparison</h2>
      <form onSubmit={handleSubmit} noValidate>
        {scenarios.map((s, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px"
            }}
          >
            <label>
              Loan Amount
              <input
                name="loanAmount"
                placeholder="Loan Amount"
                value={s.loanAmount}
                onChange={(e) => handleChange(i, e)}
              />
            </label>
            {errors[i]?.loanAmount && (
              <div style={{ color: "red" }}>{errors[i].loanAmount}</div>
            )}

            <label>
              Annual Rate
              <input
                name="annualRate"
                placeholder="Annual Rate"
                value={s.annualRate}
                onChange={(e) => handleChange(i, e)}
              />
            </label>
            {errors[i]?.annualRate && (
              <div style={{ color: "red" }}>{errors[i].annualRate}</div>
            )}

            <label>
              Tenure (months)
              <input
                name="tenureAmount"
                placeholder="Tenure"
                value={s.tenureAmount}
                onChange={(e) => handleChange(i, e)}
              />
            </label>
            {errors[i]?.tenureAmount && (
              <div style={{ color: "red" }}>{errors[i].tenureAmount}</div>
            )}
          </div>
        ))}

        <button type="button" onClick={addScenario}>
          Add Another Scenario
        </button>
        <button type="submit">Compare</button>
      </form>

      {serverError && (
        <div style={{ color: "red", marginTop: "10px" }}>{serverError}</div>
      )}

      {result && (
        <div
          style={{
            background: "#f0f0f0",
            padding: "10px",
            marginTop: "10px"
          }}
        >
          <h3>Results</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}







// import React, { useState } from "react";
// import { compareScenarios } from '../api/api';

// export default function ScenarioComparison(){
//     const [scenarios, setScenarios] = useState([
//         { loanAmount: '', annualRate: '', tenureAmount: '' }
//     ]);
//     const [result, setResult] = useState(null);

//     const handleChange = (index, e) => {
//         const { name, value } = e.target;
//         const updated = [...scenarios];
//         updated[index][name] = value;
//         setScenarios(updated);
//     };

//     const addScenario = () => {
//         setScenarios([...scenarios, { loanAmount: '', annualRate: '', tenureAmount: ''}]);
//     };

//     const  handleSubmit = async e => {
//         e.preventDefault();
//         const res = await compareScenarios({ scenario: scenarios });
//         setResult(res.data);
//     };

//     return (
//         <div>
//             <h2>Scenario Comparison</h2>
//             <form onSubmit={handleSubmit} >
//                 {scenarios.map((s,i) =>(
//                     <div key={i}>
//                         <label>Loan Amount 
//                         <input
//                          name="loanAmount"
//                          placeholder="Loan Amount"
//                          value={s.loanAmount}
//                          onChange={e => handleChange(i,e)}
//                          />
//                          </label>
                       
//                        <label>Annual Rate
//                         <input 
//                         name="annualRate"
//                         placeholder="Annual Rate"
//                         value={s.annualRate}
//                         onChange={e => handleChange(i,e)}
//                         />
//                         </label>

//                         <label>Tenure
//                         <input
//                         name="tenureAmount"
//                         placeholder="Tenure"
//                         value={s.tenureAmount}
//                         onChange={e => handleChange(i,e)}
//                         />
//                         </label>

//                     </div>
//                 ))}

//                 <button type="button" onClick={addScenario}>Add Another Scenario</button>
//                 <button type="submit"> Compare</button>
//             </form>

//             {result && (
//                 <div>
//                     <h3>Results</h3>
//                     <pre>{JSON.stringify(result, null, 2)}</pre>
//                 </div>    
//             )}
//         </div>
//     );
// }