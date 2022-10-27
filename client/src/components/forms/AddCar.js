import { useMutation, useQuery } from '@apollo/client'
import { Button, Form, Input, PageHeader, Select } from 'antd'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ADD_CAR, GET_CARS, GET_PEOPLE } from '../../queries'

const getStyles = () => ({
  inputField: {
    margin: '30px',
  },
})

const AddCar = () => {
  const [id] = useState(uuidv4())
  const [addCar] = useMutation(ADD_CAR)
  const styles = getStyles()
  const { Option } = Select
  const { data } = useQuery(GET_PEOPLE)

  // console.log(data);

  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  useEffect(() => {
    forceUpdate({})
  }, [])

  const onFinish = (values) => {
    let { year, make, model, price, personId } = values
    // console.log(values);
    year = parseInt(year)
    price = parseFloat(price)

    addCar({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId,
      },
      update: (cache, { data: { addCar } }) => {
        const data = cache.readQuery({ query: GET_CARS })
        cache.writeQuery({
          query: GET_CARS,
          data: {
            ...data,
            cars: [...data.cars, addCar],
          },
        })
      },
    })
  }
  return (
    <>
    <div style={{ borderTop: '1px solid grey', width:'100%' }}></div>
      <PageHeader  title="Add Car" />

      <Form
        form={form}
        name="add-car-form"
        layout="inline"
        size="medium"
        onFinish={onFinish}
        style={{ marginBottom: '40px' }}
      >
        <Form.Item
          style={styles.inputField}
          label="Year"
          name="year"
          rules={[{ required: true, message: 'Please input the year!' }]}
        >
          <Input placeholder="Year" width="small" />
        </Form.Item>
        <Form.Item
          style={styles.inputField}
          label="Make"
          name="make"
          rules={[{ required: true, message: 'Please input the make!' }]}
        >
          <Input placeholder="Make" />
        </Form.Item>
        <Form.Item
          style={styles.inputField}
          label="Model"
          name="model"
          rules={[{ required: true, message: 'Please input the model!' }]}
        >
          <Input placeholder="Model" />
        </Form.Item>
        <Form.Item
          style={styles.inputField}
          label="Price"
          name="price"
          rules={[{ required: true, message: 'Please input the price!' }]}
        >
          <Input placeholder="$" precision={2} step={0.1} />
        </Form.Item>
        <Form.Item
          style={styles.inputField}
          label="Car Owner"
          name="personId"
          rules={[{ required: true, message: 'Please input owner name' }]}
        >
          <Select
            style={{
              width: 120,
            }}
          >
            {data.people.map(({ id, firstName, lastName }) => (
              <Option value={id} key={id}>
                {firstName} {lastName}
              </Option>
            ))}
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
  )
}

export default AddCar
