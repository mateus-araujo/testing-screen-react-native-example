import 'react-native-gesture-handler/jestSetup';

require("jest-fetch-mock").enableMocks();

export const mockedNavigation = {
  navigate: jest.fn(),
  push: jest.fn(),
};

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");

  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigation.navigate,
      push: mockedNavigation.push,
    }),
  };
});

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});
