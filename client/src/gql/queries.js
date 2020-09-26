import {gql} from '@apollo/client'

const AddUser = gql`
    mutation($email: String!, $name: String!, $password: String!) {
        signup(email: $email, name: $name, password: $password) {
            email
            name
            password
        }
    }
`
const LoginUser = gql`
query($email: String!, $password: String!){
  login(email:$email, password:$password) {
    email
    password
    user {
        id
    }
  }
}
`
const AddList = gql`
mutation($header: String!, $context: String!, $userId: ID!) {
  addList(header: $header,context: $context, userId: $userId){
    header
  }
}
`
const ListType = gql`
   query($userId: ID!){
  lists(userId: $userId) {
    id
    header
    context
    user{
      email
    }
  }
}
`
const getUserName = gql`
  query($id : ID!) {
    user(id: $id) {
      name
    }
  }
`
const deleteList = gql`
  mutation($id: ID!) {
    deletelist(id: $id) {
      id
    }
  }
`
export  { AddUser, LoginUser, AddList, ListType, getUserName,deleteList }