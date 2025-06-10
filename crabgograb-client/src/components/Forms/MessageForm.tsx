import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import { type JoinFormData, joinSchema } from '../../schemas/join-schema';
import classes from './Form.module.scss';
import { useState } from 'react';
import {
  chatMessageSchema,
  type ChatMessageFormData,
} from '../../schemas/chat-schema';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

interface ConnectionFormProps {
  onSend: (name: string) => void;
}

const MessageForm: React.FC<ConnectionFormProps> = ({ onSend }) => {
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
      <form onSubmit={handleSubmit(submitWrapper)}>
        <div className={classes.field}>
          <div className={classes.input_row}>
            <input
              className={classes.input}
              type="text"
              id="messageInput"
              {...register('message')}
              placeholder="Write your message here"
            />
            <button type="submit" className={classes.sendButton}>
              <FontAwesomeIcon icon={faPlay} />
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default MessageForm;
