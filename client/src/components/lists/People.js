import { useQuery } from "@apollo/client";
import { List, PageHeader } from "antd";
import { GET_PEOPLE } from "../../queries";
import Person from "../listItems/Person";

const getStyles = () => ({
  list: {
    display: "flex",
    justifyContent: "center",
    maxWidth: "100%",
    margin: "50px",
  },
});

const People = () => {
  const styles = getStyles();

  const { loading, error, data } = useQuery(GET_PEOPLE);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  // if (data) console.log("people data", data.people);

  return (
    <>
      <PageHeader title="Records" />
      <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
        <List.Item>
          {data.people.map(({ id, firstName, lastName }) => (
            <List.Item key={id}>
              <Person id={id} firstName={firstName} lastName={lastName} />
            </List.Item>
          ))}
        </List.Item>
      </List>
    </>
  );
};

export default People;
