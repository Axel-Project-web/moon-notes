import { useState } from 'react';

//react-router-dom
import { useSubmit } from 'react-router-dom';

const init_form = {
  email: {
    content: '',
    isValid: false,
  },
  password: {
    content: '',
    isValid: false,
  },
  phone: {
    content: '',
    isValid: false,
  },
};

const init_error = {
  errOnEmail: undefined,
  errOnPassword: undefined,
  errOnPhone: undefined,
};

const regexp = {
  email: /^[a-z0-9\_\.]+\@[a-z0-9\_\.]+$/i,
  password: /^[\w\d\.\_]+$/i,
  phone: /^[\d]{11}$/,
};

function useFormSingup() {
  const [form, setForm] = useState(init_form);
  const [error, setError] = useState(init_error);
  const submit = useSubmit();

  function handlerChange({ target }) {
    const { name, value } = target;
    setForm({
      ...form,
      [name]: {
        content: value,
        isValid: regexp[name].test(value),
      },
    });
  }

  function handlerSubmit(e) {
    e.preventDefault();
    const { email, password, phone } = form;
    if (email.isValid && password.isValid && phone.isValid) {
      setError(init_error);
      const userToRegister = {};
      for (let key in form) userToRegister[key] = form[key].content;
      fetch('http://localhost:8080/register', {
        method: 'POST',
        body: JSON.stringify(userToRegister),
        headers: { 'Content-type': 'Application/json' },
      })
        .then(res =>
          res.ok
            ? res.json()
            : Promise.reject({ status: res.status, statusText: res.statusText })
        )
        .then(json => {
          console.log(json);
          //submit(userToRegister, { method: 'post', action: '/dashboard' });
        })
        .catch(err => {
          const { statusText } = err;
          setError({
            ...error,
            errOnEmail: statusText,
          });
        });
    } else {
      setError({
        errOnEmail: !email.isValid && 'Correo inválido',
        errOnPassword: !password.isValid && 'Clave inválido',
        errOnPhone: !phone.isValid && 'Número inválido',
      });
    }
  }

  return [form, handlerChange, error, handlerSubmit];
}

export default useFormSingup;
