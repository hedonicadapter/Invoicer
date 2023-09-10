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
      <View style={style.row}>
        <View style={style.column}>
          <View style={style.header}>
            <Text>Val AB</Text>
            <Text style={style.orgNumber}>Org nr: 559203-0976</Text>
          </View>
          <View style={style.refs}>
            <Text>Vår ref: {formData?.ourRef}</Text>
            <Text>Er ref: {formData?.yourRef}</Text>
          </View>
        </View>

        <View style={[style.column, style.senderInfo]}>
          <View style={[style.row, style.senderDataContainer]}>
            <Text style={style.coloredText}>Från:</Text>{' '}
            <Text style={style.senderData}>{formData?.from}</Text>
          </View>
          <View style={[style.row, style.senderDataContainer]}>
            <Text style={style.coloredText}>Adress:</Text>{' '}
            <Text style={style.senderData}>{formData?.address}</Text>
          </View>
          <View style={[style.row, style.senderDataContainer]}>
            <Text style={style.coloredText}>Postnr:</Text>{' '}
            <Text style={style.senderData}>{formData?.zipCode}</Text>
          </View>
          <View style={[style.row, style.senderDataContainer]}>
            <Text style={style.coloredText}>Till:</Text>{' '}
            <Text style={style.senderData}>{formData?.to}</Text>
          </View>
          <View style={style.separator}></View>
          <View style={[style.row, style.senderDataContainer]}>
            <Text style={style.coloredText}>Datum:</Text>{' '}
            <Text style={style.senderData}>{formData?.date}</Text>
          </View>
          <View style={[style.row, style.senderDataContainer]}>
            <Text style={style.coloredText}>Förfallodatum:</Text>{' '}
            <Text style={style.senderData}>{formData?.dueDate}</Text>
          </View>
          <View style={[style.row, style.senderDataContainer]}>
            <Text style={style.coloredText}>Fakturanr:</Text>{' '}
            <Text style={style.senderData}>{formData?.invoiceNumber}</Text>
          </View>
        </View>
      </View>

      <View style={style.tableContainer}>
        <View style={style.table}>
          <View style={{ ...style.row, ...style.tableHeader }}>
            <Text>Vecka</Text>
            <Text>Tjänsteställe</Text>
            <Text>Antal</Text>
            <Text>À-pris</Text>
            <Text>Summa</Text>
          </View>

          {formData?.weeks?.map((week) => (
            <View style={{ ...style.row, ...style.tableRow }}>
              <Text style={style.cell}>{week?.number}</Text>
              <View style={{ ...style.column, ...style.cell }}>
                <Text>{week?.location}</Text>
                <Text style={style.conductedByText}>
                  {week?.conductedBy ? 'Arbetet utfört av\nZahra Herman' : ''}
                </Text>
              </View>
              <Text style={[style.cell]}>
                {week?.amount.hours ? week.amount.hours + 'h' : ''}
              </Text>
              <Text style={style.cell}>
                {week?.unitPrice != null ? week.unitPrice : ''}
                {'kr'}
              </Text>
              <Text style={style.cell}>
                {week?.amount?.hours != null && week?.unitPrice != null
                  ? week.amount.hours * week.unitPrice
                  : ''}
                {'kr'}
              </Text>
            </View>
          ))}
        </View>

        <View style={{ ...style.row, ...style.tableFooter }}>
          <Text> </Text>
          <Text> </Text>
          <Text> </Text>
          <View
            style={{
              ...style.column,
              ...style.rightAlign,
              ...style.tableFooterTextRows,
            }}
          >
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
      </View>
      <View style={[style.column, style.senderInfo, style.footer]}>
        <View style={style.row}>
          <Text style={[style.coloredText, style.footerRightAlign]}>
            Momsregistreringsnummer:
          </Text>{' '}
          <Text style={style.senderData}>{formData?.VATid || ' '}</Text>
        </View>
        <View style={style.row}>
          <Text style={[style.coloredText, style.footerRightAlign]}>
            Bankgiro:
          </Text>{' '}
          <Text style={style.senderData}>{formData?.bankGiro || ' afaef'}</Text>
        </View>
        <View style={style.row}>
          <Text style={[style.coloredText, style.footerRightAlign]}>
            Telefon:
          </Text>{' '}
          <Text style={style.senderData}>{formData?.phone}</Text>
        </View>
        <View style={style.row}>
          <Text style={style.footerRightAlign}>Godkänd för F-skatt</Text>{' '}
          <Text style={style.senderData}></Text>
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
