import emailjs from '@emailjs/browser';
import { useRef, useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Switch from 'react-switch';
import { EmailData } from '../ts/interfaces';
import styles from '../styles/form.module.css';
import { getFile } from './documents';

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
  open,
  setOpen,
  from,
}: {
  open: boolean | null;
  setOpen: (open: boolean) => void;
  from: string | undefined;
}) => {
  const ref = useRef<HTMLDialogElement | null>(null);
  const [recipient, setRecipient] = useState<string>('');
  const [name, setName] = useState<string | undefined>('');
  const [emailBody, setEmailBody] = useState('');
  const [bcc, setBcc] = useState(true);

  const openEmailDialog = () => ref.current?.showModal();

  const handleSend = async ({ from, recipient, message, to }: EmailData) => {
    const file = await getFile();

    const emailData = {
      from,
      recipient,
      message,
      to,
      content: file,
      //   bcc,
    };

    sendEmail(emailData);
  };

  useEffect(() => {
    if (open) openEmailDialog();
  }, [open]);

  return (
    <dialog
      onClose={() => setOpen(false)}
      className={[styles.formCard, styles.dialog].join(' ')}
      ref={ref}
    >
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
              suppressContentEditableWarning={true}
              placeholder='Sam'
              onBlur={({ currentTarget }) =>
                setName(currentTarget?.textContent || '')
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
            onClick={() =>
              handleSend({ from, recipient, message: emailBody, to: name })
            }
          >
            Skicka
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default EmailDialog;
