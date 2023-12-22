import { useSelector } from 'react-redux';
import '../components/Column.css'
import { RootState } from '../../app/Store';
import TodoCard from './TodoCard';

function Done() {
    const completedTodos = useSelector((state: RootState) => state.todos.columns.inProgressColumn)
    return (
        <>
            <div className="container">
                <div className="Column">
                    {completedTodos?.map((todo) => (
                        <TodoCard todo={todo} key={todo.id} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Done