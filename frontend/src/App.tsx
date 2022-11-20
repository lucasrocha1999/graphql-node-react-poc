import { useQuery, gql, useMutation } from '@apollo/client';
import { Button } from './components/Button';
import { NewUserForm } from './components/NewUserForm';

type User = {
  id: string
  name: string
}

export const GET_USERS = gql`
  query {
    users {
      id,
      name
    }
  }
`

const DELETE_USER = gql`
    mutation ($id: String!) {
      deleteUser(id: $id)
    }
`

const App: React.FC = () => {
  const { data, loading } = useQuery<{users: User[]}>(GET_USERS)
  const [deleteUser] = useMutation(DELETE_USER)

  if (loading) return <p>Carregando...</p>

  const handleDeleteUser = async (id: string) => {
    await deleteUser({
      variables: {
        id,
      },
      refetchQueries: [GET_USERS],
    })
  }

  return (
   <div>
      <ul>
        {data?.users.map(user => 
          <li key={user.id}>
            {user.name}{" "}
            <Button
              id={user.id}
              buttonName="Deletar"
              onDeleteUser={handleDeleteUser}
            />
          </li>
        )}
      </ul>
      <NewUserForm />
   </div>
  )
}

export default App
