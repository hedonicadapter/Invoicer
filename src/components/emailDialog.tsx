import emailjs from '@emailjs/browser';
import {
  forwardRef,
  useRef,
  Ref,
  ForwardedRef,
  useEffect,
  useState,
} from 'react';
import { EmailData } from '../ts/interfaces';
import styles from '../styles/form.module.css';

const sendEmail = (emailData: EmailData) => {
  emailjs
    .send('ValAB', 'template_4bnuy5m', emailData, 'f6zPVMFqo8KGwmJlS')
    .then(
      (response) => {
        console.log('Success: ', response.status, response.text);
      },
      (err) => {
        console.log('Error: ', err);
      }
    );
};

const EmailDialog = ({
  toggle,
  from,
}: {
  toggle: boolean | null;
  from: string | undefined;
}) => {
  const ref = useRef<HTMLDialogElement | null>(null);
  const [recipient, setRecipient] = useState('');
  const [name, setName] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [bcc, setBcc] = useState(true);

  const openEmailDialog = () => ref.current?.showModal();

  const handleSend = () => {
    const emailData = {
      from,
      recipient,
      message: emailBody,
      to: name,
      //   bcc,
    };

    sendEmail(emailData);
  };

  useEffect(() => {
    openEmailDialog();
  }, [toggle]);

  return (
    <dialog className={[styles.formCard, styles.dialog].join(' ')} ref={ref}>
      <form method='dialog'>
        <div className={styles.row}>
          <label htmlFor='recipient'>Till:</label>
          <input
            name='recipient'
            type='email'
            placeholder='example@gmail.com'
            value={recipient}
            onChange={({ target }) => setRecipient(target?.value)}
            required
          />
        </div>
        <div className={styles.row}>
          <label htmlFor='name'>Hej</label>
          <input
            name='name'
            type='text'
            value={name}
            placeholder='Sam'
            onChange={({ target }) => setName(target?.value)}
            required
          />
          ,
        </div>
        <div className={styles.row}>
          <textarea
            aria-label='Write your email body'
            name='emailBody'
            placeholder='Min faktura är bifogad nedan.'
            value={emailBody}
            onChange={({ target }) => setEmailBody(target?.value)}
          />
        </div>
        <div className={styles.row}>
          <input
            name='bcc'
            type='checkbox'
            checked={bcc}
            onChange={() => setBcc(!bcc)}
          />
          <label htmlFor='bcc'>Skicka en kopia till mig</label>
        </div>
        <div className={[styles.row, styles.buttonGroup].join(' ')}>
          <button
            className={[styles.danger, styles.outsideButton].join(' ')}
            id='close'
            formNoValidate
          >
            Avbryt
          </button>
          <button
            className={styles.outsideButton}
            type='submit'
            onClick={handleSend}
          >
            Skicka
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default EmailDialog;
