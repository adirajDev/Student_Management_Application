import { useState } from 'react';
import StudentForm from '../components/StudentForm';
import StudentTable from '../components/StudentTable';
import useStudents from '../hooks/useStudents';

const Main = () => {
    const { students, isLoading, error, addStudent, updateStudent, deleteStudent } = useStudents();
    const [editingStudent, setEditingStudent] = useState(null);

    const handleUpdateStudent = async (id, updatedData) => {
        await updateStudent(id, updatedData);
        setEditingStudent(null);
    };

    return (
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Form */}
            <div className="lg:col-span-1">
                <StudentForm
                    editingStudent={editingStudent}
                    onAdd={addStudent}
                    onUpdate={handleUpdateStudent}
                    onCancelEdit={() => setEditingStudent(null)}
                />
            </div>

            {/* Right Column: Data Table */}
            <div className="lg:col-span-2">
                <StudentTable
                    students={students}
                    isLoading={isLoading}
                    error={error}
                    onDelete={deleteStudent}
                    onEdit={setEditingStudent}
                />
            </div>
        </main>
    );
};

export default Main;