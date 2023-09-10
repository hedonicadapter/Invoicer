import { Dispatch, SetStateAction } from 'react';

export type Week = {
  number: number | undefined;
  location: string | undefined;
  amount: { hours: number | undefined; minutes: number | undefined };
  unitPrice: number | undefined;
  conductedBy: boolean;
};

export const createWeek = (weekProps?: Week) => {
  return {
    number: weekProps?.number || undefined,
    location: weekProps?.location || undefined,
    amount: weekProps?.amount || { hours: undefined, minutes: undefined },
    unitPrice: weekProps?.unitPrice || undefined,
    conductedBy: weekProps?.conductedBy || true,
  };
};

export type FormData = {
  from: string | undefined;
  to: string | undefined;
  invoiceNumber: string | undefined;
  ourRef: string | undefined;
  yourRef: string | undefined;
  company: string | undefined;
  address: string | undefined;
  zipCode: string | undefined;
  phone: string | undefined;
  VATid: string | undefined;
  bankGiro: string | undefined;
  date: string | number | readonly string[] | undefined;
  dueDate: string | number | readonly string[] | undefined;
  weeks: (Week | undefined)[] | undefined;
};

export type DerivedData = { sum?: number; VAT?: number; total?: number };

export interface FormProps {
  setFormData: Dispatch<SetStateAction<FormData | undefined>>;
}

export interface DocumentContainerProps {
  formData?: FormData;
  derived?: DerivedData;
}

export type EmailData = {
  from: string | undefined;
  to?: string;
  recipient: string | undefined;
  message?: string;
  // bcc: boolean;
};
