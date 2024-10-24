import React, { useState } from 'react';
import { addCollege } from '../../../api';
import { addCollegeUser } from '../../../api';
import './AddCollege.css';

const AddCollege = () => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const college = { name, location };
            const response = await addCollege(college);
            const savedCollege = response.data; 
            console.log('Saved College:', savedCollege); 
            const user = { username, password, role: 'college',  roleSpecificId: savedCollege.id };
            console.log('User to be added:', user); // Log the user object
            await addCollegeUser(user);

            setMessage({ type: 'success', text: 'College added successfully!' });
            setName('');
            setLocation('');
            setUsername('');
            setPassword('');
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to add college. Please try again.' });
            // Clear error message after 3 seconds
            setTimeout(() => setMessage(null), 3000);
        }
    };

    return (
        <div className="add-college-container">
            <form onSubmit={handleSubmit} className="add-college-form">
                <h2>Add New College</h2>
                <div className="form-group">
                    <label htmlFor="name">College Name</label>
                    <input 
                        type="text" 
                        id="name"
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input 
                        type="text" 
                        id="location"
                        value={location} 
                        onChange={(e) => setLocation(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        id="username"
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Add College</button>
                {message && (
                    <div className={`${message.type}-message`}>
                        {message.text}
                    </div>
                )}
            </form>
        </div>
    );
};

export default AddCollege;