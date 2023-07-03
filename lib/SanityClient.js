import sanityClient from "@sanity/client";
import { createClient } from "@sanity/client";
export const client = createClient({
  projectId: "w3mbrubb",
  dataset: "production",
  useCdn: false, // set to `true` to fetch from edge cache
  apiVersion: "2023-05-03", // use current date (YYYY-MM-DD) to target the latest API version
  token:
    "skqlhEsiswEH0QPxCXoqKJZtUjeoDCtvl0Pcg6iQwKGyWa9X6xPh4trPTVvujPNn4Bdoo3PNPXBmwG22YwdrKNzQaCqfL1JmbOwCUsVtk8Y5XXZgM8GGZLxngSj1Sndkb8bWqOj62QXkkGhh3JlR67zvV1HW9BZhPEQbx0xH0Qk1EVa93NQl", // Only if you want to update content with the client
});
