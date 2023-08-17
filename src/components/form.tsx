import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styles from '../styles/form.module.css';
import { createWeek, FormProps, Week } from '../ts/interfaces';

async function createInvoice(data: FormData) {
  const newInvoice = Object.fromEntries(data);

  // await prisma.invoice.create({
  //   data: newInvoice,
  // });

  // redirect('/');
}

const TableRows = ({
  removeRow,
  weeks,
  setWeeks,
}: {
  removeRow: (index: number) => void;
  weeks: (Week | undefined)[] | undefined;
  setWeeks: Dispatch<SetStateAction<(Week | undefined)[] | undefined>>;
}) => {
  const handleCellOnChange = (
    cellIndex: number,
    cellType: keyof Week,
    value: string | number | undefined
  ) => {
    if (value === undefined) return;

    const newWeeks: (Week | undefined)[] | undefined = weeks?.map(
      (week, index) => {
        if (index !== cellIndex || !week) return week;
        if (cellType === 'amount') {
          return {
            ...week,
            amount: { hours: parseInt(value as string), minutes: undefined },
          };
        } else
          return {
            ...week,
            [cellType]: value,
          };
      }
    );

    setWeeks(newWeeks);
  };

  return (
    <tbody>
      {weeks?.map((week, index) => (
        <tr>
          <td>
            <input
              type='text'
              id='weekNumber'
              name='weekNumber'
              value={week?.number}
              onChange={({ target }) =>
                handleCellOnChange(index, 'number', target?.value)
              }
            />
          </td>
          <td>
            <input
              type='text'
              id='weekLocation'
              name='weekLocation'
              value={week?.location}
              onChange={({ target }) =>
                handleCellOnChange(index, 'location', target?.value)
              }
            />
          </td>
          <td>
            <input
              type='text'
              id='weekAmount'
              name='weekAmount'
              value={week?.amount?.hours}
              onChange={({ target }) =>
                handleCellOnChange(index, 'amount', target?.value)
              }
            />
          </td>
          <td>
            <input
              type='text'
              id='weekUnitPrice'
              name='weekUnitPrice'
              value={week?.unitPrice}
              onChange={({ target }) =>
                handleCellOnChange(index, 'unitPrice', target?.value)
              }
            />
          </td>
          <td>
            {weeks.length > 1 && (
              <button type='button' onClick={() => removeRow(index)}>
                Ta bort
              </button>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default function Form({ setFormData }: FormProps) {
  const [from, setFrom] = useState<string | undefined>('Zahra Herman DL');
  const [to, setTo] = useState<string | undefined>('');
  const [invoiceNumber, setInvoiceNumber] = useState<string | undefined>();
  const [ourRef, setOurRef] = useState<string | undefined>();
  const [yourRef, setYourRef] = useState<string | undefined>();
  const [company, setCompany] = useState<string | undefined>('Val AB');
  const [address, setAddress] = useState<string | undefined>(
    'Prästgårdsgatan 21'
  );
  const [zipCode, setZipCode] = useState<string | undefined>('431 44');
  const [phone, setPhone] = useState<string | undefined>('(+46)76 305 48 65');
  const [VATid, setVATid] = useState<string | undefined>('SE559203097601');
  const [bankGiro, setBankGiro] = useState<string | undefined>();
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
      <h1>Faktura</h1>
      <div className={styles.description}>
        {/* {invoices.map((invoice) => {
        <div key={invoice.id}>{invoice.title}</div>;
      })} */}
        <form>
          <p>
            <label htmlFor='from'>Från</label>
            <input
              type='text'
              id='from'
              name='from'
              value={from}
              onChange={({ target }) => setFrom(target.value)}
            />
          </p>
          <p>
            <label htmlFor='to'>Till</label>
            <input
              type='text'
              id='to'
              name='to'
              value={to}
              onChange={({ target }) => setTo(target?.value)}
            />
          </p>
          <p>
            <label htmlFor='invoiceNumber'>Fakturanr</label>
            <input
              type='text'
              id='invoiceNumber'
              name='invoiceNumber'
              value={invoiceNumber}
              onChange={({ target }) => setInvoiceNumber(target?.value)}
            />
          </p>
          <p>
            <label htmlFor='ourRef'>Vår ref</label>
            <input
              type='text'
              id='ourRef'
              name='ourRef'
              value={ourRef}
              onChange={({ target }) => setOurRef(target?.value)}
            />
          </p>
          <p>
            <label htmlFor='yourRef'>Er ref</label>
            <input
              type='text'
              id='yourRef'
              name='yourRef'
              value={yourRef}
              onChange={({ target }) => setYourRef(target?.value)}
            />
          </p>
          <p>
            <label htmlFor='company'>Företag</label>
            <input
              type='text'
              id='company'
              name='company'
              value={company}
              onChange={({ target }) => setCompany(target?.value)}
            />
          </p>
          <p>
            <label htmlFor='address'>Adress</label>
            <input
              type='text'
              id='address'
              name='address'
              value={address}
              onChange={({ target }) => setAddress(target?.value)}
            />
          </p>
          <p>
            <label htmlFor='zipCode'>Postnr</label>
            <input
              type='text'
              id='zipCode'
              name='zipCode'
              value={zipCode}
              onChange={({ target }) => setZipCode(target?.value)}
            />
          </p>
          <p>
            <label htmlFor='phone'>Telefon</label>
            <input
              type='text'
              id='phone'
              name='phone'
              value={phone}
              onChange={({ target }) => setPhone(target?.value)}
            />
          </p>
          <p>
            <label htmlFor='VATid'>Momsregistreringsnummer (VAT)</label>
            <input
              type='text'
              id='VATid'
              name='VATid'
              value={VATid}
              onChange={({ target }) => setVATid(target?.value)}
            />
          </p>
          <p>
            <label htmlFor='bankGiro'>Bankgiro</label>
            <input
              type='text'
              id='bankGiro'
              name='bankGiro'
              value={bankGiro}
              onChange={({ target }) => setBankGiro(target?.value)}
            />
          </p>
          <p>
            <label htmlFor='date'>Datum</label>
            <input
              type='text'
              id='date'
              name='date'
              value={date}
              onChange={({ target }) => setDate(target?.value)}
            />
          </p>
          <p>
            <label htmlFor='dueDate'>Förfallodatum</label>
            <input
              type='text'
              id='dueDate'
              name='dueDate'
              value={dueDate}
              onChange={({ target }) => setDueDate(target?.value)}
            />
          </p>
          <table>
            <thead>
              <tr>
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
          <button type='button' onClick={addRow}>
            Lägg till rad
          </button>
          <div className={styles.submitContainer}>
            <a id='download' download='Faktura.pdf'>
              Spara
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
