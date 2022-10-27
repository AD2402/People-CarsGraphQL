import { useMutation, useQuery } from "@apollo/client";
import { Button, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { GET_PEOPLE, UPDATE_CAR } from "../../queries";

const getStyles = () => ({
  inputField: {
    margin: "30px",
  },
});

const UpdateCar = (props) => {
  const { id, year, make, model, price, personId } = props;
  const [updateCar] = useMutation(UPDATE_CAR);
  const { Option } = Select;
  const styles = getStyles();

  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const { loading, error, data } = useQuery(GET_PEOPLE);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  // console.log(data);

  const onFinish = (values) => {
    let { year, make, model, price, personId } = values;
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
      style={styles.inputField}
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
            ? data.people.map((id) => (
                <Option key={id.id} value={String(id.id)}>
                  {id.firstName} {id.lastName}
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
                !form.isFieldTouched("price") &&
                !form.isFieldTouched("personId")) ||
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
