import { render, cleanup, waitFor } from "@testing-library/react"
import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import { afterEach, describe, expect, test } from "vitest"
import App from "./App"

describe("App", () => {
  afterEach(cleanup);

  test("When page loads, posts are rendered", async () => {
    const mock = new MockAdapter(axios);
    mock.onGet("https://jsonplaceholder.typicode.com/posts").reply(200, [
      {
        userId: 1,
        id: 1,
        title: "title test 1",
        body: "body test 1"
      },
      {
        userId: 1,
        id: 2,
        title: "title test 2",
        body: "body test 2"
      }
    ]);
    const { getByTestId }  = render(<App />);
    const postList:any = await waitFor(() => getByTestId("posts"));
    expect(postList).toMatchSnapshot();
  });
  
})