import './styles/App.css';
import DocumentContainer from './components/documents';
import Form from './components/form';
import { useEffect, useState } from 'react';
import { DerivedData, FormData } from './ts/interfaces';

function App() {
  const [formData, setFormData] = useState<FormData>();
  const [derived, _setDerived] = useState<DerivedData>({
    sum: 0,
    VAT: 0,
    total: 0,
  });

  const setDerived = (data: FormData | undefined) => {
    if (!data?.weeks || data.weeks.length == 0) return;

    let sum = 0,
      VAT = 0,
      total = 0;

    for (const week of data.weeks) {
      if (!week?.unitPrice || !week?.amount.hours) return;

      sum += week.unitPrice * week.amount.hours;
    }

    VAT = sum * 0.25;
    total = sum + VAT;

    _setDerived({ sum, VAT, total });
  };

  useEffect(() => {
    setDerived(formData);
  }, [formData]);

  return (
    <div className='App'>
      <Form setFormData={setFormData} />
      <DocumentContainer formData={formData} derived={derived} />
    </div>
  );
}

export default App;
