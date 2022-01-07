import './tasklist.css';
import * as S from './list-script';
import { useState } from 'react';

export const TaskList = () => {

    const [userTasks, setUserTasks] = useState( [
        {
            isDone: false,
            title: 'Task title',
            date: '03-01-2022',
            description: '...'
        },
        {
            isDone: false,
            title: 'Task title',
            date: '03-01-2022',
            description: '...'
        },
        {
            isDone: true,
            title: 'Comprar pão no mercado',
            date: '05-01-2022',
            description: '10 pães bolacha, 05 franceses e 08 pães doces.'
        }
    ] )

    const addTask = ()=> {
        setUserTasks(userTasks.concat([
            {
                isDone: true,
                title: 'Comprar pão no mercado',
                date: '05-01-2022',
                description: '10 pães bolacha, 05 franceses e 08 pães doces.'
            }
        ]))
        console.log(userTasks)
    }

    return (
        <div className='tasklist-wrapper'>
            <div className='tl-add-btn' onClick={addTask}>ADICIONAR</div>
            <ul className='tl-list'>
                {   
                    userTasks.map((task, index)=>{
                        return(
                        <li key={index} className='tl-container tl-item'>
                            <div className='tl-title'>
                                <input type="checkbox" className='tl-checkbox' defaultChecked={task.isDone} onChange={(e)=>{userTasks[index].isDone = e.target.checked}}/>
                                <h3>{task.title}</h3>
                                <div className='tl-info' onClick={S.showDescription}>🔽</div>
                            </div>
                            <div className='tl-date'>{task.date}</div>
                            <div className='tl-btn'>✏️</div>
                            <div className='tl-btn' onClick={S.deleteItem}>🗑️</div>
                            <div className={`tl-desc tl-desc-show-${task.description}`}> {/* parei aqui*/}
                                {task.description + ' ' + task.isDone}
                            </div>
                        </li>
                        )
                    }) //end map <li>
                }
            </ul>
        </div>
    )
}