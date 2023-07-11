import { render } from "@testing-library/react";
import Header from "../Header";
import { Provider } from "react-redux";
import store from "../../utils/store";
import { StaticRouter } from "react-router-dom/server";
import dummyLogo from "../../mocks/dummyLogo";

test("Logo should load on rendering header", () => {
  // load header
  const header = render(
    <StaticRouter>
      <Provider store={store}>
        <Header />
      </Provider>
    </StaticRouter>
  );
  // console.log(header);

  const logo = header.getAllByTestId("logo");
  // console.log(logo[0]);
  expect(logo[0].src).toBe("http://localhost/dummyLogo.png");
  //check if logo is loaded
});
