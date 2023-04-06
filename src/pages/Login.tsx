import React, {useEffect} from 'react';
import {View, Text, Image, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LoginStyle from './Login.style';
import {unwrapResult} from '@reduxjs/toolkit';
import LoginBg from '@/assets/images/login_bg.png';
import LinearGradient from 'react-native-linear-gradient';
import constantsStyle from '@/styles/constants.style';
import AppTextInput from '@/atoms/AppTextInput';
import AppButton from '@/atoms/AppButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import {authLogin} from '@/thunks/accountThunk';
import {accountAuthSlice, setAccount, setAuth} from '@/store/accountSlice';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';

const Login = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const authInfo = useSelector(accountAuthSlice);

  const [isLogin, setIsLogin] = React.useState<boolean>(true);
  const [loginIdInput, setLoginIdInput] = React.useState<string>('');
  const [loginPwInput, setLoginPwInput] = React.useState<string>('');

  const onTryLogin = async () => {
    try {
      const resp = await authLogin({
        loginId: loginIdInput,
        loginPw: loginPwInput,
      });
      const {auth, user} = resp;
      const {access_token, refresh_token} = auth;
      const {
        auth_id,
        google_auth_id,
        google_email,
        google_profile_url,
        uid,
        username,
      } = user;

      dispatch(
        setAuth({
          accessToken: access_token?.token,
          refreshToken: refresh_token?.token,
        }),
      );

      dispatch(
        setAccount({
          uid,
          username,
          googleProfileImageUrl: google_profile_url,
          googleEmail: google_email,
          offlineMode: false,
        }),
      );

      Toast.show({type: 'success', text1: '로그인 성공'});
      console.log(resp);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={LoginStyle.loginContainer}>
      <View style={LoginStyle.bgImage}>
        <Image source={LoginBg} />
      </View>
      <LinearGradient
        testID="bg-image"
        colors={[
          constantsStyle.mainBgColor,
          `rgba(${constantsStyle.mainBgColor.slice(4, -1)}, 0.7)`,
        ]}
        start={{x: 0.2, y: 0.5}}
        end={{x: 1, y: 1}}
        style={LoginStyle.linearGradient}></LinearGradient>
      <View testID="login-form-wrapper" style={LoginStyle.loginFormWrapper}>
        <View testID="login-form" style={LoginStyle.loginForm}>
          <Text style={LoginStyle.guide}>언제 어디서나, 쉽고 편하게.</Text>
          <Text style={LoginStyle.loginTitle}>메모리얼 로그인</Text>
          <View testID="login-input" style={LoginStyle.inputs}>
            <Text style={LoginStyle.inputGuide}>아이디</Text>
            <AppTextInput
              style={LoginStyle.inputText}
              value={loginIdInput}
              onChangeText={e => setLoginIdInput(e)}
            />
          </View>
          <View testID="login-input" style={LoginStyle.inputs}>
            <Text style={LoginStyle.inputGuide}>비밀번호</Text>
            <AppTextInput
              style={LoginStyle.inputText}
              secureTextEntry={true}
              value={loginPwInput}
              onChangeText={e => setLoginPwInput(e)}
            />
          </View>
          <View style={LoginStyle.loginBtnMargin} />
          <AppButton
            title="로그인"
            size={11}
            weight="bold"
            color="#e4e4e4"
            onPress={onTryLogin}
            style={[LoginStyle.formBtn, LoginStyle.loginBtn]}></AppButton>
          <View style={LoginStyle.signupBtnMargin} />
          <AppButton
            title="회원가입"
            size={11}
            weight="bold"
            color="#e4e4e4"
            style={[LoginStyle.formBtn, LoginStyle.signupBtn]}></AppButton>
          <View style={LoginStyle.splitLine}>
            <View testID="spliter" style={LoginStyle.spliter}></View>
            <Text style={LoginStyle.spliterText}>또는</Text>
            <View testID="spliter" style={LoginStyle.spliter}></View>
          </View>
          <AppButton
            icon={
              <Icon name="google" color={'white'} style={{marginRight: 5}} />
            }
            title="구글로 로그인"
            size={11}
            weight="bold"
            color="#e4e4e4"
            style={[LoginStyle.formBtn, LoginStyle.googleBtn]}></AppButton>
        </View>
      </View>
    </View>
  );
};

export default Login;
