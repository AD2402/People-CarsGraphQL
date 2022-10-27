import { useMutation, useQuery } from "@apollo/client";
import { Button, Form, Input, InputNumber, PageHeader, Select } from "antd";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ADD_CAR, GET_CARS, GET_PEOPLE } from "../../queries";

const getStyles = () => ({
  inputField: {
    margin: "30px",
  },
});

const AddCar = () => {
  const [uuid] = useState(uuidv4());
  const [addCar] = useMutation(ADD_CAR);
  const styles = getStyles();
  const { Option } = Select;
  const { data } = useQuery(GET_PEOPLE);

  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const { year, make, model, price, personId } = values;
    year = parseInt(year);
    price = parseFloat(price);

    addCar({
      variables: {
        id: uuid,
        year,
        make,
        model,
        price,
        personId,
      },
      update: (cache, { data: { addCar } }) => {
        const data = cache.readQuery({ query: GET_CARS });
        cache.writeQuery({
          query: GET_CARS,
          data: {
            ...data,
            cars: [...data.cars, addCar],
          },
        });
      },
      // This is the update function that will be called after the mutation is
    });
  };
  return (
    <>
      <PageHeader title="Add Car" />

      <Form
        form={form}
        name="add-car-form"
        layout="inline"
        size="medium"
        onFinish={onFinish}
        style={{ marginBottom: "40px" }}
      >
        <Form.Item
          style={styles.inputField}
          label="Year"
          name="year"
          rules={[{ required: true, message: "Please input the year!" }]}
        >
          <InputNumber placeholder="i.e. 2022" width="small" />
        </Form.Item>
        <Form.Item
          style={styles.inputField}
          label="Make"
          name="make"
          rules={[{ required: true, message: "Please input the make!" }]}
        >
          <Input placeholder="i.e. Ford" />
        </Form.Item>
        <Form.Item
          style={styles.inputField}
          label="Model"
          name="model"
          rules={[{ required: true, message: "Please input the model!" }]}
        >
          <Input placeholder="i.e. Mustang" />
        </Form.Item>
        <Form.Item
          style={styles.inputField}
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please input the price!" }]}
        >
          <InputNumber placeholder="i.e. 50000" precision={2} step={0.1} />
        </Form.Item>
        <Form.Item
          style={styles.inputField}
          label="Car Owner"
          name="personId"
          rules={[{ required: true, message: "Please input owner name" }]}
        >
          <Select placeholder="Select a person">
            {data
              ? data.people.map((person) => (
                  <Option key={person.id} value={String(person.id)}>
                    {person.firstName} {person.lastName}
                  </Option>
                ))
              : null}
          </Select>
        </Form.Item>

        <Form.Item shouldUpdate={true} style={styles.inputField}>
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
              Add Car
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
};

export default AddCar;
