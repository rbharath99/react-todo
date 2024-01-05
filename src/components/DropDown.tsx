import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/Store';
import { moveTodo, updateTodoStatus } from '../feature/TodoSlice';
import { TodoStatus } from '../constants/TodoStatus';

interface TodoProps {
    todoId: number
    todoStatus: string
}

function DropDown({ todoId, todoStatus }: TodoProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string>(todoStatus);
    const handleButtonClick = () => setIsDropdownOpen(!isDropdownOpen);
    const handleOptionClick = (option: React.SetStateAction<string>) => {
        if (todoStatus == 'OPEN' && option == 'IN_PROGRESS') {
            dispatch(moveTodo({ id: todoId, from: TodoStatus.Open, to: TodoStatus.In_Progress }))
            dispatch(updateTodoStatus({ id: todoId, status: TodoStatus.In_Progress }))
        } else if (todoStatus == 'OPEN' && option == 'DONE') {
            dispatch(moveTodo({ id: todoId, from: TodoStatus.Open, to: TodoStatus.Done }))
            dispatch(updateTodoStatus({ id: todoId, status: TodoStatus.Done }))
        } else if (todoStatus == 'IN_PROGRESS' && option == 'DONE') {
            dispatch(moveTodo({ id: todoId, from: TodoStatus.In_Progress, to: TodoStatus.Done }))
            dispatch(updateTodoStatus({ id: todoId, status: TodoStatus.Done }))
        } else if (todoStatus == 'IN_PROGRESS' && option == 'OPEN') {
            dispatch(moveTodo({ id: todoId, from: TodoStatus.In_Progress, to: TodoStatus.Open }))
            dispatch(updateTodoStatus({ id: todoId, status: TodoStatus.Open }))
        } else if (todoStatus == 'DONE' && option == 'OPEN') {
            dispatch(moveTodo({ id: todoId, from: TodoStatus.Done, to: TodoStatus.Open }))
            dispatch(updateTodoStatus({ id: todoId, status: TodoStatus.Open }))
        } else {
            dispatch(moveTodo({ id: todoId, from: TodoStatus.Done, to: TodoStatus.In_Progress }))
            dispatch(updateTodoStatus({ id: todoId, status: TodoStatus.In_Progress }))
        }
        setSelectedOption(option);
        setIsDropdownOpen(false);
    };
    const dispatch = useDispatch<AppDispatch>();
    return (
        <button className="dropdown-button" onClick={handleButtonClick}>
            {selectedOption}
            {/* Arrow icon or symbol indicating dropdown functionality */}
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
