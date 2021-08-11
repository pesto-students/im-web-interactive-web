import { gql } from "@apollo/client";

const NEW_RELEASES = gql`
  query {
    filterMovies(filter: { key: "isPublished", value: "true" }) {
      id
      mId
      name
      title
      description
      url
      genre
      createdAt
      thumbnails {
        high {
          url
          width
          height
        }
        maxres {
          url
          width
          height
        }
      }
    }
  }
`;

export { NEW_RELEASES };
