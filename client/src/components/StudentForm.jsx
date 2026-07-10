import { useState, useEffect } from 'react';

const StudentForm = ({ onAdd, onUpdate, students, editingStudent, onCancelEdit }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        course: ''
    });
    const [validationError, setValidationError] = useState('');

    useEffect(() => {
        if (editingStudent) {
            setFormData({
                name: editingStudent.name,
                email: editingStudent.email,
                course: editingStudent.course
            });
            setValidationError('');
        } else {
            setFormData({ name: '', email: '', course: '' });
        }
    }, [editingStudent]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const { name, email, course } = formData;

        if (!name.trim() || !email.trim() || !course.trim()) {
            setValidationError('All fields are mandatory. Please fill out the form entirely.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setValidationError('Please enter a valid email address.');
            return;
        }
        
        try {
            // Await the API calls so we know if they succeed or fail
            if (editingStudent) {
                await onUpdate(editingStudent.id, formData);
            } else {
                await onAdd(formData);
            }
            
            // Only reset form if the API call succeeds
            setFormData({ name: '', email: '', course: '' });
            setValidationError('');
        } catch (err) {
            // Catch the backend error and display it in the form
            setValidationError(err.message);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            {/* Dynamic Title */}
            <h2 className="text-xl font-semibold mb-5 text-gray-800">
                {editingStudent ? 'Edit Student' : 'Add New Student'}
            </h2>
            
            {/* Render the error message if it exists */}
            {validationError && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm">
                    {validationError}
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                        placeholder="Student Name"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                        placeholder="email@mail.com"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
                        Course
                    </label>
                    <input
                        type="text"
                        id="course"
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                        placeholder="e.g. React JS"
                        required
                    />
                </div>

                <div className="flex gap-3 mt-4">
                    <button
                        type="submit"
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-200"
                    >
                        {editingStudent ? 'Update Student' : 'Add Student'}
                    </button>
                    
                    {/* Render a cancel button when editing */}
                    {editingStudent && (
                        <button
                            type="button"
                            onClick={onCancelEdit}
                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 px-4 rounded-lg transition duration-200"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default StudentForm;