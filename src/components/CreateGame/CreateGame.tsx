import React, { useState, useEffect } from 'react';
import { Form, Button, Input, Dropdown } from 'semantic-ui-react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import axios from 'axios';
import './CreateGame.scss';

function CreateGame() {
  const [inputs, setInputs] = useState([
    { id: 1, name: 'Titre', placeholder: 'Titre', value: '' },
    { id: 2, name: 'Licence', placeholder: 'Licence', value: '' },
    {
      id: 3,
      name: 'Joueur',
      placeholder: 'Ajouter un joueur',
      value: '',
    },
  ]);
  const [licenseOptions, setLicenseOptions] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/license')
      .then((response) => {
        const { data } = response;
        if (data) {
          const options = data.map((license) => ({
            key: license.id,
            text: license.name,
            value: license.name,
          }));
          setLicenseOptions(options);
        } else {
          setLicenseOptions([]);
        }
      })
      .catch((error) => console.error('Ca marche pas meuf:', error));
  }, []);

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = { ...newInputs[index], value };
    setInputs(newInputs);
  };

  const handleAddInput = () => {
    setInputs([
      ...inputs,
      {
        id: inputs.length + 1,
        name: `Joueur${inputs.length + 1}`,
        placeholder: 'Paramètre personnalisé',
        value: '',
      },
    ]);
  };

  const handleRemoveInput = (id) => {
    setInputs(inputs.filter((input) => input.id !== id));
  };

  return (
    <div className="create">
      <Header />
      <div className="create-content">
        <h1 className="create-title">Créer ta partie</h1>
        <div className="create-form">
          <Form>
            {inputs.map((input, index) => (
              <Form.Field key={input.id}>
                {input.name === 'Licence' ? (
                  <Dropdown
                    placeholder={input.placeholder}
                    fluid
                    selection
                    options={licenseOptions}
                    value={input.value}
                    onChange={(e, { value }) => handleInputChange(index, value)}
                  />
                ) : (
                  <Input
                    placeholder={input.placeholder}
                    value={input.value}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                  />
                )}
                {index >= 3 && (
                  <Button
                    onClick={() => handleRemoveInput(input.id)}
                    icon="minus"
                    negative
                    compact
                  />
                )}
              </Form.Field>
            ))}
          </Form>
          <Button onClick={handleAddInput} primary>
            +
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CreateGame;
