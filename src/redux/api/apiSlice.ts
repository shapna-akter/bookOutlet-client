import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { env } from "../../shared/mainApi";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: env.baseUrl,
  }),
  tagTypes: ["book", "Reviews"],
  endpoints: () => ({}),
});
