import { useState } from 'react';
import '../components/Column.css'
import Modal from './AddTask';

function Open() {
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
                    <p>List of open tasks</p>
                </div>
            </div>
        </>
    );
}

export default Open