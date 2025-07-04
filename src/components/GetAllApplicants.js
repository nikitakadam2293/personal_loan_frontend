// import React, { useEffect, useState} from "react";
// import axios from "axios";

// function GetAllApplicants() {
//     const [applicants, setApplicants] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");

//     useEffect(() => {  
//     const fetchApplicants = async () => {
//         setLoading(true);
//         setError("");
//         try{
//             const response = await axios.get("http://localhost:8080/api/rate/getall");
//             setApplicants(response.data);
    
//         } catch(err) {
//             setError("Failed to fetch applicants");
//         } finally{
//             setLoading(false);
//         }
//     };

//     // useState(() => {
//         fetchApplicants();
//     }, []);

//     return(
//         <div>
//             <h2>All Applicants</h2>
//             {loading && <p>Loading...</p>}
//             {error && <p style={{ color:"red" }}>{error}</p>}
//             <ul>
//                 {applicants.map((a) =>(
//                     <li key={a.id}>
//                         <strong>ID:</strong> {a.id},
//                          <strong> Credit Score:</strong> {a.creditScore},
//                         <strong> Employer:</strong> {a.employerType},
//                         <strong> Final Rate:</strong> {a.finalRate}%
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );

// }
// export default GetAllApplicants;