import { useState } from 'react';
import StudentForm from '../components/StudentForm';
import StudentTable from '../components/StudentTable';

const Main = () => {
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleAddStudent = (newStudent) => {
        console.log('Adding student:', newStudent);
        setStudents([...students, { ...newStudent }]);
    };

    const handleDeleteStudent = (id) => {
        console.log('Deleting student ID:', id);
        setStudents(students.filter(student => student.id !== id));
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
                    isLoading={false} 
                    error={false} 
                    onDelete={handleDeleteStudent} 
                />
            </div>
        </main>
    );
};

export default Main;