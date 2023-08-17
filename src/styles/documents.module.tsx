import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

export const style = StyleSheet.create({
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
  column: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  midAlign: {
    textAlign: 'center',
  },
  rightAlign: {
    textAlign: 'right',
  },
  tableRow: {
    fontSize: 16,
  },
  tableFooter: {},
  bold: {
    fontWeight: 700,
  },
});
