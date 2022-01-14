import { useEffect, useState } from 'react';
import './tasklist.css';
import * as S from './list-script';
import { users } from '../../data/users';
import { Navigate } from 'react-router-dom';

export const TaskList = () => {

    if ( window.localStorage.getItem('@task-manager/users') === null ) {
        window.localStorage.setItem('@task-manager/users', JSON.stringify(users));
    }

    const [taskIndex, setTaskIndex] = useState();
    const user = JSON.parse(window.localStorage.getItem('@task-manager/email'));
    const localUserList = JSON.parse(window.localStorage.getItem('@task-manager/users'));
    const findUser = localUserList.find( obj => obj.email === user );

    const [userTasks, setUserTasks] = useState( findUser.tasks );
    const [newTitle, setNewTitle] = useState('');
    const [newDate, setNewDate] = useState('');
    const [newDesc, setNewDesc] = useState(''); // fazer novo form para add

    const addTask = ()=> {
        if (newTitle !== '') {
            setUserTasks(userTasks.concat([
                {
                    isDone: false,
                    title: newTitle,
                    date: newDate,
                    description: newDesc
                }
            ]));
            document.querySelectorAll('input, textarea').forEach(element => {
                element.value = '';
            });
            setNewTitle('');setNewDate('');setNewDesc('');
        } else {
            alert('A tarefa precisa ao menos ter um título');
        }
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

    const handleEdit = (e) => {
        let getItem = e.target.parentElement;
        setTaskIndex(Array.from(getItem.parentNode.children).indexOf(getItem));

        const lightBox = document.querySelector('.tl-edit-task');

        if ( lightBox.classList.contains('tl-hide') ) {
           lightBox.classList.remove('tl-hide');
           window.addEventListener('keyup', (e) => {
               if ( e.key === 'Escape' ) {
                   lightBox.classList.add('tl-hide');
               }
           });
        } // edit mode lightbox show/hide
    };

    const confirmEdit = () => {
        if(newTitle !== '') {
            document.querySelector('.tl-edit-task').classList.add('tl-hide');
            userTasks.splice(taskIndex, 0, {
                isDone: false,
                title: newTitle,
                date: newDate,
                description: newDesc
            } );
            const excluirIndex = (obj, index) => {
                if (index !== (taskIndex+1)) {
                    return obj;
                }
            };
            setUserTasks(userTasks.filter(excluirIndex));
            setNewTitle('');setNewDate('');setNewDesc('');
            document.querySelectorAll('input, textarea').forEach(element => {
                element.value = '';
            });
        } else {
            alert('A tarefa deve ter um título');
        }
    };

    useEffect(() => {
        findUser.tasks = userTasks; 
        window.localStorage.setItem('@task-manager/users', JSON.stringify(localUserList));
    }, [userTasks, findUser, localUserList]);

    if (findUser === undefined) {
        alert('user undefined');
        return <Navigate to='/'/>
    }

    return (
        <div className='tasklist-wrapper'>
            <div className='tl-container add-area'>
               <input className='addInputText' type='text' maxLength='32' placeholder='Nova Tarefa.. ✏️' onChange={(e)=>{setNewTitle(e.target.value)}}/>
                <input className='tl-date add-area' type='date' onChange={(e)=>{setNewDate(e.target.value)}}/>
                <textarea maxLength='128' placeholder='Descrição(opcional)' onChange={(e)=>{setNewDesc(e.target.value)}}/>
                <div className='tl-add-btn' onClick={addTask()}>+</div>
            </div>

            <div className="tl-edit-task tl-hide">
                <p> Pressione "Esc" para cancelar.</p>
                <div className='tl-container add-area'>
                    <input className='addInputText' type='text' maxLength='32' placeholder='Título.. ✏️' onChange={(e)=>{setNewTitle(e.target.value)}}/>
                    <input className='tl-date add-area' type='date' onChange={(e)=>{setNewDate(e.target.value)}}/>
                    <textarea maxLength='128' placeholder='Descrição(opcional)' onChange={(e)=>{setNewDesc(e.target.value)}}/>
                    <div className='tl-add-btn tl-edit' onClick={confirmEdit}>ok</div>
                </div>
            </div>
            
            <ul className='tl-list'>
                {   
                    userTasks.map((task, index)=>{
                        const hasDesc = ()=>{
                            if ( task.description.length === 0 ) {
                                return 'hideArrow';
                            };
                        }
                        return(
                        <li key={index} className='tl-container tl-item'>
                            <div className='tl-title'>
                                <input type="checkbox" className='tl-checkbox' defaultChecked={task.isDone} onChange={(e)=>{userTasks[index].isDone = e.target.checked}}/>
                                <h3>{task.title}</h3>
                                <div className={`tl-info ${hasDesc()}`} onClick={S.showDescription}>🔽</div>
                            </div>
                            <div className='tl-date'>{task.date}</div>
                            <div className='tl-btn' onClick={handleEdit}>✏️</div>
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