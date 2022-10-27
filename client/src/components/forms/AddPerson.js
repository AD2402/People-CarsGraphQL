import { gql, useMutation } from "@apollo/client";
import { Button, Form, Input, PageHeader } from "antd";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ADD_PERSON, GET_PEOPLE } from "../../queries";

const AddPerson = () => {
  const [uuid] = useState(uuidv4());
  const [addPerson] = useMutation(ADD_PERSON);

  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const { firstName, lastName } = values;

    addPerson({
      variables: {
        id: uuid,
        firstName,
        lastName,
      },
      update: (cache, { data: { addPerson } }) => {
        const data = cache.readQuery({ query: GET_PEOPLE });
        cache.writeQuery({
          query: GET_PEOPLE,
          data: {
            ...data,
            people: [...data.people, addPerson],
          },
        });
      },
      // This is the update function that will be called after the mutation is
    });
  };
  return (
    <>
      <PageHeader title="Add Person" />
      <Form
        form={form}
        name="add-person-form"
        layout="inline"
        size="large"
        onFinish={onFinish}
        style={{ marginBottom: "40px" }}
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input placeholder="i.e. Indiana" />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "Please input your last name!" }]}
        >
          <Input placeholder="i.e. Jones" />
        </Form.Item>

        <Form.Item shouldUpdate={true}>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Add Person
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
};

export default AddPerson;
