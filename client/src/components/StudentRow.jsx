const StudentRow = ({ student, onEdit, onDelete }) => (
    <tr className="hover:bg-gray-50 transition-colors">
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
                className="text-indigo-600 hover:text-indigo-900 font-medium text-sm transition cursor-pointer"
            >
                Edit
            </button>

            <button
                onClick={() => onDelete(student.id)}
                className="text-red-500 hover:text-red-700 font-medium text-sm transition cursor-pointer"
            >
                Delete
            </button>
        </td>
    </tr>
);

export default StudentRow;