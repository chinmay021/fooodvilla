import Body from "../Body";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../utils/store";
import { StaticRouter } from "react-router-dom/server";
import { RESTAURANT_DATA } from "../../mocks/data";
import { API_URL } from "../../constants";
import LocationContext from "../../utils/LocationContext";

global.fetch = jest.fn(() => {
  // fetch returns a readable stream that a function named json
  // which we call to get the JSON data
  return Promise.resolve({
    json: () => {
      return Promise.resolve(RESTAURANT_DATA);
    },
  });
});

test("Shimmer should load  on Homepage", () => {
  const body = render(
    <StaticRouter>
      <Provider store={store}>
        <Body />
      </Provider>
    </StaticRouter>
  );
  const shimmer = body.getByTestId("shimmer");
  expect(shimmer.children.length).toBe(10);
});

test("Restaurant should load on Homepage", async () => {
  const body = render(
    <StaticRouter>
      <Provider store={store}>
        <LocationContext.Provider
          value={{
            locationGlobal: {
              loaded: true,
              coordinates: {
                latitude: 123,
                longitude: 123,
              },
            },
            setLocationGlobal: () => {},
          }}
        >
          <Body />
        </LocationContext.Provider>
      </Provider>
    </StaticRouter>
  );
  await waitFor(() => expect(body.getByTestId("search-btn")));

  const resList = body.getByTestId("res-list");

  expect(resList.children.length).toBe(15);
});

test("Search for string(ln) on Homepage", async () => {
  const body = render(
    <StaticRouter>
      <Provider store={store}>
        <LocationContext.Provider
          value={{
            locationGlobal: {
              loaded: true,
              coordinates: {
                latitude: 123,
                longitude: 123,
              },
            },
            setLocationGlobal: () => {},
          }}
        >
          <Body />
        </LocationContext.Provider>
      </Provider>
    </StaticRouter>
  );
  await waitFor(() => expect(body.getByTestId("search-btn")));
  const input = body.getByTestId("search-input");

  fireEvent.change(input, {
    target: {
      value: "ln",
    },
  });
  const searchBtn = body.getByTestId("search-btn");
  fireEvent.click(searchBtn);
  const resList = body.getByTestId("res-list");
  expect(resList.children.length).toBe(1);
});
