import { Dispatch, SetStateAction } from 'react';
import { Week } from '../ts/interfaces';
import styles from '../styles/form.module.css';
import { AnimatePresence, motion } from 'framer-motion';

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
      <AnimatePresence>
        {weeks?.map((week, index) => (
          <motion.tr
            key={index}
            style={{ originY: 0 }}
            initial={{ height: 0, opacity: 0, scaleY: 0 }}
            animate={{ height: 'auto', opacity: 1, scaleY: 1 }}
            exit={{ height: 0, opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.15, type: 'tween' }}
          >
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
                type='number'
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
            <motion.td>
              <AnimatePresence>
                {weeks.length > 1 && (
                  <motion.a
                    whileTap={{ opacity: 0.5 }}
                    style={{ originX: 1 }}
                    initial={{ width: 0, opacity: 0, scaleX: 0 }}
                    animate={{ width: 'auto', opacity: 1, scaleX: 1 }}
                    exit={{ width: 0, opacity: 0, scaleX: 0 }}
                    transition={{ duration: 0.15, type: 'tween' }}
                    className={styles.removeRowContainer}
                    onClick={() => removeRow(index)}
                  >
                    Ta bort
                  </motion.a>
                )}
              </AnimatePresence>
            </motion.td>
          </motion.tr>
        ))}
      </AnimatePresence>
    </tbody>
  );
}
