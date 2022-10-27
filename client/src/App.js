import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  useQuery,
} from "@apollo/client";
import "./App.css";
import AddPerson from "./components/forms/AddPerson";
import Title from "./components/layout/Title";
import People from "./components/lists/People";
import AddCar from "./components/forms/AddCar";
import { GET_PEOPLE } from "./queries";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  const { data } = useQuery(GET_PEOPLE);

  // console.log("data", data.people.length);
  let addCar = "";

  if (data?.people?.length > 0) {
    addCar = <AddCar />;
  }

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <>
          <Title />
          <AddPerson />
          {addCar}
          <People />
        </>
      </div>
    </ApolloProvider>
  );
};

export default App;
