import React, { useState } from "react";
import axios  from "axios";

function GetApplicantById() {
    const [id, setId] = useState("");
    const [applicant, setApplicant] = useState(null);
    const [error,setError] = useState("");

    const fetchApplicant = async () => {
        setError("");
        setApplicant(null);
        if(!id) {
            setError("Plese enter an ID");
            return;
        }
        try{
            const response = await axios.get(`http://localhost:8080/api/rate/${id}`);
            setApplicant(response.data);

        }catch (err) {
            setError("Applicant not found with  id : " + id);

        }
    };

    return(
        <div>
            <h2>Get Applicant By ID</h2>
            <input 
            type="number"
            placeholder="Enter Applicant ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            />

            <button onClick={fetchApplicant}>Fetch Applicant</button>
       
            {error && <p style={{color:"red"}}>{error}</p>}

            {applicant && (
                <div className="result-container"> 
                <p><strong>ID:</strong> {applicant.id}</p>
                <p><strong>Credit Score:</strong> {applicant.creditScore}</p>
                <p><strong>Employer:</strong> {applicant.employerType}</p>
                <p><strong>Monthly Income:</strong> {applicant.monthlyIncome}</p>
                <p><strong>Loan Amount:</strong> {applicant.loanAmount}</p>
                <p><strong>Final Rate:</strong> {applicant.finalRate}%</p>
                <p><strong>Processing Fee:</strong> {applicant.processingFee}</p>
                <p><strong>EMI:</strong> {applicant.emi}</p>
                </div>
            )

            }

        </div>
    );
}

export default  GetApplicantById;