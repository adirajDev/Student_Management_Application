import { useState, useEffect, useCallback } from 'react';

const API_URL = 'http://localhost:5000/students';

// TODO: Use Server-Sent Events to handle any change made by the backend
// so the frontend table updates automatically without a manual refetch.

const useStudents = () => {
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchStudents = useCallback(async () => {
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
    }, []);

    useEffect(() => {
        fetchStudents();
    }, [fetchStudents]);

    // POST request to add a new student
    const addStudent = async (newStudent) => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newStudent),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to add student.');
        }

        const createdStudent = await response.json();

        setStudents((prevStudents) => {
            const updatedList = [...prevStudents, createdStudent];
            return updatedList.sort((a, b) => a.name.localeCompare(b.name));
        });
    };

    // PUT request to update an existing student
    const updateStudent = async (id, updatedData) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to update student.');
        }

        const updatedStudent = await response.json();

        setStudents((prev) =>
            prev
                .map((student) => (student.id === id ? updatedStudent : student))
                .sort((a, b) => a.name.localeCompare(b.name))
        );
    };

    // DELETE request to remove a student
    const deleteStudent = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete student.');

            setStudents((prev) => prev.filter((student) => student.id !== id));
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };

    return {
        students,
        isLoading,
        error,
        addStudent,
        updateStudent,
        deleteStudent,
    };
};

export default useStudents;