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
import React, {useEffect, useMemo} from 'react';
import {SvgXml} from 'react-native-svg';
import Toast from 'react-native-toast-message';
import {
  AppStackParamList,
  USER_MUTATION_KEY,
} from '../../navigators/AppNavigator';
import {View} from 'react-native';
import {trpc} from '@app/utils/trpc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {QueryClient} from '@tanstack/react-query';

type Props = NativeStackScreenProps<AppStackParamList, 'PasswordCreate'>;

const helperText = {
  idle: '',
  success: '',
  error: 'The password must be between 6 to 30 characters long.',
} as const;

type InputState = {
  value: string;
  state: keyof typeof helperText;
};

const initialState: InputState = {
  value: '',
  state: 'idle',
};

export const PasswordCreate: React.FC<Props> = ({navigation, route}) => {
  const [input, setInput] = React.useState<InputState>(initialState);

  const getMe = trpc.user.getMe.useQuery(undefined, {refetchInterval: 3000});

  // const queryClient = new QueryClient();

  const userMutation = trpc.auth.login.useMutation({
    // mutationKey: [USER_MUTATION_KEY],
    // onSuccess: async data => {
    //   queryClient.invalidateQueries([USER_MUTATION_KEY]);
    // },
  });

  // useEffect(() => {
  //   queryClient.setQueryData(['user.getMe'], 'test data');
  //   console.log('+++++++ queryClient +++++', getMe.data);
  // }, []);

  console.log('+++++++ get me result +++++', getMe.data);

  console.log('+++++++ mutation data in password +++++', userMutation.data);

  const username = route.params.username;

  const onChangeText = (value: string) => {
    value = value.trim().toLowerCase();
    if (value.length === 0) {
      return setInput(initialState);
    }

    if (value.length < 2 || value.length > 30) {
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
    console.log('onSubmit', username, input.value);
    const user = await userMutation.mutateAsync({
      username,
      password: input.value,
    });
    // await AsyncStorage.setItem('user', JSON.stringify(user));
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
        Create password
      </H1>

      <CommonFont
        weight="500"
        size="15px"
        lineHeight="20px"
        color={palette.textGray}
        style={{marginBottom: 24}}>
        Your password must be 6 characters long.
      </CommonFont>

      <SearchInput
        placeholder="Password"
        onChangeText={onChangeText}
        containerStyle={inputContainerStyle}
      />
      {renderHelperText}
    </ScreenContainer>
  );
};
