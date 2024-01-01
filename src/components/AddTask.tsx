import React, { useState } from "react";
import '../components/Modal.css';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/Store";
import { createTodo } from "../feature/TodoSlice";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const dispatch = useDispatch<AppDispatch>()
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };
    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };
    const handleClose = () => {
        setTitle('');
        setDescription('');
        onClose();
    }
    const handleSubmit = () => {
        setTitle('');
        setDescription('');
        dispatch(createTodo({ title: title, description: description }));
        onClose();
    }
    return (
        <>
            <div className={`modal ${isOpen ? 'open' : 'close'}`}>
                <div className="modal-content">
                    <h1>Add New Task</h1>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" value={title} onChange={handleTitleChange} />
                    <label htmlFor="description">Description:</label>
                    <input type="text" id="description" value={description} onChange={handleDescriptionChange} />
                    <button onClick={handleSubmit}>Add Todo</button>
                    <button onClick={handleClose}>Close</button>                  
                </div>
            </div>
        </>
    );
}

export default Modal