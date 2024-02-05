//styles
import './FormSingin.style.css';

//my-components
import Field from '../Field/Field';

//react-router-dom
import { Form, Link } from 'react-router-dom';

import icon_email from './assets/mail.svg';
import icon_lock from './assets/lock.svg';
import icon_phone from './assets/phone.svg';
import useFormSingup from './useFormSingup';

function FormSingin() {
  const [form, handlerChange, error, handlerSubmit] = useFormSingup();

  return (
    <Form className='form-singin' onSubmit={handlerSubmit}>
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
        <Field
          value={form.phone.content}
          handlerChange={handlerChange}
          name='phone'
          icon={icon_phone}
          type='phone'
          placeholder='000-000-000'
          label='phone'
          errorMsg={error.errOnPhone}
        />
      </div>
      <div className='keyboard'>
        <input type='submit' value='create' className='btn-singin btn-access' />
        <Link className='btn-singin btn-go-to' to='/'>
          login
        </Link>
      </div>
    </Form>
  );
}

export default FormSingin;
