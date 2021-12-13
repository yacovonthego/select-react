import React, { useState, useRef, useEffect, useCallback } from "react";
import Dropdown from "./Dropdown";
import { ReactComponent as Arrow } from '../icon/arrow.svg';
import { ReactComponent as Check } from '../icon/check.svg';

const GroupControl = ({ label, values, selected }) => {
  const [ selectedValue, setSelectedValue ] = useState(values[selected]);
  const [ inputValue, setInputValue ] = useState('');
  const [ options, setOptions ] = useState(values);
  const [ shown, setShown ] = useState(false);
  const [ addShown, setAddShown ] = useState(false);
  
  const dropdownEl = useRef();
  const searchInputEl = useRef();

  const handleOutside = useCallback(
    (e) => {
      if (dropdownEl.current && !dropdownEl.current.contains(e.target))
        setShown(false);
    }, [])


  const changeHandler = (item, index) => {
    setSelectedValue(item);
    setInputValue(item.name);
    setShown(false);
  };

  const deleteHandler = (index) => {
    const optionsArr = [...options];
    optionsArr.splice(index, 1);

    setOptions(optionsArr);
    setInputValue('');
  }

  const inputChangeHandler = e => {
    const filteredOptions = values.filter(opt => 
      opt.name.toLowerCase().includes(e.target.value.trim().toLowerCase())
    )

    setInputValue(e.target.value);

    if (filteredOptions.length === 0) {
      setAddShown(true)
    }
  }

  const addOptionHandler = e => {
    let id = generateId();

    // eslint-disable-next-line no-loop-func
    while(options.some(item => item.id === id)) {
      id = generateId();
    }

    setOptions([
      ...options,
      {
        id,
        name: inputValue
      }
    ])
    setInputValue('');
    // searchInputEl.current.focus();
    // setAddShown(false);
  }

  const generateId = () => Math.random().toString(36).substring(2,6);

  useEffect(() => {
    document.addEventListener('mousedown', handleOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleOutside)
    }
  }, [handleOutside]);

  return (
    <div>
      <div className="form__group">
        <div className="dropdown" ref={dropdownEl}>
          <div className="dropdown__selected">
            <label htmlFor='search'>
              <span className="dropdown__label">{ label }</span>
              <div className="dropdown__wrapper">
                <div className="dropdown__search">
                  <input 
                    type="text" 
                    placeholder='Поиск. . .'
                    value={inputValue}
                    onInput={inputChangeHandler}
                    ref={searchInputEl}
                    name='search'
                  />
                  { options.length !== 0 && 
                    <div className="dropdown__expand" onClick={() => setShown(!shown)}>
                      <Arrow/>
                    </div>
                  }
                  { (addShown && inputValue.length) ?  
                    <div className="dropdown__accept" onClick={() => addOptionHandler()}>
                      <Check/>
                    </div> : null
                  }
                </div>
                <div className={`dropdown__menu ${shown ? 'open' : null}`}>
                  <Dropdown 
                    changeHandler={changeHandler}
                    deleteHandler={deleteHandler}
                    options={options}
                    selectedValue={selectedValue}
                  /> 
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GroupControl;