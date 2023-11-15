import {crossIcon, tick} from '../../assets/svg';
import BackButton from '../../components/BackButton';
import {CtaButton} from '../../components/CtaButton';
import ScreenContainer from '../../components/ScreenContainer';
import SearchInput from '../../components/SearchInput';
import {CommonFont, H1, H3} from '../../lib/styles/common';
import {palette} from '../../lib/styles/theme';
import {isValidHostname} from '../../utils/helpers';
// import {useReduxDispatch, useReduxSelector} from '@app/redux/config';
// import {initWallet, updateWalletPsuedonym} from '@app/redux/userWallet/actions';
// import {
//   getWalletIdPseudonymList,
//   getWalletsList,
// } from '@app/redux/userWallet/selectors';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useMemo} from 'react';
import {SvgXml} from 'react-native-svg';
import Toast from 'react-native-toast-message';
import {AppStackParamList} from '../../navigators/AppNavigator';
import {View} from 'react-native';

type Props = NativeStackScreenProps<AppStackParamList, 'UsernameCreate'>;

const helperText = {
  idle: '',
  success: 'Awesome! That’s available.',
  error: 'This pseudonym is not available.',
} as const;

type InputState = {
  value: string;
  state: keyof typeof helperText;
};

const initialState: InputState = {
  value: 'test',
  state: 'idle',
};

const usernameRegex = new RegExp('^[A-Za-z0-9]+$');

export const UsernameCreate: React.FC<Props> = ({navigation}) => {
  const [input, setInput] = React.useState<InputState>(initialState);

  const onChangeText = (value: string) => {
    value = value.trim().toLowerCase();
    if (value.length === 0) {
      return setInput(initialState);
    }

    if (!isValidHostname(value + '.com') || !usernameRegex.test(value)) {
      return setInput(s => ({...s, state: 'error'}));
    }

    setInput(s => ({...s, value, state: 'success'}));
  };

  const renderHelperText = useMemo(() => {
    if (input.state === 'idle') {
      return null;
    }

    return (
      <H3 weight="500" style={{marginTop: 12}} color={palette[input.state]}>
        {helperText[input.state]}
      </H3>
    );
  }, [input.state]);

  const inputContainerStyle = useMemo(() => {
    if (input.state === 'idle') {
      return {};
    }

    return {
      borderWidth: 1,
      borderColor: palette[input.state],
    };
  }, [input.state]);

  const submitDisabled = input.state !== 'success' || input.value.length === 0;

  const onSubmit = async () => {
    navigation.navigate('PasswordCreate', {username: input.value});
  };

  return (
    <ScreenContainer
      headerLeft={<BackButton onPress={() => navigation.goBack()} />}
      footer={
        <CtaButton
          style={{paddingVertical: 16, maxHeight: 'auto', margin: 12}}
          text="Create"
          onPress={onSubmit}
          isDisabled={submitDisabled}>
          <CommonFont
            weight="700"
            size="15px"
            lineHeight="20px"
            color={palette.common.white}>
            Create
          </CommonFont>
        </CtaButton>
      }>
      <H1 lineHeight="40px" weight="800" style={{marginVertical: 12}}>
        Pick username
      </H1>

      <CommonFont
        weight="500"
        size="15px"
        lineHeight="20px"
        color={palette.textGray}
        style={{marginBottom: 24}}>
        This is how you’ll appear to others on Handshake. You can change this at
        any time.
      </CommonFont>

      <SearchInput
        placeholder="Username"
        onChangeText={onChangeText}
        containerStyle={inputContainerStyle}
      />
      {renderHelperText}
    </ScreenContainer>
  );
};
