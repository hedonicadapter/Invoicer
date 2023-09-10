import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import SFPro from '../assets/SF-Pro.ttf';
import SFProTextBold from '../assets/SFProText-Bold.ttf';
import SFProDisplayThin from '../assets/SFProDisplay-Thin.ttf';

Font.register({
  family: 'SF Pro',
  src: SFPro,
});
Font.register({
  family: 'SF Pro Bold',
  src: SFProTextBold,
});
Font.register({
  family: 'SF Pro Thin',
  src: SFProDisplayThin,
});

const separatorColor = 'rgba(255,255,255,255.6)';
const tableBorderColor = 'rgba(255,255,255,255.6)';
const coloredText = '#17bebb';

export const style = StyleSheet.create({
  documentContainer: {
    flex: 1,
    fontFamily: 'SF Pro',
  },
  page: {
    flexDirection: 'column',
    backgroundColor: 'black',
    color: 'white',
    padding: 40,
    paddingTop: 60,
    fontSize: 12,
  },
  orgNumber: {
    paddingLeft: 4,
    fontSize: 16,
    paddingBottom: 40,
    // alignSelf: 'flex-end',
    opacity: 0.84,
    fontFamily: 'SF Pro Thin',
    // marginBottom: -50,
    // fontWeight: 100,
  },
  header: {
    lineHeight: 1.1,

    fontFamily: 'SF Pro Bold',
    fontSize: 62,
    fontWeight: 100,
    flexDirection: 'column',
    // justifyContent: 'space-between',
  },

  refs: {
    paddingLeft: 4,
    lineHeight: 1.35,
    marginTop: -12,
  },

  senderInfo: {
    lineHeight: 1.75,
    width: 200,
    fontSize: 14,
    fontFamily: 'SF Pro Bold',
  },
  coloredText: {
    fontFamily: 'SF Pro Thin',

    fontSize: 15,
    color: `${coloredText}`,
  },
  senderDataContainer: {},
  senderData: {
    // maxWidth: 10,
    flex: 1,
    textAlign: 'right',
  },

  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  separator: {
    // marginTop: 8,
    // marginBottom: 10,
    // marginHorizontal: 'auto',
    width: '75%',
    height: 12,
    marginTop: 6,
    marginHorizontal: 'auto',
    opacity: 0.4,
  },
  firstColumn: { width: 200 },
  secondColumn: { width: 148 },
  column: {
    // height: 40,

    flexDirection: 'column',
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    wordBreak: 'break-word',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftAlign: {
    alignSelf: 'flex-start',
    textAlign: 'left',
  },
  midAlign: {
    alignSelf: 'center',
    textAlign: 'center',
    marginHorizontal: 'auto',
  },
  rightAlign: {
    alignSelf: 'flex-end',
    textAlign: 'right',
    marginRight: 0,
    marginLeft: 'auto',
  },

  tableContainer: {
    marginVertical: 'auto',
  },

  table: {
    borderRadius: 2,

    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderBottom: `0.8px solid ${tableBorderColor}`,
  },
  tableHeader: {
    opacity: 0.84,
    paddingVertical: 8,
    color: 'white',
    paddingHorizontal: 48,
    borderBottom: `0.8px solid ${tableBorderColor}`,
  },
  tableRow: {
    paddingVertical: 8,
    fontSize: 14,
  },
  cell: {
    paddingVertical: 8,
    width: 140,
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  tableFooter: {
    paddingVertical: 10,
    lineHeight: 1.35,
    paddingRight: 25,
  },
  tableFooterTextRows: {
    paddingRight: 30,
    textAlign: 'right',
    alignItems: 'flex-end',
  },

  bold: {
    fontWeight: 700,
  },
  conductedByText: {
    fontSize: 8,
    opacity: 0.74,
  },
  footer: {
    marginLeft: 'auto',
    marginRight: 0,
    width: 340,
    marginTop: 'auto',
    marginBottom: 0,
  },
  footerRightAlign: {
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    textAlign: 'right',
    flex: 1,
  },

  misc: { gap: 10 },
});
