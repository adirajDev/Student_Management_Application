import { useState, useEffect } from 'react';
import StudentForm from '../components/StudentForm';
import StudentTable from '../components/StudentTable';

const Main = () => {
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_URL = 'http://localhost:5000/students';

    // Temp fix: set 3 sec timer to reload studentTable
    // TODO: Use Server-Sent Event method to handle any change in studentTable made by backend to automatically update frontend table

    const fetchStudents = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Failed to fetch students from the server.');
            
            const data = await response.json();
            setStudents(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {     
        fetchStudents();

        // const intervalId = setInterval(() => {
        //     fetchStudents();
        // }, 3000);

        // return () => clearInterval(intervalId);
    }, []);

    const handleAddStudent = async (newStudent) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newStudent),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to add student.');
            }

            const createdStudent = await response.json();
            // Update local state instantly without a page refresh
            setStudents((prevStudents) => {
                const updatedList = [...prevStudents, createdStudent];
                return updatedList.sort((a, b) => a.name.localeCompare(b.name));
            });
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };

    const handleDeleteStudent = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete student.');
            }

            // Filter out the deleted student from local state
            setStudents(students.filter(student => student.id !== id));
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };

    return (
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Form */}
            <div className="lg:col-span-1">
                <StudentForm onAdd={handleAddStudent} />
            </div>

            {/* Right Column: Data Table */}
            <div className="lg:col-span-2">
                <StudentTable 
                    students={students} 
                    isLoading={isLoading} 
                    error={error} 
                    onDelete={handleDeleteStudent} 
                />
            </div>
        </main>
    );
};

export default Main;