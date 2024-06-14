import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Dropdown, Form, FormInput } from 'semantic-ui-react';
import { ILicences } from '../../@Types/game';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { actionChangeGameDatas, actionResetCurrentGame } from '../../store/reducers/gameReducer';
import {
  actionPostGame,
  actionSearchGamesLicences,
} from '../../store/thunks/gameThunks';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './CreateGame.scss';

function CreateGame() {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState('');
  const [licence, setLicence] = useState<string>('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  // useEffect(() => {
  //   axiosInstance
  //     .get('license')
  //     .then((response) => {
  //       const { data } = response;
  //       console.log('Licences:', data);

  //       if (data) {
  //         const options = data.map((license: ILicenceOption) => ({
  //           key: license.id,
  //           text: license.name,
  //           value: license.name,
  //         }));
  //         setLicenseOptions(options);
  //       } else {
  //         setLicenseOptions([]);
  //       }
  //     })
  //     .catch((error) => console.error('Erreur: ', error));
  // }, []);

  useEffect(() => {
    dispatch(actionSearchGamesLicences());
    dispatch(actionResetCurrentGame());
  }, []);

  const game = useAppSelector((state) => state.game.currentGame);

  useEffect(() => {
    if (game.id !== 0) {
      navigate(`/api/game/${game.id}`);
    }
    console.log('useEffect : ', game);
  }, [game]);

  const licences = useAppSelector((state) => state.game.licences);
  const licencesOptions = licences.map((licence: ILicences) => {
    return {
      key: licence.id,
      text: licence.name,
      value: licence.name,
    };
  });
  // licences.forEach((licence) => {
  //   licenseOptions.push(licence);
  //   setLicenseOptions(licenseOptions);
  // });

  // const postGame = async (formData: any) => {
  //   try {
  //     const response = await axiosInstance.post('/game', formData);

  //     console.log('Success:', response.data);
  //     const gameId = response.data.id;
  //     dispatch(actionSetGameId({ gameId }));
  //     navigate(`/api/game/${gameId}`);
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  /* const handlePlayerChange = (index: number, value: string) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const handleAddPlayer = () => {
    setEmails([...emails, '']);
  };

  const handleRemovePlayer = (index: number) => {
    setEmails(emails.filter((_, i) => i !== index));
  }; */

  const handleSubmit = async () => {
    dispatch(actionChangeGameDatas({ name: 'name', value: title }));
    dispatch(
      actionChangeGameDatas({
        name: 'license_name',
        value: licence,
      })
    );
    dispatch(actionChangeGameDatas({ name: 'email', value: email }));
    await dispatch(actionPostGame());
  };

  return (
    <div className="create-game">
      <Header />
      <div className="create-game-content">
        <h1 className="create-game-title">Créer ta partie</h1>
        <div className="create-game-form">
          <Form onSubmit={handleSubmit}>
            <FormInput
              className="create-game-input"
              label="Nom de la partie"
              placeholder="Nom de la partie"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              icon="game"
              iconPosition="left"
            />
            <label className="create-game-licences">
              Licences
              <Dropdown
                className="create-game-licences-input"
                placeholder="Licence"
                selection
                options={licencesOptions}
                value={licence}
                onChange={(e, { value }) => setLicence(value as string)}
              />
            </label>
            {/* {emails.map((email, index) => (
              <Form.Field key={index} className="create-game-form-field">
                <FormInput
                  className="create-game-input"
                  label="Ajouter un joueur"
                  placeholder="Ajouter un joueur"
                  value={email}
                  onChange={(e) => {
                    handlePlayerChange(index, e.target.value);
                  }}
                  icon="at"
                  iconPosition="left"
                />
                {index > 0 && (
                  <Button
                    className="create-game-delete-player-btn"
                    onClick={() => handleRemovePlayer(index)}
                    icon="minus"
                  />
                )}
              </Form.Field>
            ))} */}

            <FormInput
              className="create-game-input"
              label="Email du joueur"
              placeholder="Email du joueur"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon="at"
              iconPosition="left"
            />

            {/* <Button
              onClick={handleAddPlayer}
              icon="plus"
              className="create-game-add-player-btn"
            /> */}
            <div className="submit-container">
              <Button className="create-game-submit-btn" content="Valider" />
            </div>
          </Form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CreateGame;
