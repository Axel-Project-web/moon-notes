import React from 'react';

//styles
import './Field.style.css';

function Field({
  value,
  handlerChange,
  icon,
  name,
  type,
  placeholder,
  label,
  errorMsg,
}) {
  return (
    <label className='field'>
      <span>
        {label} {errorMsg ? `- ${errorMsg}` : ''}
      </span>
      <div className='wrapper-input'>
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          onChange={handlerChange}
          value={value}
        />
        <img src={icon} alt='icon' className='img-input' />
      </div>
    </label>
  );
}

export default Field;
