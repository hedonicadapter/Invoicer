import ReactPDF, {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from '@react-pdf/renderer';
import { Suspense, useEffect } from 'react';
import { style } from '../styles/documents.module';
import { DocumentContainerProps } from '../ts/interfaces';

const renderUrl = async (document: JSX.Element) =>
  new Promise(async (resolve) => {
    const blob = await ReactPDF.pdf(document).toBlob();
    const url = URL.createObjectURL(blob);
    if (url && url.length > 0) {
      resolve(url);
    }
  })
    .then((res) => res)
    .catch((err) => console.log(err));

function breakName(name: string): string[] {
  return [name];
}

const Invoice = ({ formData, derived }: DocumentContainerProps) => (
  <Document title='ValAB-faktura' author='Sam Herman'>
    <Page size='A4' style={style.page}>
      <View style={style.header}>
        <Text>Val AB Faktura</Text>
        <Text style={style.orgNumber}>Org nr: 559203-0976</Text>
      </View>
      <View style={style.row}>
        <View style={{ ...style.column, ...style.firstColumn }}>
          <Text>Från: {formData?.from}</Text>
          <Text>Till: {formData?.to}</Text>
        </View>
        <View style={{ ...style.column, ...style.secondColumn }}>
          <Text>Datum: {formData?.date}</Text>
          <Text>Fakturanr: {formData?.invoiceNumber}</Text>
        </View>
      </View>
      <View style={style.separator}></View>
      <View style={style.row}>
        <View style={style.column}>
          <Text>Vår ref: {formData?.ourRef}</Text>
          <Text>Er ref: {formData?.yourRef}</Text>
        </View>
        <View style={style.column}>
          <Text>Företag: {formData?.company}</Text>
          <Text>Adress: {formData?.address}</Text>
          <Text>Postnr: {formData?.zipCode}</Text>
        </View>
      </View>

      <View style={style.row}>
        <Text>Förfallodatum: {formData?.dueDate}</Text>
      </View>

      <View style={style.separator}></View>
      <View style={style.row}>
        <Text>Vecka</Text>
        <Text>Tjänsteställe</Text>
        <Text>Antal</Text>
        <Text>À-pris</Text>
        <Text style={style.rightAlign}>Summa</Text>
      </View>

      {formData?.weeks?.map((week) => (
        <View style={{ ...style.row, ...style.tableRow }}>
          <Text>{week?.number}</Text>
          <View style={style.column}>
            <Text>{week?.location}</Text>
            <Text style={style.conductedByText}>
              {week?.conductedBy ? 'Arbetet utfört av\nZahra Herman' : ''}
            </Text>
          </View>
          <Text style={style.rightAlign}>
            {week?.amount.hours ? week.amount.hours + 'h' : ''}
          </Text>
          <Text style={style.rightAlign}>
            {week?.unitPrice != null ? week.unitPrice : ''}
          </Text>
          <Text style={style.rightAlign}>
            {week?.amount?.hours != null && week?.unitPrice != null
              ? week.amount.hours * week.unitPrice
              : ''}
          </Text>
        </View>
      ))}
      <View style={style.separator}></View>
      <View style={{ ...style.row, ...style.tableFooter }}>
        <Text> </Text>
        <Text> </Text>
        <View style={{ ...style.column, ...style.rightAlign }}>
          <Text style={style.bold}>Summa</Text>
          <Text style={style.bold}>Moms</Text>
          <Text style={style.bold}>Total</Text>
        </View>
        <View style={style.column}>
          <Text style={style.rightAlign}>{derived?.sum || 0}kr</Text>
          <Text style={style.rightAlign}>{derived?.VAT || 0}kr</Text>
          <Text style={style.rightAlign}>{derived?.total || 0}kr</Text>
        </View>
      </View>
      <View style={style.separator} />
      <View style={style.row}>
        <View style={{ ...style.column, ...style.rightAlign }}>
          <Text style={style.derivedDatas}>Momsregistreringsnummer: </Text>
          <Text style={style.derivedDatas}>Bankgiro: </Text>
          <Text style={style.derivedDatas}>Telefon: </Text>
          <Text style={style.derivedDatas}>Godkänd för F-skatt</Text>
        </View>
        <View style={style.column}>
          <Text style={style.derivedDatas}>{formData?.VATid || ' '}</Text>
          <Text style={style.derivedDatas}>{formData?.bankGiro || ' '}</Text>
          <Text style={style.derivedDatas}>{formData?.phone}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

function blobToBase64(blob: Blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

export const getFile = async () => {
  const url = document.getElementById('download')?.getAttribute('href');
  if (!url) return false;
  try {
    const response = await fetch(url);
    const blob = await response.blob();

    return await blobToBase64(blob);
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

export default function DocumentContainer({
  formData,
  derived,
}: DocumentContainerProps) {
  useEffect(() => {
    renderUrl(<Invoice formData={formData} derived={derived} />)
      .then((generatedUrl) => {
        if (generatedUrl) {
          let aTag = document.getElementById('download') as HTMLAnchorElement;
          aTag.href = generatedUrl as string;
        }
      })
      .catch((err) => console.log(err));
  }, [formData, derived]);
  return (
    <PDFViewer style={style.documentContainer}>
      <Invoice formData={formData} derived={derived} />
    </PDFViewer>
  );
}
