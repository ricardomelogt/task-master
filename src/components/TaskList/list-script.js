

export const showDescription = (e) => {
    let getTitle = e.target.parentElement;
    let getContainer = getTitle.parentElement;
    let getDesc = getContainer.querySelector('.tl-desc');

    if  ( getDesc.classList.contains('show') ) {
        getDesc.classList.remove('show');
        e.target.classList.remove('turn-up');
    } else {
        getDesc.classList.add('show');
        e.target.classList.add('turn-up');
    }
};

export const deleteItem = (e) => {
    let getItem = e.target.parentElement;

    if ( window.confirm('Deletar Tarefa?') ) {
        getItem.remove();
    }
}; // falta ainda excluir a tarefa da userTasks[]