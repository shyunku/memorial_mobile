import fontsStyle from '@/styles/fonts.style';
// import {Button, TextInput} from 'react-native';
import {FontWeight, FontWeightValue} from './AppText';
import {Button} from 'react-native-elements';
import {StyleSheet} from 'react-native';

const AppButtonStyle = StyleSheet.create({
  appButtonTitle: {
    fontFamily: fontsStyle.normal,
  },
  appButton: {
    backgroundColor: 'rgb(60, 90, 180)',
    paddingVertical: 5,
  },
});

export interface AppTextInputProps {
  title: string;
  style?: any;
  weight?: keyof typeof FontWeight | keyof typeof FontWeightValue;
  size?: number;
  onChangeText?: (text: string) => void;
}

const AppButton = ({
  title,
  style,
  weight,
  size,
}: AppTextInputProps): JSX.Element => {
  const titleStyles: any = {...AppButtonStyle.appButtonTitle};
  if (weight) titleStyles.fontFamily = fontsStyle[weight];
  if (size) titleStyles.fontSize = size;

  const styles = {...AppButtonStyle.appButton, ...style};

  return <Button title={title} titleStyle={titleStyles} buttonStyle={styles} />;
};

export default AppButton;
