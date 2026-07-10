import useStudentForm from '../hooks/useStudentForm';
import FormField from '../utils/FormField';

const StudentForm = ({ onAdd, onUpdate, editingStudent, onCancelEdit }) => {
    const { formData, validationError, handleChange, handleSubmit } = useStudentForm({
        editingStudent,
        onAdd,
        onUpdate,
    });

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
                <FormField
                    id="name"
                    label="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Student Name"
                />

                <FormField
                    id="email"
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@mail.com"
                />

                <FormField
                    id="course"
                    label="Course"
                    value={formData.course}
                    onChange={handleChange}
                    placeholder="e.g. React JS"
                />

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