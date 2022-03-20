import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import WelcomePage from "./WelcomePage";

test("<WelcomPage/> data fetching", async () => {
  render(
    <BrowserRouter>
      <WelcomePage />
    </BrowserRouter>
  );
  const welcomPageMsg = await screen.findByText(
    "환영합니다 크로스 앵글입니다."
  );
  expect(welcomPageMsg).toBeInTheDocument();
});
