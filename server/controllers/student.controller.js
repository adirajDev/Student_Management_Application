let students = [];
let nextId = 1;

// Fetch all students
export const getStudents = (req, res) => {
    res.status(200).json(students);
};

// Add a new student
export const createStudent = (req, res) => {
    const { name, email, course } = req.body;

    if (!name || !email || !course) {
         return res.status(400).json({ error: 'Name, email, and course are required.' });
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }

    // Create and store
    const newStudent = { 
        id: nextId++, 
        name, 
        email, 
        course 
    };

    students.push(newStudent);
  
    res.status(201).json(newStudent);
};

// Delete a student
export const deleteStudent = (req, res) => {
    const studentId = parseInt(req.params.id, 10);
    const studentIndex = students.findIndex(s => s.id === studentId);
    
    if (studentIndex === -1) {
        return res.status(404).json({ error: 'Student not found.' });
    }

    // Remove student from array
    students.splice(studentIndex, 1);

    res.status(200).json({ message: 'Student deleted successfully.' });
};
