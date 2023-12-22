import { useDispatch, useSelector } from 'react-redux';
import '../components/Column.css'
import { AppDispatch, RootState } from '../../app/Store';
import TodoCard from './TodoCard';
import { TodoStatus } from '../constants/TodoStatus';
import { moveTodo } from '../feature/TodoSlice';

function Done() {
    const completedTodos = useSelector((state: RootState) => state.todos.columns.completedColumn)
    const dispatch = useDispatch<AppDispatch>()
    const handleClick = (id: number) => {
        dispatch(moveTodo({ id: id, to: TodoStatus.Done }))
    }
    return (
        <>
            <div className="container">
                <div className="Column">
                    {completedTodos?.map((todo) => (
                        <TodoCard todo={todo} key={todo.id} onCardClick={() => handleClick} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Done