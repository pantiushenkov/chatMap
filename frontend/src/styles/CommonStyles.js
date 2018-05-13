import {StyleSheet} from "react-native";

export const cs = {
  errorColor: 'rgb(213, 0, 0)',
  textColor: 'rgba(0, 0, 0, .87)',
  secondaryTextColor: 'rgba(0, 0, 0, .54)',
  disabledTextColor: 'rgba(0, 0, 0, .38)',
  primaryRedTextColor: '#511518',
  secondaryRedTextColor: '#511518',
  disabledRedTextColor: '#511518',
  accentColor: 'rgba(129, 199, 132, 1)',
  accentTextColor: 'rgba(102, 187, 106, 0.87)',
  whiteBorderColor: 'rgba(255, 255, 255, 0.24)',
  whiteDividerColor: 'rgba(255, 255, 255, 0.24)',
  primaryColor: '#cae0ff',
  dividerColor: 'rgba(0, 0, 0, .12)',
  primaryBgColor: '#e4e6f3',
  redTextColor: '#E57373',
};

export default constants = {
  body: {
    backgroundColor: '#EEEEEE',
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 32,
    alignSelf: 'stretch',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  icon: {
    margin: 10,
  },
  input: {
    alignSelf: 'stretch',
  },
}

export const styles = StyleSheet.create({
  ...constants
});
