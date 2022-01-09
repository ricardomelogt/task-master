import { useEffect, useState } from 'react';
import './tasklist.css';
import * as S from './list-script';
import { users } from '../../data/users';
import { Navigate } from 'react-router-dom';

export const TaskList = () => {

    if ( window.localStorage.getItem('@task-manager/users') === null ) {
        window.localStorage.setItem('@task-manager/users', JSON.stringify(users))
    }

    const user = JSON.parse(window.localStorage.getItem('@task-manager/email'));
    const localUserList = JSON.parse(window.localStorage.getItem('@task-manager/users'));
    const findUser = localUserList.find( obj => obj.email === user );

    const [userTasks, setUserTasks] = useState( findUser.tasks );
    const [newTitle, setNewTitle] = useState('Escreva aqui...');
    const [newDate, setNewDate] = useState('');
    const [newDesc, setNewDesc] = useState(''); // fazer novo form para add

    const addTask = ()=> {
        setUserTasks(userTasks.concat([
            {
                isDone: false,
                title: newTitle,
                date: newDate,
                description: newDesc
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
        };
        setUserTasks(userTasks.filter(excluirIndex));
    }; // excluir tarefa no array de tarefas do usuário

    useEffect(() => {
        console.log('usertasks effect');
        findUser.tasks = userTasks; 
        window.localStorage.setItem('@task-manager/users', JSON.stringify(localUserList));
    }, [userTasks, findUser, localUserList]);

    window.addEventListener('keydown', (e) => {
        if(e.key === 'q') {
            console.log(findUser);
        }
    });

    if (findUser === undefined) {
        alert('user undefined');
        return <Navigate to='/'/>
    }
    console.log(findUser);

    return (
        <div className='tasklist-wrapper'>
            <div className='tl-container'>
               <input className='addInputText' type='text' maxLength='23' placeholder='Nova Tarefa' onChange={(e)=>{setNewTitle(e.target.value)}}/>
                <input type='date' placeholder='Data' onChange={(e)=>{setNewDate(e.target.value)}}/>
                <input type='text' maxLength='255' placeholder='Descrição(opcional)' onChange={(e)=>{setNewDesc(e.target.value)}}/>
                <div className='tl-add-btn' onClick={addTask}>ADICIONAR</div>
            </div>
            
            <ul className='tl-list'>
                {   
                    userTasks.map((task, index)=>{
                        const hasDesc = ()=>{
                            if ( task.description.length === 0 ) {
                                return 'hideArrow';
                            };
                        }
                        console.log()
                        return(
                        <li key={index} className='tl-container tl-item'>
                            <div className='tl-title'>
                                <input type="checkbox" className='tl-checkbox' defaultChecked={task.isDone} onChange={(e)=>{userTasks[index].isDone = e.target.checked}}/>
                                <h3>{task.title}</h3>
                                <div className={`tl-info ${hasDesc()}`} onClick={S.showDescription}>🔽</div>
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