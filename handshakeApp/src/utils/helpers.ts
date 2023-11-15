import AsyncStorage from '@react-native-async-storage/async-storage';
import {QueryClientConfig, QueryOptions} from '@tanstack/react-query';

// https://github.com/miguelmota/is-valid-hostname
export const isValidHostname = (value: string) => {
  const validHostnameChars = /^[a-zA-Z0-9-.]{1,253}\.?$/g;
  if (!validHostnameChars.test(value)) {
    return false;
  }

  if (value.endsWith('.')) {
    value = value.slice(0, value.length - 1);
  }

  if (value.length > 253) {
    return false;
  }

  const labels = value.split('.');

  const isValid = labels.every(function (label) {
    const validLabelChars = /^([a-zA-Z0-9-]+)$/g;

    const validLabel =
      validLabelChars.test(label) &&
      label.length < 64 &&
      !label.startsWith('-') &&
      !label.endsWith('-');

    return validLabel;
  });

  return isValid;
};

export const getUserFromStorage = async () => {
  const item = await AsyncStorage.getItem('user');
  return JSON.parse(item as string) as {username: string};
};

export const QUERY_ONCE_OPTIONS: QueryClientConfig['defaultOptions'] = {
  queries: {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    retry: false,
    staleTime: Infinity,
  },
};
