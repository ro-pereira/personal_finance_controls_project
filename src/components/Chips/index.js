import './style.css';

import removeIcon from '../../assets/removeChip.svg';
import addIcon from '../../assets/addIcon.svg'

function Chip({ title, selected, handleSelectChip }) {
    return (
        <div 
        className={`container__chip ${selected && 'selected__chip'}`}
        onClick={() => handleSelectChip(title)}>
            <span>{title}</span>
            <img src={selected ? removeIcon : addIcon}
            className='icon__Chip' alt='chip icon' />
        </div>
    )
}

export default Chip;