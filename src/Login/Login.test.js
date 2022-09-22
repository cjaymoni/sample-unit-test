import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import Login from "./Login";

jest.mock("axios", () => ({
  __esModule: true,
  default: {
    get: () => ({
      data: { id: 1, name: "John" },
    }),
  },
}));
describe("Login", () => {
  test("renders Login component", () => {
    render(<Login />);
    const inputText = screen.getByText("Username");
    expect(inputText).toBeInTheDocument();
    const inputPassword = screen.getByText("Password");
    expect(inputPassword).toBeInTheDocument();
  });

  test("username input should be rendered", () => {
    render(<Login />);
    const usernameNode = screen.getByPlaceholderText(/username/i);
    expect(usernameNode).toBeInTheDocument();
    expect(usernameNode.value).toBe("");
  });

  test("password input should be rendered", () => {
    render(<Login />);
    const passwordNode = screen.getByPlaceholderText(/password/i);
    expect(passwordNode).toBeInTheDocument();
    expect(passwordNode.value).toBe("");
  });

  test("username input should receive input", () => {
    render(<Login />);
    let inputValue = "hello";
    const usernameNode = screen.getByPlaceholderText(/username/i);
    fireEvent.change(usernameNode, { target: { value: inputValue } });
    expect(usernameNode.value).toBe(inputValue);
  });

  test("password input should receive input", () => {
    render(<Login />);
    let inputValue = "password";
    const passwordNode = screen.getByPlaceholderText(/password/i);
    fireEvent.change(passwordNode, { target: { value: inputValue } });
    expect(passwordNode.value).toBe(inputValue);
  });

  test("login button should not  be in a loading state", () => {
    render(<Login />);
    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).not.toHaveTextContent(/please wait/i);
  });

  test("login button should be enabled when there is input", () => {
    render(<Login />);
    const loginButton = screen.getByRole("button", { name: /login/i });

    let inputValue = "hello";
    let inputPass = "password";
    const usernameNode = screen.getByPlaceholderText(/username/i);
    const passwordNode = screen.getByPlaceholderText(/password/i);

    fireEvent.change(usernameNode, { target: { value: inputValue } });
    expect(usernameNode.value).toBe(inputValue);
    fireEvent.change(passwordNode, { target: { value: inputPass } });

    expect(passwordNode.value).toBe(inputPass);
    expect(loginButton).toBeEnabled();
  });

  test("state should be in loading on click", () => {
    render(<Login />);
    const loginButton = screen.getByRole("button", { name: /login/i });

    let inputValue = "hello";
    let inputPass = "password";
    const usernameNode = screen.getByPlaceholderText(/username/i);
    const passwordNode = screen.getByPlaceholderText(/password/i);

    fireEvent.change(usernameNode, { target: { value: inputValue } });
    expect(usernameNode.value).toBe(inputValue);
    fireEvent.change(passwordNode, { target: { value: inputPass } });
    fireEvent.click(loginButton);

    expect(loginButton).toHaveTextContent(/Please hold on while fetching/i);
  });

  test("user should be rendered in view after fetching", async () => {
    render(<Login />);
    const loginButton = screen.getByRole("button", { name: /login/i });

    let textValue = "jude";
    let textValuePass = "pass";
    const usernameNode = screen.getByPlaceholderText(/username/i);
    const passwordNode = screen.getByPlaceholderText(/password/i);

    fireEvent.change(usernameNode, { target: { value: textValue } });
    expect(usernameNode.value).toBe(textValue);
    fireEvent.change(passwordNode, { target: { value: textValuePass } });
    fireEvent.click(loginButton);
    const userItem = await screen.findByTestId("user");

    expect(userItem).toBeInTheDocument();
  });

  test("This test will fail", (done) => {
    done.fail(new Error("This is the last test supposed to fail"));
  });
});
