import { useSelector } from 'react-redux';
import '../components/Column.css'
import { RootState } from '../../app/Store';
import TodoCard from './TodoCard';

function InProgress() {
    const inProgressTodos = useSelector((state: RootState) => state.todos.columns.inProgressColumn)
    return (
        <>
            <div className="container">
                <div className="Column">
                    {inProgressTodos?.map((todo) => (
                        <TodoCard todo={todo} key={todo.id} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default InProgress