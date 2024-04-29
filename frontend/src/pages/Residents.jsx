import React from 'react';
import { useEffect } from 'react';

const residents =[
    {
      "name": "Nkosinathi",
      "age": 30,
      "room_on": "501",
      "Room_type": "small",
      "cell": "1234567890",
      "nationality": "South African",
      "gender": "male",
      "res_id": 1,
      "admission_date": "26 April 2024",
      "lease_agreement": "signed",
      "lease_period": "6 Months",
      "allergies": "none",
      "health_insurance": "yes",
      "chronical_disease": "no",
      "disabilities": "no",
      "medication": "none"
    },
    {
      "name": "Sophia",
      "age": 28,
      "room_on": "502",
      "Room_type": "medium",
      "cell": "2345678901",
      "nationality": "American",
      "gender": "female",
      "res_id": 2,
      "admission_date": "26 April 2024",
      "lease_agreement": "signed",
      "lease_period": "12 Months",
      "allergies": "nuts",
      "health_insurance": "yes",
      "chronical_disease": "no",
      "disabilities": "no",
      "medication": "none"
    },
    {
      "name": "Liam",
      "age": 32,
      "room_on": "503",
      "Room_type": "large",
      "cell": "3456789012",
      "nationality": "British",
      "gender": "male",
      "res_id": 3,
      "admission_date": "26 April 2024",
      "lease_agreement": "signed",
      "lease_period": "6 Months",
      "allergies": "none",
      "health_insurance": "yes",
      "chronical_disease": "yes",
      "disabilities": "no",
      "medication": "blood pressure medication"
    },
    {
      "name": "Emma",
      "age": 27,
      "room_on": "504",
      "Room_type": "small",
      "cell": "4567890123",
      "nationality": "Canadian",
      "gender": "female",
      "res_id": 4,
      "admission_date": "26 April 2024",
      "lease_agreement": "signed",
      "lease_period": "9 Months",
      "allergies": "shellfish",
      "health_insurance": "yes",
      "chronical_disease": "no",
      "disabilities": "no",
      "medication": "none"
    },
    {
      "name": "Jackson",
      "age": 35,
      "room_on": "505",
      "Room_type": "medium",
      "cell": "5678901234",
      "nationality": "American",
      "gender": "male",
      "res_id": 5,
      "admission_date": "26 April 2024",
      "lease_agreement": "signed",
      "lease_period": "6 Months",
      "allergies": "none",
      "health_insurance": "yes",
      "chronical_disease": "no",
      "disabilities": "no",
      "medication": "none"
    },
    {
      "name": "Olivia",
      "age": 29,
      "room_on": "506",
      "Room_type": "large",
      "cell": "6789012345",
      "nationality": "British",
      "gender": "female",
      "res_id": 6,
      "admission_date": "26 April 2024",
      "lease_agreement": "signed",
      "lease_period": "12 Months",
      "allergies": "none",
      "health_insurance": "no",
      "chronical_disease": "yes",
      "disabilities": "no",
      "medication": "asthma inhaler"
    },
    {
      "name": "Noah",
      "age": 31,
      "room_on": "507",
      "Room_type": "small",
      "cell": "7890123456",
      "nationality": "Canadian",
      "gender": "male",
      "res_id": 7,
      "admission_date": "26 April 2024",
      "lease_agreement": "not signed",
      "lease_period": "0 Months",
      "allergies": "none",
      "health_insurance": "no",
      "chronical_disease": "no",
      "disabilities": "yes",
      "medication": "wheelchair"
    },
    {
      "name": "Ava",
      "age": 26,
      "room_on": "508",
      "Room_type": "medium",
      "cell": "8901234567",
      "nationality": "French",
      "gender": "female",
      "res_id": 8,
      "admission_date": "26 April 2024",
      "lease_agreement": "signed",
      "lease_period": "6 Months",
      "allergies": "dairy",
      "health_insurance": "yes",
      "chronical_disease": "no",
      "disabilities": "no",
      "medication": "none"
    },
    {
      "name": "William",
      "age": 33,
      "room_on": "509",
      "Room_type": "large",
      "cell": "9012345678",
      "nationality": "American",
      "gender": "male",
      "res_id": 9,
      "admission_date": "26 April 2024",
      "lease_agreement": "signed",
      "lease_period": "9 Months",
      "allergies": "peanuts",
      "health_insurance": "yes",
      "chronical_disease": "no",
      "disabilities": "no",
      "medication": "none"
    },
    {
      "name": "Isabella",
      "age": 28,
      "room_on": "510",
      "Room_type": "small",
      "cell": "0123456789",
      "nationality": "Italian",
      "gender": "female",
      "res_id": 10,
      "admission_date": "26 April 2024",
      "lease_agreement": "signed",
      "lease_period": "12 Months",
      "allergies": "eggs",
      "health_insurance": "yes",
      "chronical_disease": "yes",
      "disabilities": "no",
      "medication": "insulin"
    },
    {
      "name": "Jacob",
      "age": 34,
      "room_on": "511",
      "Room_type": "medium",
      "cell": "3456789012",
      "nationality": "American",
      "gender": "male",
      "res_id": 11,
      "admission_date": "26 April 2024",
      "lease_agreement": "signed",
      "lease_period": "6 Months",
      "allergies": "none",
      "health_insurance": "yes",
      "chronical_disease": "no",
      "disabilities": "no",
      "medication": "none"
    },
    {
      "name": "Mia",
      "age": 29,
      "room_on": "512",
      "Room_type": "large",
      "cell": "4567890123",
      "nationality": "British",
      "gender": "female",
      "res_id": 12,
      "admission_date": "26 April 2024",
      "lease_agreement": "signed",
      "lease_period": "9 Months",
      "allergies": "none",
      "health_insurance": "yes",
      "chronical_disease": "no",
      "disabilities": "no",
      "medication": "none"
    },
    {
      "name": "Ethan",
      "age": 35,
      "room_on": "513",
      "Room_type": "small",
      "cell": "5678901234",
      "nationality": "Canadian",
      "gender": "male",
      "res_id": 13,
      "admission_date": "26 April 2024",
      "lease_agreement": "signed",
      "lease_period": "6 Months",
      "allergies": "none",
      "health_insurance": "yes",
      "chronical_disease": "no",
      "disabilities": "no",
      "medication": "none"
    },
    {
      "name": "Charlotte",
      "age": 30,
      "room_on": "514",
      "Room_type": "medium",
      "cell": "6789012345",
      "nationality": "American",
      "gender": "female",
      "res_id": 14,
      "admission_date": "26 April 2024",
      "lease_agreement": "signed",
      "lease_period": "12 Months",
      "allergies": "none",
      "health_insurance": "yes",
      "chronical_disease": "yes",
      "disabilities": "no",
      "medication": "migraine medication"
    },
    {
      "name": "Amelia",
      "age": 31,
      "room_on": "515",
      "Room_type": "large",
      "cell": "7890123456",
      "nationality": "British",
      "gender": "female",
      "res_id": 15,
      "admission_date": "26 April 2024",
      "lease_agreement": "signed",
      "lease_period": "6 Months",
      "allergies": "gluten",
      "health_insurance": "yes",
      "chronical_disease": "no",
      "disabilities": "no",
      "medication": "none"
    },
    {
      "name": "James",
      "age": 32,
      "room_on": "516",
      "Room_type": "small",
      "cell": "8901234567",
      "nationality": "French",
      "gender": "male",
      "res_id": 16,
      "admission_date": "26 April 2024",
      "lease_agreement": "signed",
      "lease_period": "9 Months",
      "allergies": "peanuts",
      "health_insurance": "yes",
      "chronical_disease": "no",
      "disabilities": "no",
      "medication": "none"
    },
    {
      "name": "Ava",
      "age": 33,
      "room_on": "517",
      "Room_type": "medium",
      "cell": "9012345678",
      "nationality": "American",
      "gender": "female",
      "res_id": 17,
      "admission_date": "26 April 2024",
      "lease_agreement": "signed",
      "lease_period": "12 Months",
      "allergies": "shellfish",
      "health_insurance": "yes",
      "chronical_disease": "yes",
      "disabilities": "no",
      "medication": "none"
    },
    {
      "name": "Michael",
      "age": 34,
      "room_on": "518",
      "Room_type": "large",
      "cell": "0123456789",
      "nationality": "Italian",
      "gender": "male",
      "res_id": 18,
      "admission_date": "26 April 2024",
      "lease_agreement": "signed",
      "lease_period": "6 Months",
      "allergies": "eggs",
      "health_insurance": "yes",
      "chronical_disease": "no",
      "disabilities": "no",
      "medication": "none"
    },
    {
      "name": "Olivia",
      "age": 35,
      "room_on": "519",
      "Room_type": "small",
      "cell": "1234567890",
      "nationality": "South African",
      "gender": "female",
      "res_id": 19,
      "admission_date": "26 April 2024",
      "lease_agreement": "signed",
      "lease_period": "9 Months",
      "allergies": "dairy",
      "health_insurance": "yes",
      "chronical_disease": "yes",
      "disabilities": "no",
      "medication": "none"
    },
    {
      "name": "Liam",
      "age": 36,
      "room_on": "520",
      "Room_type": "medium",
      "cell": "2345678901",
      "nationality": "American",
      "gender": "male",
      "res_id": 20,
      "admission_date": "26 April 2024",
      "lease_agreement": "signed",
      "lease_period": "12 Months",
      "allergies": "none",
      "health_insurance": "yes",
      "chronical_disease": "no",
      "disabilities": "no",
      "medication": "none"
    }
  ];

function Residents() {
    
 

    return (
        <>
            {residents.map((person, index) => (
                <div key={index} className="comp">
                    <article className="insComp">
                        <section className="profile">
                            <img src="pp.png" alt="" />
                            <p className="name">
                                {person.name}
                            </p>
                        </section>
                        <ul className="vC">
                            <li className="variables">{person.age}</li>
                            <li className="variables">{person.room_on}</li>
                            <li className="variables">{person.Room_type}</li>
                        </ul>
                    </article>
                </div>
            ))}
        </>
    );
}

function Value() {
    return (
        <p id="Num_res">{residents.length}</p>
    );
}

export { Value }; // Export Value as a named export
export default Residents; // Export Residents as the default export
