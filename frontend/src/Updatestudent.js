import React, { useEffect, useState } from 'react'; // Import React and useState hook for managing component state
import axios from 'axios'; // Import axios for making HTTP requests
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate for navigation and usePara
function Updatestudent() {
    // State variables to store the name and email input values
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [marks, setMarks] = useState('');
    const [grade, setGrade] = useState('');
    const [city, setCity] = useState('');
    const { id } = useParams(); // Extract the 'id' parameter from the route
    const navigate = useNavigate(); // Hook for navigating programmatically

    useEffect(() => {
        axios.get(`http://localhost:5000/student/${id}`)
          .then(res => {
            setName(res.data.name);
            setEmail(res.data.email);
            setMarks(res.data.marks);
            setGrade(res.data.grade);
            setCity(res.data.city); // Add this line to update the city state
            console.log(res.data); // Add this line to verify the fetched data
          })
          .catch(err => console.error(err)); // Add this line to catch and handle any errors
      }, [id]);

    // Function to handle the form submission
    function handleSubmit(e) {
        e.preventDefault();
        console.log('Submitting form data:', { name, email, marks, grade, city });
        console.log('ID:', id);
        axios.put(`http://localhost:5000/update/${id}`, { name, email, marks, grade, city })
          .then(res => {
            console.log('Update response:', res);
            navigate("/");
          })
          .catch(err => {
            console.error('Error updating student:', err);
          });
      }
    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}> {/* Form submission triggers handleSubmit function */}
                    <h2>Update Student</h2>
                    <div className='mb-3'>
                        <label>Name</label>
                        <input
                            type='text'
                            className='form-control'
                            value={name} // Bind input value to name state
                            onChange={(e) => setName(e.target.value)} // Update name state when input changes
                        />
                    </div>
                    <div className='mb-3'>
                        <label>Email</label>
                        <input
                            type='text'
                            className='form-control'
                            value={email} // Bind input value to email state
                            onChange={(e) => setEmail(e.target.value)} // Update email state when input changes
                        />
                    </div>
                    <div className='mb-3'>
                        <label>Marks</label>
                        <input
                            type='text'
                            className='form-control'
                            value={marks}
                            onChange={(e) => setMarks(e.target.value)} // Update email state when input value changes
                        />
                    </div>
                    <div className='mb-3'>
                        <label>Grade</label>
                        <input
                            type='text'
                            className='form-control'
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)} // Update email state when input value changes
                        />
                    </div>
                    <div className='mb-3'>
                        <label>City</label>
                        <input
                            type='text'
                            className='form-control'
                            value={city}
                            onChange={(e) => setCity(e.target.value)} // Update email state when input value changes
                        />
                    </div>
                    <button type="submit" className="btn btn-success">Update</button> {/* Button to submit the form */}
                </form>
            </div>
        </div>
    );
}

export default Updatestudent; 