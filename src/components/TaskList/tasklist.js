import { useEffect, useState } from 'react';
import './tasklist.css';
import * as S from './list-script';
import { users } from '../../data/users';

export const TaskList = () => {

    if ( window.localStorage.getItem('@task-manager/users') === null ) {
        window.localStorage.setItem('@task-manager/users', JSON.stringify(users))
    }

    const localUserList = JSON.parse(window.localStorage.getItem('@task-manager/users'));

    const [userTasks, setUserTasks] = useState( localUserList[0].tasks );

    const addTask = ()=> {
        setUserTasks(userTasks.concat([
            {
                isDone: true,
                title: 'Comprar pão no mercado, o retorno',
                date: '05-01-2022',
                description: '5.000.000 pães bolacha'
            }
        ]));
    }; // adicionar tarefa no array de tarefas do usuário

    const deleteTask = (e) => {
        let getItem = e.target.parentElement;
        let itemIndex = Array.from(getItem.parentNode.children).indexOf(getItem);
        const excluirIndex = (obj, index) => {
            if (index !== itemIndex) {
                return obj;
            }
        }

        setUserTasks(userTasks.filter(excluirIndex));
    }; // excluir tarefa no array de tarefas do usuário

    useEffect(() => {
        console.log('usertasks effect');
        localUserList[0].tasks = userTasks; 
        window.localStorage.setItem('@task-manager/users', JSON.stringify(localUserList));
    }, [userTasks, localUserList]);

    window.addEventListener('keydown', (e) => {
        if(e.key === 'q') {
            console.log(localUserList);
        }
    });

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
                            <div className='tl-btn' onClick={deleteTask}>🗑️</div>
                            <div className={`tl-desc tl-desc-show-${task.description}`}> {/* parei aqui*/}
                                {task.description}
                            </div>
                        </li>
                        )
                    }) //end map <li>
                }
            </ul>
        </div>
    )
}