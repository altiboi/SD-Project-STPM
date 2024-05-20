import React, { useState } from 'react';
import './SignUpForm.css';

function SignUpForm({ isOpen, closeSignUp }) {
    const [formData, setFormData] = useState({
        Role: '',
        Name: '',
        Surname: '',
        email: '',
        number: '',
        Password: '',
        buildingName: '',
        unit: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
        completeSignUp();
        // Reset form data
        setFormData({
            Role: '',
            Name: '',
            Surname: '',
            email: '',
            number: '',
            Password: '',
            buildingName: '',
            unit: ''
        });
        // Close the sign-up form
        closeSignUp();
    };

    const completeSignUp = () => {
        // Print out form data as JSON
        const userData = {
            Role: formData.Role,
            Name: `${formData.Name} ${formData.Surname}`,
            Email: formData.email,
            Phone: formData.number,
            BiometricData: "'''",
            PropertyName: formData.buildingName,
            UnitID: formData.unit,
            onPremises: true,
            HashedPassword: formData.Password,
            Permissions: " "
        };

        // Send user data to the API endpoint
        fetch('https://blocbuddyapi.azurewebsites.net/api/addUser?code=IsSteB9s3M4Y7seSs7wJV-8R-8y8lTQDzFN06f8b_44eAzFuKPaQLg==', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if (response.ok) {
                console.log('User added successfully.');
                closeSignUp();
            } else {
                console.error('Failed to add user:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error adding user:', error);
        });
    };

    return (
        <div className={`signup-form ${isOpen ? 'open' : ''}`}>
            <div className="modal">
                <div className="modal-content">
                    <h2>Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="role">Role:</label>
                        <select id="role" name="Role" value={formData.Role} onChange={handleChange}>
                            <option value="">Select Role</option>
                            <option value="Staff">Staff</option>
                            <option value="Resident">Resident</option>
                        </select>

                        <input type="text" id="name" name="Name" value={formData.Name} onChange={handleChange} placeholder="Name" />

                        <input type="text" id="surname" name="Surname" value={formData.Surname} onChange={handleChange} placeholder="Surname" />

                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />

                        <input type="password" id="password" name="Password" value={formData.Password} onChange={handleChange} placeholder="Password" />

                        <input type="text" id="number" name="number" value={formData.number} onChange={handleChange} placeholder="Number" />

                        <input type="text" id="buildingName" name="buildingName" value={formData.buildingName} onChange={handleChange} placeholder="Building Name" />

                        <input type="text" id="unit" name="unit" value={formData.unit} onChange={handleChange} placeholder="Unit" />


                        <button type="submit">Complete Sign Up</button>
                        <button className="cancel_button" type="button" onClick={closeSignUp}>Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUpForm;
