import { Todo } from "../models/Todo";
import '../components/TodoCard.css';
import { AppDispatch } from "../../app/Store";
import { useDispatch } from "react-redux";
import { TodoStatus } from "../constants/TodoStatus";
import { moveTodo } from "../feature/TodoSlice";

interface TodoProps {
    todo: Todo
}

function TodoCard({ todo }: TodoProps) {
    const dispatch = useDispatch<AppDispatch>()
    const handleClick = () => {
        dispatch(moveTodo({ id: todo.id, to: TodoStatus.In_Progress }))
    }
    return (
        <>
            <a href="#" onClick={handleClick} >
                <div className="todo-card">
                    <h2 className="todo-title">{todo.title}</h2>
                    <p className="todo-description">{todo.description}</p>
                </div>
            </a>
        </>
    );
}

export default TodoCard