const studentStores = new Map();

const getStudentStore = (userId) => {
    if (!studentStores.has(userId)) {
        studentStores.set(userId, {
            students: [],
            nextId: 1,
        });
    }

    return studentStores.get(userId);
};

// Fetch all students
export const getStudents = (req, res) => {
    const { students } = getStudentStore(req.userId);
    const sortedStudents = [...students].sort((a, b) => a.name.localeCompare(b.name));
    res.status(200).json(sortedStudents);
};

// Add a new student
export const createStudent = (req, res) => {
    const store = getStudentStore(req.userId);
    const { students } = store;
    const { name, email, course } = req.body;

    if (!name || !email || !course) {
         return res.status(400).json({ error: 'Name, email, and course are required.' });
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }

    // Check email is unique
    const emailExists = students.some(
        student => student.email.toLowerCase() === email.toLowerCase()
    );

    if (emailExists) {
        return res.status(409).json({ error: 'A student with this email already exists.' });
    }

    // Create and store
    const newStudent = { 
        id: store.nextId++,
        name, 
        email, 
        course 
    };

    students.push(newStudent);
  
    res.status(201).json(newStudent);
};

export const updateStudent = (req, res) => {
    const { students } = getStudentStore(req.userId);
    const studentId = parseInt(req.params.id, 10);
    const { name, email, course } = req.body;

    // Find if the student exists
    const studentIndex = students.findIndex(s => s.id === studentId);
    if (studentIndex === -1) {
        return res.status(404).json({ error: 'Student not found.' });
    }

    // Validation: Check for missing fields
    if (!name || !email || !course) {
        return res.status(400).json({ error: 'Name, email, and course are required.' });
    }

    // Validation: Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }

    // Validation: Unique Email Check (ignore the current student's own email)
    const emailExists = students.some(
        student => student.email.toLowerCase() === email.toLowerCase() && student.id !== studentId
    );
    
    if (emailExists) {
        return res.status(409).json({ error: 'A student with this email already exists.' });
    }

    // Update the student in the array
    students[studentIndex] = { ...students[studentIndex], name, email, course };
    
    res.status(200).json(students[studentIndex]);
};

// Delete a student
export const deleteStudent = (req, res) => {
    const { students } = getStudentStore(req.userId);
    const studentId = parseInt(req.params.id, 10);
    const studentIndex = students.findIndex(s => s.id === studentId);
    
    if (studentIndex === -1) {
        return res.status(404).json({ error: 'Student not found.' });
    }

    // Remove student from array
    students.splice(studentIndex, 1);

    res.status(200).json({ message: 'Student deleted successfully.' });
};
