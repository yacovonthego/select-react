import React, { useRef } from 'react';
import { ReactComponent as Cross } from '../icon/cross.svg';

const Dropdown = ({ options, selectedValue, changeHandler, deleteHandler }) => {
  const itemsEl = useRef();
  
  return (
    <div className="dropdown__items" ref={itemsEl}>
      {options.map((item, index) => (
        <div 
          className={`dropdown__item item-${index} ${selectedValue === item.name ? 'selected' : ''}`}
          key={item.id}
        >
          <span onClick={() => changeHandler(item, index)}>{item.name}</span>
          { options.length > 1 &&
            <div className='dropdown__delete' onClick={() => deleteHandler(index)}>
              <Cross/>
            </div>
          }
        </div>
      ))}
    </div>
  )
}

export default Dropdown;