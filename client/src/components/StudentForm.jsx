import { useState } from 'react';

const StudentForm = ({ onAdd }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        course: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const { name, email, course } = formData;

        // Ensure fields aren't empty
        if (!name.trim() || !email.trim() || !course.trim()) {
            setValidationError('All fields are mandatory. Please fill out the form entirely.');
            return;
        }

        // Check email formatting via regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setValidationError('Please enter a valid email address.');
            return;
        }
        
        // Pass data to Main.jsx
        onAdd(formData);
        
        // Reset form on success
        setFormData({ name: '', email: '', course: '' });
        setValidationError('');
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-5 text-gray-800">Add New Student</h2>
            
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

                <button
                    type="submit"
                    className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-200"
                >
                    Add Student
                </button>
            </form>
        </div>
    );
};

export default StudentForm;