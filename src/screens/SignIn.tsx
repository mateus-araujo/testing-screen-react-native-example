import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, KeyboardAvoidingView } from "react-native";

import { Input, Button, ErrorText } from "../components/Form";
import { TEST_IDS } from "./utils"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  headerText: {
    color: "#353031",
    fontWeight: "bold",
    fontSize: 34,
    marginBottom: 10,
  },
});

const useLoginFormState = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submit, setSubmit] = useState(false);

  let isUsernameValid = false;
  let isPasswordValid = false;

  if (username === "example") {
    isUsernameValid = true;
  }

  if (password === "asdf") {
    isPasswordValid = true;
  }

  return {
    username: {
      value: username,
      set: setUsername,
      valid: isUsernameValid,
    },
    password: {
      value: password,
      set: setPassword,
      valid: isPasswordValid,
    },
    submit: {
      value: submit,
      set: setSubmit,
    },
  };
};

export default () => {
  const navigation = useNavigation();

  const { username, password, submit } = useLoginFormState();

  const usernameErrorMsg = submit.value && !username.valid? "Invalid username." : undefined;
  const passwordErrorMsg = submit.value && !password.valid ? "Invalid password." : undefined;

  const handleSubmit = () => {
    submit.set(true);

    if (username.valid && password.valid) {
      fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
      })
        .then(() => {
          navigation.navigate("App");
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="position">
      <Text style={styles.headerText}>Login</Text>
      <Input
        label="Username"
        placeholder="example"
        onChangeText={username.set}
        error={usernameErrorMsg}
        testID={TEST_IDS.SIGN_IN_USERNAME_INPUT}
      />
      <Input
        label="Password"
        placeholder="***"
        secureTextEntry
        onChangeText={password.set}
        error={passwordErrorMsg}
        testID={TEST_IDS.SIGN_IN_PASSWORD_INPUT}
      />
      <ErrorText messages={[usernameErrorMsg, passwordErrorMsg]} />
      <Button testID={TEST_IDS.SIGN_IN_BUTTON} text="Login" onPress={handleSubmit} />
    </KeyboardAvoidingView>
  );
};
