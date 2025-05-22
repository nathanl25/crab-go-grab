import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import { type JoinFormData, joinSchema } from '../../schemas/join-schema';
import classes from './Form.module.scss';
import { useState } from 'react';
import Button from '../Button/Button';
import {
  chatMessageSchema,
  type ChatMessageFormData,
} from '../../schemas/chat-schema';

interface ConnectionFormProps {
  onSend: (name: string) => void;
}

const JoinForm: React.FC<ConnectionFormProps> = ({ onSend }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ChatMessageFormData>({
    resolver: zodResolver(chatMessageSchema),
  });

  const submitWrapper = (data: ChatMessageFormData) => {
    setErrorMessage('');
    onSend(data.message);
    console.log(data);
  };

  return (
    <>
      <form
        className={classes.container}
        onSubmit={handleSubmit(submitWrapper)}
      >
        <div className={classes.field}>
          <div className={classes.error_row}>
            {errors?.message && <p>{errors?.message.message}</p>}
          </div>
          <div className={classes.input_row}>
            <input
              className={classes.input}
              type="text"
              id="messageInput"
              {...register('message')}
              placeholder="Write your message here"
            />
            <Button>Send</Button>
          </div>
          <div className={classes.submit}>
            <p className={classes.error_row}>{errorMessage}</p>
          </div>
        </div>
      </form>
    </>
  );
};

export default JoinForm;
