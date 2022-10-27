import { Card } from "antd";
import { useQuery } from "@apollo/client";
import { GET_PERSON_WITH_CARS, GET_PERSON } from "../../queries";
import { List } from "antd";
import { useParams, Link } from "react-router-dom";

const getStyles = () => ({
  card: {
    width: "500px",
  },
});

const PeopleWithCars = () => {
  const styles = getStyles();

  let { personId } = useParams();

  console.log(personId);

  const { loading, error, data } = useQuery(GET_PERSON, {
    variables: { personId },
  });

  const { loading2, error2, data2 } = useQuery(GET_PERSON_WITH_CARS, {
    variables: { personId },
  });

  return (
    <div className="People">
      <h1>Person ID : {personId}</h1>
      {loading ? (
        <h1>Still Loading</h1>
      ) : (
        <Card style={styles.card}>
          {data.person.firstName} {data.person.lastName}
          <List grid={{ gutter: 20, column: 1 }} style={styles.list}></List>
          {data2.personWithCars.map(({ id, year, make, model }) => (
            <List.Item key={id}>
              <Card type="inner" title={`${make} ${model}`}>
                Year: {year}
              </Card>
            </List.Item>
          ))}
        </Card>
      )}

      <Link to={`/`}>GO BACK HOME</Link>
    </div>
  );
};

export default PeopleWithCars;
