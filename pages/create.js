import React, { useState } from 'react'
import {
  Form, Input, TextArea, Button, Image, Message, Icon, Header,
} from 'semantic-ui-react'

const INITIAL_PRODUCT = {
  name: '',
  price: 0,
  media: '',
  description: '',
}

const CreateProduct = () => {
  const [product, setProduct] = useState(INITIAL_PRODUCT)

  const [mediaPreview, setMediaPreview] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = e => {
    const { name, value, files } = e.target
    if (name === 'media') {
      setProduct(state => ({ ...state, media: files[0] }))
      setMediaPreview(window.URL.createObjectURL(files[0]))
      // console.log(mediaPreview)
    }
    setProduct(state => ({ ...state, [name]: value }))
    // console.log(product)
  }

  const handleSubmit = e => {
    e.preventDefault()
    setProduct(INITIAL_PRODUCT)
    // console.log(product)
    setSubmitSuccess(true)
  }

  return (
    <>
      <Header as="h2" block>
        <Icon name="add" color="orange" />
        Create New Product
      </Header>
      <Form success={submitSuccess} onSubmit={handleSubmit}>
        <Message
          success
          icon="check"
          header="Success!"
          content="Your product has been posted"
        />
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            name="name"
            label="Name"
            placeholder="Name"
            value={product.name}
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="price"
            label="Price"
            placeholder="Price"
            type="number"
            min="0.00"
            step="0.01"
            value={product.price}
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="media"
            label="Media"
            placeholder="Media"
            type="file"
            content="Select Image"
            accept="image/*"
            value={product.media}
            onChange={handleChange}
          />
        </Form.Group>

        <Image src={mediaPreview} rounded centered size="small" />

        <Form.Field 
          control={TextArea}
          name="description"
          label="Description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
        />
        <Form.Field 
          control={Button}
          color="blue"
          icon="pencil alternate"
          content="Submit"
          type="Submit"
        />

      </Form>
    </>
  )
}

export default CreateProduct
