import express from 'express';
import { 
    getStudents, 
    createStudent,
    updateStudent, 
    deleteStudent
} from '../controllers/student.controller.js';
import { requireUser } from '../middleware/requireUser.js';

const router = express.Router();

router.use(requireUser);

router.get('/', getStudents);
router.post('/', createStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

export default router;
