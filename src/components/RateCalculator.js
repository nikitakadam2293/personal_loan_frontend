import React,{useState} from "react";
import { calculateRate } from '../api/api';

export default function RateCalculator()
{
    const [form, setForm] = useState({

    creditScore: '',
    employerType: '',   
    referringSomeone: false, 
    referredBySomeone: false, 
    monthlyIncome: '',
    loanAmount: ''

    });

    const [errors, setErrors] = useState({}); 
    const [result, setResult] = useState(null);
    const [serverError, setServerError] = useState(null);

    const handleChange = e =>{
        const { name, value, type, checked } = e.target;
        setForm(prev => ({

            ...prev,
            [name]: type === 'checkbox' ?  checked : value

        }));
    };


    const validate = () =>{
        const newErrors = {};
        if(!form.creditScore || isNaN(form.creditScore)){
            newErrors.creditScore = "Credit score is required";

        }else if(form.creditScore < 300 || form.creditScore > 950){
            newErrors.creditScore = "Credit score must be between 300 and 950";

        }


        if(!form.employerType.trim()){
            newErrors.employerType = "Employer type is required (GOVERNMENT, MNC, PRIVATE)";
        }

        if(!form.monthlyIncome  || isNaN(form.monthlyIncome) || form.monthlyIncome <=0)
        {
            newErrors.monthlyIncome = "Monthly income must be greater than 0";
        }

        
        if(!form.loanAmount ||  isNaN(form.loanAmount))
        {
            newErrors.loanAmount = "Loan amount is required";
        }
        else if(form.loanAmount < 50000  || form.loanAmount > 4000000){
            newErrors.loanAmount = "Loan amount must be between 50,000 an  40,00,000";
        }
        return newErrors

    }


    


  
  //
    const handleSubmit = async e =>{
        e.preventDefault();
        setServerError(null);

        const validationErrors = validate();
        if(Object.keys(validationErrors).length > 0){
            setErrors(validationErrors);
            return;
        }
        setErrors({});


        try{
            const res = await calculateRate(form);
            setResult(res.data);
        }
        catch(err)
        {

            if(err.response?.data?.errors)
                setServerError(err.response.data.errors.join(", "));
            else{
                setServerError(err.message);

            }
            }
           // alert('Error calculating rate: ' + err.response?.data || err.message);

        
    };

    return (
        <div>
            <h2>Rate Calculator</h2>
            <form onSubmit={handleSubmit} noValidate>

            <div> 
               <label > Credit Score <input name="creditScore" placeholder="Credit Score" value={form.creditScore} onChange={handleChange}/>  </label>
               {errors.creditScore &&  <div style={{ color: "red" }}>{errors.creditScore}</div>}
            </div>




                <div> 
                 <label > Employer Type   <input name="employerType" placeholder="Employer Type" value={form.employerType} onChange={handleChange}/>  </label> 
              {errors.employerType  &&  <div style={{ color: "red" }}>{errors.employerType}</div>}
              </div>


              <div>  
                <label>
                    Referring Someone
                    <input type="checkbox" name="referringSomeone"  checked={form.referringSomeone} onChange={handleChange} />
                </label>
                </div>


                <div> 
                <label>
                    Referred By Someone 
                    <input type ="checkbox" name="referredBySomeone" checked={form.referredBySomeone} onChange={handleChange} />
                </label>
                </div>


            <div> 
              <label >Monthly Income   <input name="monthlyIncome"  placeholder="Monthly Income" value={form.monthlyIncome} onChange={handleChange} />   </label>
                          {errors.monthlyIncome && <div style={{ color: "red" }}>{errors.monthlyIncome}</div>}
            </div>




            <div>   
              <label >Loan Amount   <input name="loanAmount" placeholder="Loan Amount" value={form.loanAmount} onChange={handleChange} />   </label>
          {errors.loanAmount && <div style={{ color: "red" }}>{errors.loanAmount}</div>}
            </div>



                   <button type="submit">Calculate Rate</button>   
            </form>


       {serverError && (
        <div style={{ color: "red", marginTop: "10px" }}>
          {serverError}
        </div>
      )}



            {result && (
                <div style={{background: "#f0f0f0", padding: "10px", marginTop: "10px"}}>
                        <h3>Result</h3>
                        <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}
        </div>
    );

}




// import React,{useState} from "react";
// import { calculateRate } from '../api/api';

// export default function RateCalculator()
// {
//     const [form, setForm] = useState({

//     creditScore: '',
//     employerType: '',   
//     referringSomeone: false, 
//     referredBySomeone: false, 
//     monthlyIncome: '',
//     loanAmount: ''

//     });

//     const [result, setResult] = useState(null);

//     const handleChange = e =>{
//         const { name, value, type, checked } = e.target;
//         setForm(prev => ({

//             ...prev,
//             [name]: type === 'checkbox' ?  checked : value

//         }));
//     };

//     const handleSubmit = async e =>{
//         e.preventDefault();
//         try{
//             const res = await calculateRate(form);
//             setResult(res.data);
//         }
//         catch(err)
//         {
//             alert('Error calculating rate: ' + err.response?.data || err.message);

//         }
//     };

//     return (
//         <div>
//             <h2>Rate Calculator</h2>
//             <form onSubmit={handleSubmit}>
//                <label > Credit Score <input name="creditScore" placeholder="Credit Score" onChange={handleChange}/>  </label>
               
//               <label > Employer Type   <input name="employerType" placeholder="Employer Type" onChange={handleChange}/>  </label> 
//                 <label>
//                     Referring Someone
//                     <input type="checkbox" name="referringSomeone" onChange={handleChange} />
//                 </label>

//                 <label>
//                     Referred By Someone 
//                     <input type ="checkbox" name="referredBySomeone" onChange={handleChange} />
//                 </label>

//               <label >Monthly Income   <input name="monthlyIncome"  placeholder="Monthly Income" onChange={handleChange} />   </label>
//               <label >Loan Amount   <input name="loanAmount" placeholder="Loan Amount" onChange={handleChange} />   </label>

//                    <button type="submit">Calculate Rate</button>   
//             </form>
//             {result && (
//                 <div>
//                         <h3>Result</h3>
//                         <pre>{JSON.stringify(result, null, 2)}</pre>
//                 </div>
//             )}
//         </div>
//     );

// }