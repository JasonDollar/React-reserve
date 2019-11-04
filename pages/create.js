import React, { useState, useEffect } from 'react'
import {
  Form, Input, TextArea, Button, Image, Message, Icon, Header,
} from 'semantic-ui-react'
import axios from 'axios'
import baseUrl from '../utils/baseUrl'
import catchErrors from '../utils/catchErrors'

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
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const isProduct = Object.values(product).every(item => Boolean(item))
    isProduct ? setDisabled(false) : setDisabled(true)
  }, [product])

  const handleChange = e => {
    const { name, value, files } = e.target
    if (name === 'media') {
      
      setProduct(state => ({ ...state, media: files[0] }))
      setMediaPreview(window.URL.createObjectURL(files[0]))
      // console.log(mediaPreview)
    } else {

      setProduct(state => ({ ...state, [name]: value }))
    }
  }

  const handleImageUpload = async () => {
    
    const data = new FormData()
    data.append('file', product.media)
    data.append('upload_preset', 'react_reserve')
    data.append('cloud_name', 'jddevcenter')

    const res = await axios.post(process.env.CLOUDINARY_URL, data)
    const mediaUrl = res.data.url
    return mediaUrl
  }

  const handleSubmit = async e => {
    try {
      e.preventDefault()
      setLoading(true)
      const mediaUrl = await handleImageUpload()
  
      const url = `${baseUrl}/api/product`
      const payload = { ...product, mediaUrl, name: '' }
      await axios.post(url, payload)
      
      setProduct(INITIAL_PRODUCT)
      setSubmitSuccess(true)
      
    } catch (error) {
      console.error(error)
      catchErrors(error, setError)
    } finally {

      setLoading(false)
    }
  }

  return (
    <>
      <Header as="h2" block>
        <Icon name="add" color="orange" />
        Create New Product
      </Header>
      <Form loading={loading} error={Boolean(error)} success={submitSuccess} onSubmit={handleSubmit}>
        <Message
          error
          header="Oops!"
          content={error}
        />
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
            // no value prop for file input type - input requires value as a string not a file itself
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
          disabled={loading || disabled}
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
