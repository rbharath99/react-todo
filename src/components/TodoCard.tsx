import { Todo } from "../models/Todo";
import '../components/TodoCard.css';
import '../components/DropDown';
import DropDown from "../components/DropDown";

interface TodoProps {
    todo: Todo
}

function TodoCard({ todo }: TodoProps) {
    return (
        <>
            <div>
                <div className="todo-card">
                    <DropDown todoId={todo.id} todoStatus={todo.status!} />
                    <h2 className="todo-title">{todo.title}</h2>
                    <p className="todo-description">{todo.description}</p>
                </div>
            </div>
        </>
    );
}

export default TodoCard