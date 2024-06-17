import { useState } from 'react';
import { Button, Form, FormInput, Message } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { actionSetForgotPasswordEmail } from '../../store/reducers/authReducer';
import { actionForgotPassword } from '../../store/thunks/authThunks';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './Forgot-password.scss';

function ForgotPassword() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  // const [message, setMessage] = useState<string | null>(null);
  // const [error, setError] = useState<string | null>(null);

  const handlesubmit = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    dispatch(actionSetForgotPasswordEmail(email));
    dispatch(actionForgotPassword());
    //   const response = await axiosInstance.post('forgot-password', { email });
    //   console.log(response);
    //   if (response.status === 200) {
    //     setMessage(response.data.message);
    //     setError(null);
    //   }
    // } catch (err) {
    //   setError('Une erreur est survenue. Veuillez réessayer.');
    //   setMessage(null);
    // }
  };
  const storeEmail = useAppSelector((state) => state.auth.email); 
  const message = useAppSelector((state) => state.auth.message);
  const error = useAppSelector((state) => state.auth.error);
  return (
    <div className="forgot-password">
      <Header />
      <h1>{error}</h1>
      <h1 className="forgot-password-title">Mot de passe oublié ?</h1>
      {message && <Message success content={message} />}
      {error && <Message negative content={error} />}
      <div className="forgot-password-form">
        <Form onSubmit={handlesubmit}>
          <FormInput
            label="Email"
            icon="at"
            iconPosition="left"
            placeholder="Email"
            className="forgot-password-input"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Button
            type="submit"
            content="Envoyer"
            className="forgot-password-submit-btn"
          />
        </Form>
      </div>
      <Footer />
    </div>
  );
}

export default ForgotPassword;