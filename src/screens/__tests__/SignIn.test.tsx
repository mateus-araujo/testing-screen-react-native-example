import React from "react";
import { fireEvent, render } from "@testing-library/react-native";

import SignIn from "../SignIn";
import { TEST_IDS } from "../utils"

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");

  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
    }),
  };
});

it("renders", () => {
  const { getAllByText, getByPlaceholderText } = render(<SignIn />);

  expect(getAllByText("Login").length).toBe(2);
  getByPlaceholderText("example");
  getByPlaceholderText("***");
});

it('shows invalid inputs messages', () => {
  const { getByTestId, getByText } = render(<SignIn />);

  fireEvent.press(getByTestId(TEST_IDS.SIGN_IN_BUTTON));

  getByText('Invalid username.')
  getByText('Invalid password')
})
