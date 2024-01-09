import { useSelector } from 'react-redux';
import '../components/Column.css'
import TodoCard from './TodoCard';
import { RootState } from '../../app/Store';

function InProgress() {
    const inProgressTodos = useSelector((state: RootState) => state.todos.columns.inProgressColumn)
    return (
        <>
            <div className="container">
                <div className="column">
                    {inProgressTodos?.map((todo) => (
                        <TodoCard todo={todo} key={todo.id} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default InProgress