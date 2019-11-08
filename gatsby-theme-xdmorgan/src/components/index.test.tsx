import React from "react";
import { render } from "@testing-library/react";
import Welcome from "./index";

test("True equals true (test is found)", () => {
  expect(true).toEqual(true);
});

test("Renders a component and reads text content", () => {
  const name = "Dan";
  const { getByText, container } = render(
    <Welcome name={name} id={`greet-${name.toLowerCase()}`} />
  );

  expect(container).toBeInTheDocument();
  expect(container).toHaveTextContent("Hello, " + name);
});
