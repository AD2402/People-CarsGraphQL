import { useMutation, useQuery } from "@apollo/client";
import { Button, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { GET_CARS, UPDATE_CAR } from "../../queries";

const UpdateCar = (props) => {
  const { id, year, make, model, price, personId } = props;
  const [updateCar] = useMutation(UPDATE_CAR);
  const { Option } = Select;

  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const { loading, error, data } = useQuery(GET_CARS);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const onFinish = (values) => {
    const { year, make, model, price, personId } = values;
    year = parseInt(year);
    price = parseFloat(price);

    updateCar({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId,
      },
    });
    props.onButtonClick();
  };

  return (
    <Form
      form={form}
      name="update-car-form"
      layout="inline"
      onFinish={onFinish}
      initialValues={{
        year: year,
        make: make,
        model: model,
        price: price,
        personId: personId,
      }}
    >
      <Form.Item
        name="year"
        rules={[{ required: true, message: "Please input the year!" }]}
      >
        <Input placeholder="i.e. 2022" />
      </Form.Item>
      <Form.Item
        name="make"
        rules={[{ required: true, message: "Please input the make!" }]}
      >
        <Input placeholder="i.e. Ford" />
      </Form.Item>
      <Form.Item
        name="model"
        rules={[{ required: true, message: "Please input the model!" }]}
      >
        <Input placeholder="i.e. Mustang" />
      </Form.Item>
      <Form.Item
        name="price"
        rules={[{ required: true, message: "Please input the price!" }]}
      >
        <Input placeholder="i.e. 50000" />
      </Form.Item>
      <Form.Item
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

      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              (!form.isFieldTouched("year") &&
                !form.isFieldTouched("make") &&
                !form.isFieldTouched("model") &&
                !form.isFieldTouched("price")) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Car
          </Button>
        )}
      </Form.Item>
      <Button type="danger" onClick={props.onButtonClick}>
        Cancel
      </Button>
    </Form>
  );
};

export default UpdateCar;
