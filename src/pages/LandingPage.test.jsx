import { render, screen } from "@testing-library/react";
import LandingPage from "./LandingPage";
import { BrowserRouter } from "react-router-dom";

test("<LandingPage/>", async () => {
  render(
    <BrowserRouter>
      <LandingPage />
    </BrowserRouter>
  );
  const landingPageMsg = await screen.findByText("크로스 앵글 랜딩페이지");
  expect(landingPageMsg).toBeInTheDocument();
});
