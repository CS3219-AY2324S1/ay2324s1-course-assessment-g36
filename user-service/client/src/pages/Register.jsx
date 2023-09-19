import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup'
import "../style.css"

const Register = () => {
  const navigate = useNavigate()

  const initialValues = {
    username: "",
    email: "",
    password: "",
  }

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().min(8).max(15).required(),
  })

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/users/register", data).then((res) => {
      console.log(res);
      navigate("/")
  });
  }

  return (
    <div className='register'>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className='formContainer'>
          <label>username</label>
          <ErrorMessage name="username" component="span"/>
          <Field id="registerInput" name="username" placeholder="Bob"/>

          <label>email</label>
          <ErrorMessage name="email" component="span"/>
          <Field id="registerInput" name="email" placeholder="example@gmail.com"/>

          <label>password</label>
          <ErrorMessage name="password" component="span"/>
          <Field id="registerInput" name="password" type="password"/>
          <button type="submit">register</button>
        </Form>
      </Formik>
    </div>
  )
}

export default Register