import { screen, waitFor } from "@testing-library/react";
import { expect } from "vitest";

export const thenTheTextDisplayedIs = async (text) => {
  await waitFor(() => {
    const result = screen.getByText(new RegExp(text, "i"));
    expect(result).toBeInTheDocument();
  });
};

export const thenTheUrlDisplayedIs = async (router, expectedPath) => {
  await waitFor(() => {
    expect(router.state.location.pathname).toBe(expectedPath);
  });
};

export const thenTheActionToHaveBeenCalled = async (action) => {
  await waitFor(() => {
    expect(action).toHaveBeenCalled();
  });
};
