import React, { useState, useEffect } from 'react'
import {
  Button, Form, Icon, Message, Segment, 
} from 'semantic-ui-react'
import Link from 'next/link'
import catchErrors from '../utils/catchErrors'

const INIT_USER = {
  email: '',
  password: '',
}

const Login = () => {
  const [user, setUser] = useState(INIT_USER)
  const [disabled, setDisabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const isUser = Object.values(user).every(item => Boolean(item))
    isUser ? setDisabled(false) : setDisabled(true)
  }, [user])

  const handleChange = e => {
    const { value, name } = e.target
    setUser(state => ({ ...state, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      setLoading(true)
      setError('')
    } catch (error) {
      catchErrors(error, setError)
    } finally {
      setLoading(false)
    }
  }


  return (
    <>
      <Message attached icon="privacy" header="Welcome Back!" content="Login with email and password" color="blue" />
      <Form onSubmit={handleSubmit} error={Boolean(error)}>
        <Message error header="Oops!" content={error.message} />
        <Segment>
          <Form.Input fluid icon="envelope" iconPosition="left" label="Email" placeholder="Email" name="email" type="email" value={user.email} onChange={handleChange} />
          <Form.Input fluid icon="lock" iconPosition="left" label="Password" placeholder="Password" name="password" type="password" value={user.password} onChange={handleChange} />
          <Button icon="signup" type="submit" color="orange" content="Signup" disabled={disabled || loading} />
        </Segment>
      </Form>
      <Message attached="bottom" warning>
        <Icon name="help" />
        New user? 
        <Link href="/signup">
          <a> Sign up here </a>
        </Link> 
        instead.
      </Message>
    </>
  )
}

export default Login
