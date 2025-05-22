import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import { type JoinFormData, joinSchema } from '../../schemas/join-schema';
import classes from './Form.module.scss';
import { useState } from 'react';
import Button from '../Button/Button';

interface ConnectionFormProps {
  connected: boolean;
  onConnect: (name: string) => void;
  onDisconnect: () => void;
}

const JoinForm: React.FC<ConnectionFormProps> = ({
  connected,
  onConnect,
  onDisconnect,
}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const {
    handleSubmit,
    register,
    // control,
    formState: { errors },
  } = useForm<JoinFormData>({
    resolver: zodResolver(joinSchema),
  });

  const submitWrapper = (data: JoinFormData) => {
    setErrorMessage('');
    // console.log(data);
    if (connected) {
      onDisconnect();
    } else {
      onConnect(data.name);
    }
  };

  return (
    <>
      <form
        className={classes.container}
        onSubmit={handleSubmit(submitWrapper)}
      >
        <div className={classes.field}>
          <div className={classes.error_row}>
            {errors?.name && <p>{errors?.name.message}</p>}
          </div>
          <div className={classes.input_row}>
            <label htmlFor="nameInput" className={classes.label}>
              Name:
            </label>
            <input
              className={classes.input}
              type="text"
              id="nameInput"
              {...register('name')}
              placeholder="Write your name here"
            />
          </div>
        </div>
        <div className={classes.submit}>
          <Button>{connected ? 'Leave' : 'Join'}</Button>
          <p className={classes.error_row}>{errorMessage}</p>
        </div>
      </form>
    </>
  );
};

export default JoinForm;
