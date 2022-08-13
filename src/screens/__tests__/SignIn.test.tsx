import React from "react";

import { act, fireEvent, render } from "@testing-library/react-native";
import fetch from "jest-fetch-mock"

import SignIn from "../SignIn";
import { TEST_IDS } from "../utils"
import { mockedNavigation } from "../../../jest/setup";


const flushMicrotasksQueue = () => new Promise((resolve) => setImmediate(resolve));

describe("SignIn", () => {  
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
    getByText('Invalid password.')
  });

  it('shows invalid user name error message', () => {
    const { getByTestId, getByText, queryAllByText } = render(<SignIn />);

    fireEvent.changeText(getByTestId(TEST_IDS.SIGN_IN_PASSWORD_INPUT), 'asdf');

    fireEvent.press(getByTestId(TEST_IDS.SIGN_IN_BUTTON));

    getByText('Invalid username.');
    expect(queryAllByText('Invalid password.')?.length).toBe(0);

    fireEvent.changeText(getByTestId(TEST_IDS.SIGN_IN_USERNAME_INPUT), 'invalid input');

    getByText('Invalid username.');
    expect(queryAllByText('Invalid password.')?.length).toBe(0);
  });

  it('shows invalid password. error message', () => {
    const { getByTestId, getByText, queryAllByText } = render(<SignIn />);

    fireEvent.changeText(getByTestId(TEST_IDS.SIGN_IN_USERNAME_INPUT), 'example');

    fireEvent.press(getByTestId(TEST_IDS.SIGN_IN_BUTTON));

    getByText('Invalid password.');
    expect(queryAllByText('Invalid username.')?.length).toBe(0);

    fireEvent.changeText(getByTestId(TEST_IDS.SIGN_IN_PASSWORD_INPUT), 'invalid input');

    getByText('Invalid password.');
    expect(queryAllByText('Invalid username.')?.length).toBe(0);
  });

  it('handles valid input submission', async () => {
    const { getByTestId } = render(<SignIn />);

    fireEvent.changeText(getByTestId(TEST_IDS.SIGN_IN_USERNAME_INPUT), 'example');
    fireEvent.changeText(getByTestId(TEST_IDS.SIGN_IN_PASSWORD_INPUT), 'asdf');
    fireEvent.press(getByTestId(TEST_IDS.SIGN_IN_BUTTON));

    expect(fetch.mock.calls).toMatchSnapshot();
    await act(flushMicrotasksQueue);

    expect(mockedNavigation.navigate).toBeCalledWith('App');
  });
});
