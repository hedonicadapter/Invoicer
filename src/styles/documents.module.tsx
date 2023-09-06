import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import SFPro from '../assets/SF-Pro.ttf';
import SFDisplayThin from '../assets/SFProText-Bold.ttf';

Font.register({
  family: 'SF Pro',
  src: SFPro,
});
Font.register({
  family: 'SF Display',
  src: SFDisplayThin,
});

export const style = StyleSheet.create({
  documentContainer: {
    flex: 1,
    fontFamily: 'SF Pro',
  },
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 40,
    paddingTop: 60,
    fontSize: 12,
  },
  header: {
    // fontFamily: 'SF Display',
    fontSize: 62,
    fontWeight: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subHeader: {
    marginBottom: 0,
    marginTop: 'auto',
    fontSize: 18,
    paddingBottom: 10,
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
  secondColumn: { width: 148 },
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
  table: {
    margin: 'auto 0',
    marginHorizontal: '-40',
    backgroundColor: 'black',
    color: 'white',
  },
  tableHeader: {
    backgroundColor: '#00509d',
    color: 'white',
    paddingHorizontal: 48,
    borderRadius: 1,
  },
  tableRow: {
    paddingHorizontal: 48,
    fontSize: 12,
  },
  tableFooter: {},

  bold: {
    fontWeight: 700,
  },
  conductedByText: {
    fontSize: 8,
    textAlign: 'justify',
  },
  footer: {
    marginLeft: 'auto',
    marginRight: 0,
    marginTop: 'auto',
    marginBottom: 0,
  },
  VATAndWhatnot: {
    width: 180,
    justifyContent: 'flex-end',
    paddingRight: 5,
    gap: 10,
  },

  misc: { gap: 10 },
});
