import './tasklist.css';

export const TaskList = () => {
    return (
        <div className='tasklist-wrapper'>
            <div className='tl-container'>...</div>
            <div className='tl-container'>...</div>
            <div className='tl-container'>
                <div className='tl-desc'>Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum </div>
                <div className='tl-title'>
                    <input type="checkbox" className='tl-checkbox' name="vehicle1"/>
                    <h3>Comprar pão no supermercado</h3>
                    <div className='tl-arrow'>🔽</div>
                </div>
                <div className='tl-date'>03-01-2022</div>
                <div className='tl-btn'>✏️</div>
                <div className='tl-btn'>🗑️</div>
            </div>
        </div>
    )
}