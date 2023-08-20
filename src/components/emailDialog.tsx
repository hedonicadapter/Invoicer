import emailjs from '@emailjs/browser';
import { useRef, useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Switch from 'react-switch';
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
        <div className={[styles.column, styles.emailBody].join(' ')}>
          <div className={styles.row}>
            <label htmlFor='recipient'>Till:</label>
            <input
              autoFocus
              name='recipient'
              type='email'
              placeholder='example@gmail.com'
              value={recipient}
              onChange={({ target }) => setRecipient(target?.value)}
              required
            />
          </div>
          <div className={[styles.row, styles.emailFirstLine].join(' ')}>
            <label htmlFor='name'>Hej</label>
            <span
              className={styles.fakeInput}
              contentEditable={true}
              placeholder='Sam'
              onChange={({ currentTarget }) =>
                setName(currentTarget?.innerText)
              }
            >
              {name}
            </span>
            <label id={styles.firstLineComma} htmlFor='name'>
              ,
            </label>
          </div>

          <div className={styles.row}>
            <TextareaAutosize
              aria-label='Write your email body'
              name='emailBody'
              placeholder={`Min faktura är bifogad nedan.`}
              value={emailBody}
              onChange={({ target }) => setEmailBody(target?.value)}
            />
          </div>
        </div>
        <div onClick={() => setBcc(!bcc)}>
          <label htmlFor='bcc'>
            <Switch
              onColor='#617A55'
              height={20}
              width={38}
              handleDiameter={12}
              offColor='#333333'
              offHandleColor='#7b7b7b'
              checkedIcon={false}
              uncheckedIcon={false}
              className={[styles.bccCheckbox, bcc && 'bccCheckboxChecked'].join(
                ' '
              )}
              borderRadius={3}
              name='bcc'
              type='checkbox'
              checked={bcc}
              onChange={() => {}}
            />
            <span> Skicka en kopia till mig</span>
          </label>
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
