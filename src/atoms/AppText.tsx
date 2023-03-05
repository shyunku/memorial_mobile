import fontsStyle from '@/styles/fonts.style';
import {Text, TextStyle} from 'react-native';
import AppTextStyle from './AppText.style';

const FontWeight = {
  thin: 'thin',
  light: 'light',
  normal: 'normal',
  bold: 'bold',
  bolder: 'bolder',
  black: 'black',
};

const FontWeightValue = {
  100: 'thin',
  200: 'light',
  300: 'normal',
  400: 'normal',
  500: 'bold',
  600: 'bolder',
  700: 'bolder',
  800: 'black',
  900: 'black',
};

export interface AppTextProps {
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
  weight?: keyof typeof FontWeight | keyof typeof FontWeightValue;
  size?: number;
}

const AppText = ({
  children,
  style,
  weight,
  size,
}: AppTextProps): JSX.Element => {
  const newStyle = {...AppTextStyle.appText};
  if (weight) newStyle.fontFamily = fontsStyle[weight];
  if (size) newStyle.fontSize = size;
  const extraStyle = Array.isArray(style) ? style : [style];
  return <Text style={[newStyle, ...extraStyle]}>{children}</Text>;
};

export default AppText;
