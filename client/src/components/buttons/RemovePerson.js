import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import filter from "lodash/filter";
import { GET_PEOPLE, REMOVE_PERSON } from "../../queries";

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

  const handleButtonClick = () => {
    let result = window.confirm("Are you sure you want to delete this person?");

    if (result) {
      removePerson({
        variables: {
          id,
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
