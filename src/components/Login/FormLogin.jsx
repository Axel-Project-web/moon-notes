//styles
import './FormLogin.style.css';

//my-components
import Field from '../Field/Field';

//react-router-dom
import { Form, Link } from 'react-router-dom';

import icon_email from './assets/mail.svg';
import icon_lock from './assets/lock.svg';

// custom-hook
import useFormLogin from './useFormLogin';

function FormLogin() {
  const [form, handlerChange, error, handlerSubmit] = useFormLogin();

  return (
    <Form className='form-login' onSubmit={handlerSubmit}>
      <div className='wrapper-fields'>
        <Field
          value={form.email.content}
          handlerChange={handlerChange}
          name='email'
          icon={icon_email}
          type='text'
          placeholder='example@gmail.com'
          label='email'
          errorMsg={error.errOnEmail}
        />
        <Field
          value={form.password.content}
          handlerChange={handlerChange}
          name='password'
          icon={icon_lock}
          type='password'
          placeholder='********'
          label='password'
          errorMsg={error.errOnPassword}
        />
      </div>
      <div className='keyboard'>
        <input type='submit' value='access' className='btn-login btn-access' />
        <Link className='btn-login btn-go-to-singin' to='/singin'>
          sing in
        </Link>
      </div>
    </Form>
  );
}

export default FormLogin;
