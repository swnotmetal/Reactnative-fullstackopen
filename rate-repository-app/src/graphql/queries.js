import { gql } from '@apollo/client';
import { REPO_DETAILS } from './fragments';

export const GET_REPOSITORIES = gql`
  query($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
      edges {
        node {
          ...RepoDetails
        }
      }
    }
  }
  ${REPO_DETAILS}
`

export const ME = gql`
  query getCurrentUser($includeReviews: Boolean = false){
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
          id
          text
            createdAt
            rating
            repository {
              fullName
            }
          repositoryId
          }
        }
      }
    }
  }
`

export const AUTHENTICATE = gql`
  mutation Authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

export const GET_SINGLE_REPO = gql` 
  query Repository($id: ID!) {
    repository(id: $id) {
      ...RepoDetails
      url
    }
  }
  ${REPO_DETAILS}
`;

export const GET_REVIEWS = gql`
  query Repository($id: ID!) {
    repository(id: $id) {
      id
      fullName
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;


