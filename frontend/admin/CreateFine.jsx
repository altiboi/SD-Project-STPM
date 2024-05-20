import React, { useState } from "react";
import './CreateFine.css';

function CreateFine( {resident,isOpen,Close}) {
    console.log(resident)
    const [fineReason, setFineReason] = useState('');
    const [fineAmount, setFineAmount] = useState('');

    const collectInfor = async () => {
        try {
            const reason = fineReason; // Assuming fineReason is defined elsewhere
            const amount = parseInt(fineAmount); // Assuming fineAmount is defined elsewhere
    
            const currentTime = new Date();
            const formattedDate = `${currentTime.getDate()}/${currentTime.getMonth() + 1}/${currentTime.getFullYear()}`;
    
    
            // Construct the URL with parameters
            const apiUrl = `https://blocbuddyapi.azurewebsites.net/api/CreateFine?`;
    
            // Send a POST request to the API endpoint
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body : JSON.stringify(
                    {   Resident: resident,
                        fine_amount:parseInt(amount),
                        fine_reason:reason,
                        date_issued:formattedDate})
            });
    
            // Check if the request was successful
            if (response.ok) {
                const responseData = await response.json();
                console.log("Fine created successfully:", responseData);
                // Handle success, e.g., show a success message to the user
            } else {
                // Handle API errors
                console.error("Failed to create fine:", response.statusText);
                // Show an error message to the user
            }
        } catch (error) {
           
            // Handle network or other errors
            console.error("Error creating fine:", error);
            // Show an error message to the user
        }
    };
    
    return (
        <article className={isOpen ? "creatArticle":"creatArticle_close"}>
            <section className="CreateSec1">
                <h5>Create fine</h5>
                <section onClick={()=>{Close("CreateFine")}}>
                    <p>x</p>
                </section>
            </section>
            <section className="CreateSec2">
                <input 
                    type="text" 
                    placeholder="Fine Reason...." 
                    value={fineReason} 
                    onChange={(e) => setFineReason(e.target.value)} 
                />
                <input 
                    type="text"  
                    placeholder="Fine Amount...." 
                    value={fineAmount} 
                    onChange={(e) => setFineAmount(e.target.value)} 
                />
            </section>
            <section className="CreateSec3">
                <button onClick={collectInfor}>Create</button>
            </section>
        </article>
    );
}

export default CreateFine;
