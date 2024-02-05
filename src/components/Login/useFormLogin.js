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
};

const init_error = {
  errOnEmail: undefined,
  errOnPassword: undefined,
};

const regexp = {
  email: /^[a-z0-9\_\.]+\@[a-z0-9\_\.]+$/i,
  password: /^[\w\d\.\_]+$/i,
};

function useFormLogin() {
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
    const { email, password } = form;
    if (email.isValid && password.isValid) {
      setError(init_error);
      const userToFind = {};
      for (let key in form) userToFind[key] = form[key].content;
      fetch('http://localhost:8080/login', {
        method: 'POST',
        body: JSON.stringify(userToFind),
        headers: { 'Content-type': 'Application/json' },
      })
        .then(res =>
          res.ok
            ? res.json()
            : Promise.reject({ status: res.status, statusText: res.statusText })
        )
        .then(() => {
          submit(userToFind, { method: 'post', action: '/dashboard' });
        })
        .catch(err =>
          setError({
            errOnEmail: err.statusText,
            errOnPassword: err.statusText,
          })
        );
    } else {
      setError({
        errOnEmail: !email.isValid && 'Correo inválido',
        errOnPassword: !password.isValid && 'Clave inválido',
      });
    }
  }

  return [form, handlerChange, error, handlerSubmit];
}

export default useFormLogin;
