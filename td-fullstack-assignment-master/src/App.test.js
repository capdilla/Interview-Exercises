import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("should renders the input field", () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText("1,2,3,4");
  expect(inputElement).toBeInTheDocument();
});

it("should renders the form", () => {
  const { container } = render(<App />);
  const formElement = container.querySelector("form");
  expect(formElement).toBeInTheDocument();
});

it("should render the result", async () => {
  const { container } = render(<App />);
  const input = screen.getByPlaceholderText("1,2,3,4");

  await userEvent.type(input, "1,2,3,4{enter}");

  screen.getByText(/Result for input\s*'[\s1234,]+'\s*is/i);
  const resultList = container.querySelector("ul");
  expect(resultList).toBeInTheDocument();
  expect(resultList.children).toHaveLength(2);
  expect(resultList.children[0].textContent).toBe("pA: 0 pB:1 sum:2");
  expect(resultList.children[1].textContent).toBe("pA: 0 pB:2 sum:3");
});

it("should render an error", async () => {
  render(<App />);
  const input = screen.getByPlaceholderText("1,2,3,4");

  await userEvent.type(input, "{enter}");

  screen.getByText(/Write something/i);
});

it("should render an error Write something valid", async () => {
  render(<App />);
  const input = screen.getByPlaceholderText("1,2,3,4");

  await userEvent.type(input, "a a a a {enter}");

  screen.getByText(/Write something valid/i);
});

it("should render No result found", async () => {
  render(<App />);
  const input = screen.getByPlaceholderText("1,2,3,4");

  await userEvent.type(input, "1,2,4,412 {enter}");

  screen.getByText(/No results found/i);
});
