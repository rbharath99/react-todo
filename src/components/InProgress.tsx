import { useDispatch, useSelector } from 'react-redux';
import '../components/Column.css'
import TodoCard from './TodoCard';
import { AppDispatch, RootState } from '../../app/Store';
import { moveTodo } from '../feature/TodoSlice';
import { TodoStatus } from '../constants/TodoStatus';

function InProgress() {
    const inProgressTodos = useSelector((state: RootState) => state.todos.columns.inProgressColumn)
    const dispatch = useDispatch<AppDispatch>()
    const handleClick = (id: number) => {
        dispatch(moveTodo({ id: id, to: TodoStatus.Done }))
    }
    return (
        <>
            <div className="container">
                <div className="Column">
                    {inProgressTodos?.map((todo) => (
                        <TodoCard todo={todo} key={todo.id} onCardClick={() => handleClick} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default InProgress