import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup'
import "../style.css"

const Register = () => {
  const navigate = useNavigate()

  const initialValues = {
    Username: "",
    Email: "",
    Password: "",
  }

  const validationSchema = Yup.object().shape({
    Username: Yup.string().required(),
    Email: Yup.string().required(),
    Password: Yup.string().min(8).max(15).required(),
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
          <label>Username</label>
          <ErrorMessage name="Username" component="span"/>
          <Field id="registerInput" name="Username" placeholder="Bob"/>

          <label>Email</label>
          <ErrorMessage name="Email" component="span"/>
          <Field id="registerInput" name="Email" placeholder="example@gmail.com"/>

          <label>Password</label>
          <ErrorMessage name="Password" component="span"/>
          <Field id="registerInput" name="Password" type="password"/>
          <button type="submit">register</button>
        </Form>
      </Formik>
    </div>
  )
}

export default Register