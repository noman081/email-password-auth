import './App.css';
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import app from './firebase.init';

const auth = getAuth(app);

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [registered, setRegistered] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleNameOnBlur = event => {
    setName(event.target.value);
  }
  const handleEmailOnBlur = event => {
    setEmail(event.target.value);
  }
  const handlePasswordOnBlur = event => {
    setPassword(event.target.value);
  }

  const handleSubmit = event => {

    console.log('submitted', email, password);
    if (registered) {
      signInWithEmailAndPassword(auth, email, password)
        .then(result => {
          console.log(result.user);
          setSuccess('Login Successfull');
        })
        .catch(error => {
          console.error(error);
          setSuccess('');
          setError(error.message);
        })
    }
    else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
          emailVerify();
          updateName();
          setSuccess('Register Successfull');
        })
        .catch(error => {
          console.error(error);
          setSuccess('');
          setError(error.message);
        });
    }
    event.preventDefault();
  }

  const handleCheckbox = event => {
    setRegistered(event.target.checked);
    setError('');
    setSuccess('');
  }
  const updateName = () => {
    updateProfile(auth.currentUser, { displayName: name })
      .then(() => {
        console.log('name successfull');
      })
      .catch(error => {
        setError(error.message);
      })
  }
  const resetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setSuccess('Email has sent');
      })
      .catch(error => {
        setError(error.message);
      })
  }
  const emailVerify = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log('verification sent');
      })
  }

  return (
    <div className='mx-auto'>
      <h1 className="text-primary text-center mt-3">Please {registered ? 'Login' : 'Register'}</h1>
      <Form className='w-50 mx-auto border border-secondary p-5 rounded-3 shadow-lg mt-3'>
        {
          !registered && <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Your Name: </Form.Label>
            <Form.Control type="text" onBlur={handleNameOnBlur} placeholder="Your Name" />
          </Form.Group>
        }
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" onBlur={handleEmailOnBlur} placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" onBlur={handlePasswordOnBlur} placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check onChange={handleCheckbox} type="checkbox" label="Already Registered?" />
        </Form.Group>
        {
          registered && <><Button variant="link" onClick={resetPassword}>Reset Password</Button><br /></>
        }
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          {registered ? 'Login' : 'Register'}
        </Button>
        <p className={`mt-2 ${success ? 'text-success' : 'text-danger'}`}>{success ? success : error}</p>
      </Form>
    </div>
  );
}

export default App;
