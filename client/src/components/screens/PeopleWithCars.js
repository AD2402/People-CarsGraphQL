import { Card } from 'antd'
import { useQuery } from '@apollo/client'
import { GET_PERSON_WITH_CARS,  } from '../../queries'
import { List } from 'antd'
import { useParams, Link } from 'react-router-dom'

const getStyles = () => ({
  card: {
    width: '500px',
  },
})

const PeopleWithCars = () => {
  const styles = getStyles()

  let { id } = useParams()

  const { loading, error, data } = useQuery(GET_PERSON_WITH_CARS, {
    variables: { id: id },
  })

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`


  return (
    <div className="People">
      <Link to={`/`}>GO BACK HOME</Link>
      <h1>Person ID : {id}</h1>
      {loading ? (
        <h1>Still Loading</h1>
      ) : (
        <Card style={styles.card}>
          {data.findPersonById.firstName} {data.findPersonById.lastName}
          <List grid={{ gutter: 20, column: 1 }} style={styles.list}></List>
        </Card>
      )}
    </div>
  )
}

export default PeopleWithCars
