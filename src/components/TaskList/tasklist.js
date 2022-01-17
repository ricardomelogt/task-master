import { useEffect, useState } from 'react';
import './tasklist.css';
import * as S from './list-script';
import { users } from '../../data/users';
import { Navigate } from 'react-router-dom';

export const TaskList = () => {

    if ( window.localStorage.getItem('@task-manager/users') === null ) {
        window.localStorage.setItem('@task-manager/users', JSON.stringify(users));
    }

    const user = JSON.parse(window.localStorage.getItem('@task-manager/email'));
    const localUserList = JSON.parse(window.localStorage.getItem('@task-manager/users'));
    const findUser = localUserList.find( obj => obj.email === user );

    const [taskIndex, setTaskIndex] = useState();
    const [userTasks, setUserTasks] = useState( findUser.tasks );
    const [orderBy, setOrderBy] = useState('');
    const [toggle, setToggle] = useState(false);

    const [newTitle, setNewTitle] = useState('');
    const [newDate, setNewDate] = useState('');
    const [newDesc, setNewDesc] = useState(''); // fazer novo form para add

    const addTask = ()=> {
        if (newTitle !== '') {
            let [year, month, day] = newDate.split('-');
            setUserTasks(userTasks.concat([
                {
                    isDone: false,
                    title: newTitle,
                    date: newDate,
                    dateNum: parseInt(year+month+day),
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
            let [day, month, year] = newDate.split('-');
            userTasks.splice(taskIndex, 0, {
                isDone: false,
                title: newTitle,
                date: newDate,
                dateNum: parseInt(year+month+day),
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
    }; // edit task 

    const handleOrderBy = () => {
        setOrderBy(document.querySelector('#select-order').value);
        console.log('orderValue: '+orderBy);
        var ordering = document.querySelector('#select-order').value;

        if (ordering === 'date-up') {
            setUserTasks(
                userTasks.sort((a, b) => {
                    if (a.dateNum > b.dateNum) {return 1}
                    if (a.dateNum < b.dateNum) {return -1}
                    return 0;
                })
            );
        };
        if (ordering === 'date-down') {
            setUserTasks(
                userTasks.sort((a, b) => {
                    if (a.dateNum > b.dateNum) {return -1}
                    if (a.dateNum < b.dateNum) {return 1}
                    return 0;
                })
            );
        };
        if (ordering === 'checked') {
            setUserTasks(
                userTasks.sort((a,b)=>{return (a.isDone === b.isDone) ? 0 : a.isDone ? -1 : 1;})
            );
        };
    }; // order by

    const handleCheck = () => {
        setToggle(true);
    };

    useEffect(() => {
        findUser.tasks = userTasks; 
        window.localStorage.setItem('@task-manager/users', JSON.stringify(localUserList));
        setToggle(false);

        console.log('use effect')
    }, [userTasks, findUser, localUserList, toggle]);

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
                <div className='tl-add-btn' onClick={addTask}>+</div>
            </div> {/* Add task area */}

            <div className="tl-edit-task tl-hide">
                <p> Pressione "Esc" para cancelar.</p>
                <div className='tl-container add-area'>
                    <input className='addInputText' type='text' maxLength='32' placeholder='Título.. ✏️' onChange={(e)=>{setNewTitle(e.target.value)}}/>
                    <input className='tl-date add-area' type='date' onChange={(e)=>{setNewDate(e.target.value)}}/>
                    <textarea maxLength='128' placeholder='Descrição(opcional)' onChange={(e)=>{setNewDesc(e.target.value)}}/>
                    <div className='tl-add-btn tl-edit' onClick={confirmEdit}>ok</div>
                </div>
            </div> {/* Edit task lightbox */}

            <div className="tl-order-by">
                <span>Ordenar por: </span>
                <select id='select-order' onChange={handleOrderBy}>
                    <option value="">selecione...</option>
                    <option value='date-up' >data crescente</option>
                    <option value='date-down'>data decrescente</option>
                    <option value='checked'>marcados</option>
                    <option value='unchecked'>desmarcados</option>
                </select>
            </div> {/* select order by */}
            
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
                                <input type="checkbox" className='tl-checkbox' defaultChecked={task.isDone} onChange={(e)=>{userTasks[index].isDone = e.target.checked; handleCheck()}}/>
                                <h3>{task.title}</h3>
                                <div className={`tl-info ${hasDesc()}`} onClick={S.showDescription}>🔽</div>
                            </div>
                            <div className='tl-date'>{task.date}</div>
                            <div className='tl-btn' onClick={handleEdit}>✏️</div>
                            <div className='tl-btn' onClick={deleteTask}>🗑️</div>
                            <div className={`tl-desc tl-desc-show-${task.description}`}>
                                {task.description}
                            </div>
                        </li>
                        )
                    }) //end map <li> tasks
                }
            </ul>
        </div>
    )
}