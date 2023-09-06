import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

export const style = StyleSheet.create({
  documentContainer: {
    flex: 1,
  },
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 40,
    paddingTop: 60,
    fontSize: 12,
  },
  header: {
    fontSize: 30,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orgNumber: {
    fontSize: 16,
    // alignSelf: 'flex-end',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  separator: {
    marginTop: 8,
    marginBottom: 10,
    height: 1,
    backgroundColor: '#0f0f0f',
  },
  firstColumn: { width: 200 },
  secondColumn: { width: 160 },
  column: {
    flexDirection: 'column',
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    wordBreak: 'break-word',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  midAlign: {
    textAlign: 'center',
    alignItems: 'center',
  },
  rightAlign: {
    textAlign: 'right',
    alignItems: 'flex-end',
  },
  tableRow: {
    fontSize: 12,
  },
  tableFooter: {},
  derivedDatas: {
    paddingVertical: 3,
  },
  bold: {
    fontWeight: 700,
  },
  conductedByText: {
    fontSize: 8,
    textAlign: 'justify',
  },
});
