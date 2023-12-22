import { useState } from 'react';
import '../components/Column.css'
import Modal from './AddTask';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/Store';
import TodoCard from './TodoCard';

function Open() {
    const todos = useSelector((state: RootState) => state.todos.todos)
    console.log(todos)
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }
    return (
        <>
            <div className="container">
                <button type='button' onClick={openModal}>Add new task</button>
                <Modal isOpen={isModalOpen} onClose={closeModal} />
                <div className="Column">
                    {todos?.map((todo) => (
                        <TodoCard todo={todo} key={todo.id} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Open