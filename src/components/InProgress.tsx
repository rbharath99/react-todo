import { useSelector } from 'react-redux';
import '../components/Column.css'
import { RootState } from '../../app/Store';

function InProgress() {
    const inProgressColumn = useSelector((state: RootState) => state.todos.columns.inProgressColumn)
    console.log(inProgressColumn)
    return (
        <>
            <div className="container">
                <div className="Column">
                    <p>List of in progress tasks</p>
                </div>
            </div>
        </>
    );
}

export default InProgress