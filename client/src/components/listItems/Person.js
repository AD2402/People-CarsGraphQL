import { useState } from "react";

import { EditOutlined } from "@ant-design/icons";
import { Card, PageHeader } from "antd";
import RemovePerson from "../buttons/RemovePerson";
import UpdatePerson from "../forms/UpdatePerson";
import Cars from "../lists/Cars";
import { Link } from "react-router-dom";

const getStyles = () => ({
  card: {
    width: "500px",
  },
});
const Person = (props) => {
  const { id, firstName, lastName } = props;
  const styles = getStyles();

  const [editMode, setEditMode] = useState(false);

  const handleButtonClick = () => setEditMode(!editMode);

  return (
    <>
      {editMode ? (
        <UpdatePerson
          id={id}
          firstName={firstName}
          lastName={lastName}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          style={styles.card}
          actions={[
            <Link to={`/people/${id}`}>LEARN MORE</Link>,
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemovePerson id={id} />,
          ]}
        >
          {firstName} {lastName}
          <Cars id={id} />
        </Card>
      )}
    </>
  );
};

export default Person;
