import { useDispatch, useSelector } from 'react-redux';
import '../components/Column.css'
import TodoCard from './TodoCard';
import { AppDispatch, RootState } from '../../app/Store';
import { moveTodo } from '../feature/TodoSlice';
import { TodoStatus } from '../constants/TodoStatus';

function InProgress() {
    const inProgressTodos = useSelector((state: RootState) => state.todos.columns.inProgressColumn)
    const dispatch = useDispatch<AppDispatch>()
    return (
        <>
            <div className="container">
                <div className="column">
                    {inProgressTodos?.map((todo) => (
                        <TodoCard todo={todo} key={todo.id} onCardClick={() => dispatch(moveTodo({ id: todo.id, to: TodoStatus.Done }))} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default InProgress