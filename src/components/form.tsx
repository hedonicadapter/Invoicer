import { createRef, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/form.module.css';
import { createWeek, FormProps, Week } from '../ts/interfaces';
import TableRows from './tableRows';
import EmailDialog from './emailDialog';

export default function Form({ setFormData }: FormProps) {
  const [openEmailDialog, setOpenEmailDialog] = useState<boolean | null>(false);

  const [from, setFrom] = useState<string | undefined>('Zahra Herman DL');
  const [to, setTo] = useState<string | undefined>('');
  const [invoiceNumber, setInvoiceNumber] = useState<string | undefined>();
  const [ourRef, setOurRef] = useState<string | undefined>('559203-0976');
  const [yourRef, setYourRef] = useState<string | undefined>();
  const [company, setCompany] = useState<string | undefined>('Val AB');
  const [address, setAddress] = useState<string | undefined>(
    'Prästgårdsgatan 21'
  );
  const [zipCode, setZipCode] = useState<string | undefined>('431 44');
  const [phone, setPhone] = useState<string | undefined>('(+46)76 305 48 65');
  const [VATid, setVATid] = useState<string | undefined>('SE559203097601');
  const [bankGiro, setBankGiro] = useState<string | undefined>('');
  const [date, setDate] = useState<
    string | number | readonly string[] | undefined
  >();
  const [dueDate, setDueDate] = useState<
    string | number | readonly string[] | undefined
  >();
  const [weeks, setWeeks] = useState<(Week | undefined)[] | undefined>([
    createWeek(),
  ]);

  const addRow = () => {
    const copy = [...(weeks || [])];

    setWeeks([...copy, createWeek()]);
  };

  const removeRow = (index: number) => {
    const copy = [...(weeks || [])];
    copy.splice(index, 1);

    setWeeks([...copy]);
  };

  useEffect(() => {
    setFormData({
      from,
      to,
      invoiceNumber,
      ourRef,
      yourRef,
      company,
      address,
      zipCode,
      phone,
      VATid,
      bankGiro,
      date,
      dueDate,
      weeks,
    });
  }, [
    from,
    to,
    invoiceNumber,
    ourRef,
    yourRef,
    company,
    address,
    zipCode,
    phone,
    VATid,
    bankGiro,
    date,
    dueDate,
    weeks,
  ]);

  return (
    <div className={styles.formContainer}>
      <header>
        <h1>Faktura</h1>
      </header>
      <div className={styles.formBody}>
        <form>
          <div className={styles.formCard}>
            <div className={styles.row}>
              <div className={styles.column}>
                <div className={styles.column}>
                  <label htmlFor='from'>Från</label>
                  <input
                    type='text'
                    id='from'
                    name='from'
                    value={from}
                    onChange={({ target }) => setFrom(target.value)}
                  />
                </div>
                <div className={styles.column}>
                  <label htmlFor='to'>Till</label>
                  <input
                    type='text'
                    id='to'
                    name='to'
                    value={to}
                    onChange={({ target }) => setTo(target?.value)}
                  />
                </div>
              </div>
              <div className={styles.column}>
                <div className={styles.column}>
                  <label htmlFor='date'>Datum</label>
                  <input
                    type='text'
                    id='date'
                    name='date'
                    value={date}
                    onChange={({ target }) => setDate(target?.value)}
                  />
                </div>
                <div className={styles.column}>
                  <label htmlFor='invoiceNumber'>Fakturanr</label>
                  <input
                    type='text'
                    id='invoiceNumber'
                    name='invoiceNumber'
                    value={invoiceNumber}
                    onChange={({ target }) => setInvoiceNumber(target?.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.formCard}>
            <div className={styles.row}>
              <div className={styles.column}>
                <label htmlFor='ourRef'>Vår ref</label>
                <input
                  type='text'
                  id='ourRef'
                  name='ourRef'
                  value={ourRef}
                  onChange={({ target }) => setOurRef(target?.value)}
                />
                <label htmlFor='yourRef'>Er ref</label>
                <input
                  type='text'
                  id='yourRef'
                  name='yourRef'
                  value={yourRef}
                  onChange={({ target }) => setYourRef(target?.value)}
                />
              </div>
              <div className={styles.column}>
                <label htmlFor='company'>Företag</label>
                <input
                  type='text'
                  id='company'
                  name='company'
                  value={company}
                  onChange={({ target }) => setCompany(target?.value)}
                />
                <label htmlFor='address'>Adress</label>
                <input
                  type='text'
                  id='address'
                  name='address'
                  value={address}
                  onChange={({ target }) => setAddress(target?.value)}
                />
              </div>
            </div>
            <div className={styles.column}>
              <label htmlFor='zipCode'>Postnr</label>
              <input
                type='text'
                id='zipCode'
                name='zipCode'
                value={zipCode}
                onChange={({ target }) => setZipCode(target?.value)}
              />
            </div>
          </div>
          <div className={styles.formCard}>
            <div className={styles.column}>
              <label htmlFor='dueDate'>Förfallodatum</label>
              <input
                type='text'
                id='dueDate'
                name='dueDate'
                value={dueDate}
                onChange={({ target }) => setDueDate(target?.value)}
              />
            </div>
          </div>

          <motion.div
            layout
            transition={{ duration: 0.15, type: 'linear' }}
            className={styles.formCard}
          >
            <table>
              <thead>
                <tr>
                  <th>Utfört av ZH</th>
                  <th>Vecka</th>
                  <th>Tjänsteställe</th>
                  <th>Antal</th>
                  <th>À-pris</th>
                </tr>
              </thead>

              <TableRows
                removeRow={removeRow}
                weeks={weeks}
                setWeeks={setWeeks}
              />
            </table>
            <a className={styles.addRowContainer} onClick={addRow}>
              Lägg till rad
            </a>
          </motion.div>

          <div className={styles.formCard}>
            <div className={styles.column}>
              <label htmlFor='VATid'>Momsregistreringsnummer (VAT)</label>
              <input
                type='text'
                id='VATid'
                name='VATid'
                value={VATid}
                onChange={({ target }) => setVATid(target?.value)}
              />
            </div>
            <div className={styles.column}>
              <label htmlFor='bankGiro'>Bankgiro</label>
              <input
                type='text'
                id='bankGiro'
                name='bankGiro'
                value={bankGiro}
                onChange={({ target }) => setBankGiro(target?.value)}
              />
            </div>
            <div className={styles.column}>
              <label htmlFor='phone'>Telefon</label>
              <input
                type='text'
                id='phone'
                name='phone'
                value={phone}
                onChange={({ target }) => setPhone(target?.value)}
              />
            </div>
          </div>
          <div className={[styles.row, styles.buttonGroup].join(' ')}>
            <a
              className={[styles.emailContainer, styles.outsideButton].join(
                ' '
              )}
              id='email'
              onClick={() => setOpenEmailDialog(true)}
            >
              Maila
            </a>
            <a
              className={[styles.outsideButton, styles.submitContainer].join(
                ' '
              )}
              id='download'
              download='Faktura.pdf'
            >
              Spara
            </a>
          </div>
        </form>
        {/* <EmailDialog
          open={openEmailDialog}
          setOpen={setOpenEmailDialog}
          from={from}
        /> */}
      </div>
    </div>
  );
}
