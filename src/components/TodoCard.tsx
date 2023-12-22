import { Todo } from "../models/Todo";
import '../components/TodoCard.css';

interface TodoProps {
    todo: Todo
}

function TodoCard({ todo }: TodoProps) {
    return (
        <>
            <div className="todo-card">
                <h2 className="todo-title">{todo.title}</h2>
                <p className="todo-description">{todo.description}</p>
            </div>
        </>
    );
}

export default TodoCard