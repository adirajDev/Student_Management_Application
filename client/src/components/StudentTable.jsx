const StudentTable = ({ students, isLoading, error, onDelete }) => {
    
    // UI State: Loading
    if (isLoading) {
        return (
            <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center h-full min-h-75">
                <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500 font-medium">Fetching student records...</p>
            </div>
        );
    }   

    // UI State: Error
    if (error) {
        return (
            <div className="bg-red-50 p-6 rounded-xl border border-red-200 h-full min-h-75 flex items-center justify-center text-center">
                <div>
                    <svg className="w-12 h-12 text-red-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <h3 className="text-lg font-medium text-red-800">Failed to load data</h3>
                    <p className="text-red-600 mt-1">{error}</p>
                </div>
            </div>
        );
    }

    // UI State: Empty Array
    if (!students || students.length === 0) {
        return (
            <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100 h-full min-h-75 flex flex-col items-center justify-center text-center">
                <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
                <h3 className="text-lg font-medium text-gray-900">No records available</h3>
                <p className="text-gray-500 mt-1 max-w-sm">There are currently no students enrolled. Use the form to add a new student.</p>
            </div>
        );
    }

    // UI State: Data Render
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Course</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {students.map((student) => (
                            <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900">{student.name}</div>
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    {student.email}
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                        {student.course}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => onDelete(student.id)}
                                        className="text-red-500 hover:text-red-700 font-medium text-sm transition"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentTable;