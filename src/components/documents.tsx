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

const Invoice = ({ formData, derived }: DocumentContainerProps) => (
  <Document title='ValAB-faktura' author='Sam Herman'>
    <Page size='A4' style={style.page}>
      <View style={style.header}>
        <Text>Val AB Faktura</Text>
        <Text style={style.orgNumber}>Org nr: 559203-0976</Text>
      </View>
      <View style={style.row}>
        <View style={style.column}>
          <Text>Från: {formData?.from}</Text>
          <Text>Till: {formData?.to}</Text>
        </View>
        <View style={style.column}>
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
          <Text style={style.rightAlign}>{week?.location}</Text>
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
        <View style={style.column}>
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
        <View style={style.column}>
          <Text>Momsregistreringsnummer: </Text>
          <Text>Bankgiro: </Text>
          <Text>Telefon: </Text>
          <Text>Godkänd för F-skatt</Text>
        </View>
        <View style={style.column}>
          <Text>{formData?.VATid || ' '}</Text>
          <Text>{formData?.bankGiro || ' '}</Text>
          <Text>{formData?.phone}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

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
    <PDFViewer>
      <Invoice formData={formData} derived={derived} />
    </PDFViewer>
  );
}
