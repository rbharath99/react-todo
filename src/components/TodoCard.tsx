import { Todo } from "../models/Todo";
import '../components/TodoCard.css';

interface TodoProps {
    todo: Todo
    onCardClick: () => void
}

function TodoCard({ todo, onCardClick }: TodoProps) {

    return (
        <>
            <a href="#" onClick={onCardClick} >
                <div className="todo-card">
                    <h2 className="todo-title">{todo.title}</h2>
                    <p className="todo-description">{todo.description}</p>
                </div>
            </a>
        </>
    );
}

export default TodoCard