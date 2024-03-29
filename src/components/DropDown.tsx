import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/Store';
import { moveTodo, updateTodoStatus } from '../feature/TodoSlice';
import '../components/DropDown.css';

interface TodoProps {
    todoId: number
    todoStatus: string
}

function DropDown({ todoId, todoStatus }: TodoProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const handleButtonClick = () => setIsDropdownOpen(!isDropdownOpen);
    const handleOptionClick = (option: string) => {
        dispatch(moveTodo({ id: todoId, from: todoStatus, to: option }))
        dispatch(updateTodoStatus({ id: todoId, status: option }))
        setIsDropdownOpen(false);
    };
    const dispatch = useDispatch<AppDispatch>();
    return (
        <button className="dropdown-button" onClick={handleButtonClick}>
            {todoStatus.replace("_", " ")}
            {isDropdownOpen && (
                <ul className="dropdown-options">
                    <li onClick={() => handleOptionClick('OPEN')}>Open</li>
                    <li onClick={() => handleOptionClick('IN_PROGRESS')}>In Progress</li>
                    <li onClick={() => handleOptionClick('DONE')}>Done</li>
                </ul>
            )}
        </button>
    );
}

export default DropDown
