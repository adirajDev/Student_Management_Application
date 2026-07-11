import { useState } from 'react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMPTY_FORM = { name: '', email: '', course: '' };

const getInitialFormData = (editingStudent) => {
    if (!editingStudent) {
        return EMPTY_FORM;
    }

    return {
        name: editingStudent.name,
        email: editingStudent.email,
        course: editingStudent.course,
    };
};

// Returns an error message string, or '' if the data is valid.
const validate = ({ name, email, course }) => {
    if (!name.trim() || !email.trim() || !course.trim()) {
        return 'All fields are mandatory. Please fill out the form entirely.';
    }
    if (!EMAIL_REGEX.test(email)) {
        return 'Please enter a valid email address.';
    }
    return '';
};

const useStudentForm = ({ editingStudent, onAdd, onUpdate }) => {
    const [formData, setFormData] = useState(() => getInitialFormData(editingStudent));
    const [validationError, setValidationError] = useState('');

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errorMessage = validate(formData);
        if (errorMessage) {
            setValidationError(errorMessage);
            return;
        }

        try {
            // Await the API call so we know if it succeeds or fails
            if (editingStudent) {
                await onUpdate(editingStudent.id, formData);
            } else {
                await onAdd(formData);
            }

            // Only reset the form if the API call succeeds
            setFormData(EMPTY_FORM);
            setValidationError('');
        } catch (err) {
            // Catch the backend error and surface it in the form
            setValidationError(err.message);
        }
    };

    return { formData, validationError, handleChange, handleSubmit };
};

export default useStudentForm;
