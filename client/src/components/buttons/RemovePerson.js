import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import filter from "lodash/filter";
import {
  GET_CARS,
  GET_PEOPLE,
  REMOVE_CARS_BY_PERSON,
  REMOVE_PERSON,
} from "../../queries";

const RemovePerson = ({ id }) => {
  const [removePerson] = useMutation(REMOVE_PERSON, {
    update(cache, { data: { removePerson } }) {
      const { people } = cache.readQuery({ query: GET_PEOPLE });
      cache.writeQuery({
        query: GET_PEOPLE,
        data: {
          people: filter(people, (o) => {
            return o.id !== removePerson.id;
          }),
        },
      });
    },
  });

  const [removeCar] = useMutation(REMOVE_CARS_BY_PERSON, {
    update(cache, { data: { removeCar } }) {
      const { cars } = cache.readQuery({ query: GET_CARS });
      cache.writeQuery({
        query: GET_CARS,
        data: {
          cars: filter(cars, (o) => {
            return o.personId !== removeCar.id;
          }),
        },
      });
    },
  });

  const handleButtonClick = () => {
    let result = window.confirm("Are you sure you want to delete this person?");

    if (result) {
      removePerson({
        variables: {
          id,
        },
      });
      removeCar({
        variables: {
          personId: id,
        },
      });
    }
  };

  return (
    <DeleteOutlined
      key="delete"
      onClick={handleButtonClick}
      style={{ color: "red" }}
    />
  );
};

export default RemovePerson;
