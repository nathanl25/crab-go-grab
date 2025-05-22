import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import classes from './Form.module.scss';
import { useState } from 'react';
import Button from '../Button/Button';
import { rollSchema, type RollFormData } from '../../schemas/roll-schema';

interface RollFormProps {
  onRoll: () => void;
}

const RollForm: React.FC<RollFormProps> = ({ onRoll }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RollFormData>({
    resolver: zodResolver(rollSchema),
  });

  const submitWrapper = (data: RollFormData) => {
    setErrorMessage('');
    // onRoll(parseInt(data.roll));
    onRoll();
  };

  return (
    <form className={classes.container} onSubmit={handleSubmit(submitWrapper)}>
      <div className={classes.field}>
        <div className={classes.error_row}>
          {errors?.roll && <p>{errors?.roll.message}</p>}
        </div>
        <div className={classes.radio_group}>
          {[1, 2, 3, 4, 5, 6].map((number) => (
            <div key={number} className={classes.radio_option}>
              <input
                type="radio"
                id={`roll${number}`}
                value={`${number}`}
                {...register('roll')}
              />
              <label htmlFor={`roll${number}`}>{number}</label>
            </div>
          ))}
        </div>
        <div className={classes.submit}>
          <Button>Roll</Button>
          <p className={classes.error_row}>{errorMessage}</p>
        </div>
      </div>
    </form>
  );
};

export default RollForm;
