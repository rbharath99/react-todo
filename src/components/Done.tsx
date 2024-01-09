import { useSelector } from 'react-redux';
import '../components/Column.css'
import { RootState } from '../../app/Store';
import TodoCard from './TodoCard';

function Done() {
    const completedTodos = useSelector((state: RootState) => state.todos.columns.completedColumn)
    return (
        <>
            <div className="container">
                <div className="column">
                    {completedTodos?.map((todo) => (
                        <TodoCard todo={todo} key={todo.id} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Done