import { useState } from 'react';
import '../components/Column.css'
import Modal from './AddTask';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/Store';
import TodoCard from './TodoCard';
import { moveTodo } from '../feature/TodoSlice';
import { TodoStatus } from '../constants/TodoStatus';

function Open() {
    const todos = useSelector((state: RootState) => state.todos.columns.openColumn)
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }
    const dispatch = useDispatch<AppDispatch>()
    const handleClick = (id: number) => {
        dispatch(moveTodo({ id: id, to: TodoStatus.In_Progress }))
    }
    return (
        <>
            <div className="container">
                <button type='button' onClick={openModal}>Add new task</button>
                <Modal isOpen={isModalOpen} onClose={closeModal} />
                <div className="Column">
                    {todos?.map((todo) => (
                        <TodoCard todo={todo} key={todo.id} onCardClick={() => handleClick(todo.id)}/>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Open