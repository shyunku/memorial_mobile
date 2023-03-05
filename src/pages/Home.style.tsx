import constantsStyle from '@/styles/constants.style';
import {StyleSheet} from 'react-native';

const HomeStyle = StyleSheet.create({
  homeContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  header: {
    borderBottomColor: 'rgba(102,121,154,0.43)',
    borderBottomWidth: 1,
  },
  titleSection: {
    marginBottom: 15,
  },
  optionSection: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  viewOptions: {
    flexDirection: 'row',
  },
  viewOption: {
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: constantsStyle.stdBtnColor,
    borderRadius: 2,
  },
  viewOption_selected: {
    borderColor: constantsStyle.highlightColor,
  },
  viewOption_notLast: {
    marginRight: 5,
  },
  viewOptionText: {
    color: constantsStyle.stdBtnTextColor,
  },
  viewOptionText_selected: {
    color: constantsStyle.highlightColor,
  },
});

export default HomeStyle;
