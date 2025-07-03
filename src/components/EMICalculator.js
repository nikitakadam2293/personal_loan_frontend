import React, { useState } from "react";
import { calculateEmi } from "../api/api";

export default function EMICalculator() {
  const [form, setForm] = useState({
    loanAmount: "",
    tenureAmount: "",
    annualRate: ""
  });

  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);
  const [serverError, setServerError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    // Loan Amount Validation
if (!form.loanAmount || isNaN(form.loanAmount)) {
  newErrors.loanAmount = "Loan amount is required";
} else if (parseFloat(form.loanAmount) < 50000) {
  newErrors.loanAmount = "Loan amount must be at least 50,000";
} else if (parseFloat(form.loanAmount) > 4000000) {
  newErrors.loanAmount = "Loan amount must not exceed 40,00,000";
}

    // Annual Rate Validation
if (!form.annualRate || isNaN(form.annualRate)) {
  newErrors.annualRate = "Annual rate is required";
} else if (parseFloat(form.annualRate) < 10) {
  newErrors.annualRate = "Annual rate must not be less than 10";
} else if (parseFloat(form.annualRate) > 24) {
  newErrors.annualRate = "Annual rate must not exceed 24";
}


    // Tenure Validation
    if (!form.tenureAmount || isNaN(form.tenureAmount)) {
      newErrors.tenureAmount = "Tenure is required";
    } else if (parseInt(form.tenureAmount) < 3) {
      newErrors.tenureAmount = "Tenure must be at least 3 months";
    } else if (parseInt(form.tenureAmount) > 60) {
      newErrors.tenureAmount = "Tenure must be at most 60 months";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Stop submission if validation fails
    }
    setErrors({});

    try {
      const res = await calculateEmi(form);
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
      <h2>EMI Calculator</h2>
      <form onSubmit={handleSubmit} noValidate>
        {/* Loan Amount */}
        <div>
          <label>
            Loan Amount
            <input
              name="loanAmount"
              placeholder="Loan Amount"
              value={form.loanAmount}
              onChange={handleChange}
            />
          </label>
          {errors.loanAmount && (
            <div style={{ color: "red" }}>{errors.loanAmount}</div>
          )}
        </div>

        {/* Annual Rate */}
        <div>
          <label>
            Annual Rate
            <input
              name="annualRate"
              placeholder="Annual Rate"
              value={form.annualRate}
              onChange={handleChange}
            />
          </label>
          {errors.annualRate && (
            <div style={{ color: "red" }}>{errors.annualRate}</div>
          )}
        </div>

        {/* Tenure */}
        <div>
          <label>
            Tenure (months)
            <input
              name="tenureAmount"
              placeholder="Tenure (months)"
              value={form.tenureAmount}
              onChange={handleChange}
            />
          </label>
          {errors.tenureAmount && (
            <div style={{ color: "red" }}>{errors.tenureAmount}</div>
          )}
        </div>

        <button type="submit">Calculate EMI</button>
      </form>

      {/* Server error */}
      {serverError && (
        <div style={{ color: "red", marginTop: "10px" }}>{serverError}</div>
      )}

      {/* Result */}
      {result && (
        <div style={{ background: "#f0f0f0", padding: "10px", marginTop: "10px" }}>
          <h3>Result</h3>
          <p>EMI: {result.emi}</p>
          <p>Total Interest: {result.totalInterest}</p>
          <p>Total Repayment: {result.totalRepayment}</p>
          <h4>Amortization Schedule</h4>
          <pre>{JSON.stringify(result.amortizationSchedule, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}





// import React, { useState } from "react";
// import { calculateEmi } from "../api/api";

// export default function EMICalculator(){
//     const [form, setForm] = useState({
//              loanAmount: '',
//              tenureAmount: '',
//              annualRate: ''

//     });
//     const [result, setResult] = useState(null);

//     const handleChange = e => {
//         const { name, value } = e.target;
//         setForm(prev => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = async e =>{
//         e.preventDefault();
//         const res = await calculateEmi(form);
//         setResult(res.data);
//     };


//     return(
//         <div>
//             <h2>EMI Calculator</h2>
//             <form onSubmit={handleSubmit}>
//               <label>Loan Amount   <input name="loanAmount" placeholder="Loan Amount" onChange={handleChange}/> </label>
//                <label>Annual   Rate <input name="annualRate" placeholder="Annual Rate" onChange={handleChange}/> </label>
//                <label>Tenure  (months)  <input name ="tenureAmount" placeholder="Tenure (months)" onChange={handleChange}/>  </label>
//                 <button type="submit">Calculate EMI</button>

//             </form>

//             {result &&(
//                 <div>
//                     <h3>Result</h3>
//                     <p>EMI: {result.emi}</p>
//                     <p>Total Interest: {result.totalInterest}</p>
//                     <p>Toatl Repayment: {result.totalRepayment}</p>
//                     <h4>Amortization Schedule</h4>
//                     <pre>{JSON.stringify(result.amortizationSchedule, null, 2)}</pre>

//                 </div>  
//             )}
//         </div>
//     );
// }