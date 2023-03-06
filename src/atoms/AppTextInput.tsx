import fontsStyle from '@/styles/fonts.style';
import {TextInput} from 'react-native';
import {FontWeight, FontWeightValue} from './AppText';

export interface AppTextInputProps {
  placeholder?: string;
  value?: string | null;
  style?: any;
  weight?: keyof typeof FontWeight | keyof typeof FontWeightValue;
  size?: number;
  onChangeText?: (text: string) => void;
}

const AppTextInput = ({
  placeholder,
  value,
  style,
  weight,
  size,
  onChangeText,
}: AppTextInputProps): JSX.Element => {
  const styles = {...style};
  if (weight) styles.fontFamily = fontsStyle[weight];
  else styles.fontFamily = fontsStyle.normal;
  if (size) styles.fontSize = size;

  return (
    <TextInput
      placeholder={placeholder}
      style={styles}
      onChangeText={onChangeText}
      value={value}></TextInput>
  );
};

export default AppTextInput;
