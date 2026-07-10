import { useState, useMemo } from "react";
import SearchBar from "./SearchBar";
import Loading from "../utils/Loading";
import EmptyTable from "../utils/EmptyTable";
import NoResultsFound from "../utils/NoResultsFound";
import Error from "../utils/Error";

const StudentTable = ({ students, isLoading, error, onEdit, onDelete }) => {

    const [searchTerm, setSearchTerm] = useState("");

    // Filter students by name (case-insensitive, substring match)
    const filteredStudents = useMemo(() => {
        if (!students) return [];
        const term = searchTerm.trim().toLowerCase();
        if (!term) return students;
        return students.filter((student) =>
            student.name?.toLowerCase().includes(term)
        );
    }, [students, searchTerm]);

    // Loading
    if (isLoading) {<Loading />}

    // Error getting data
    if (error) {<Error />}

    // UI State: No students at all
    if (!students || students.length === 0) {
        <EmptyTable />
    }

    // UI State: Data Render
    return (
        <div>
            <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                onClear={() => setSearchTerm("")}
                placeholder="Search by student name..."
            />

            {filteredStudents.length === 0 ? (
                <NoResultsFound searchTerm={searchTerm} />
            ) : (
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
                                {filteredStudents.map((student) => (
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

                                        <td className="px-6 py-4 text-right space-x-4">
                                            <button
                                                onClick={() => onEdit(student)}
                                                className="text-indigo-600 hover:text-indigo-900 font-medium text-sm transition"
                                            >
                                                Edit
                                            </button>

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
            )}
        </div>
    );
};

export default StudentTable;