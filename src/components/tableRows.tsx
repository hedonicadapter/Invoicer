import { Dispatch, SetStateAction } from 'react';
import { Week } from '../ts/interfaces';

export default function TableRows({
  removeRow,
  weeks,
  setWeeks,
}: {
  removeRow: (index: number) => void;
  weeks: (Week | undefined)[] | undefined;
  setWeeks: Dispatch<SetStateAction<(Week | undefined)[] | undefined>>;
}) {
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
            amount: {
              hours: value ? parseInt(value as string) : 0,
              minutes: undefined,
            },
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
}
