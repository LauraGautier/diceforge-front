import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardDescription,
  CardGroup,
  CardHeader,
  Container,
  Icon,
} from 'semantic-ui-react';
import axiosInstance from '../../axios/axios';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './Binder.scss';

interface Sheet {
  id: number;
  name: string;
  image: string;
  class: string;
  level: number;
}

const CardItem: React.FC<Sheet> = ({
  id,
  name,
  image,
  class: className,
  level,
}) => (
  <Card>
    <CardContent>
      <CardHeader>{name}</CardHeader>
      <CardDescription>
        <img src={image} alt={name} />
        <p>Classe: {className}</p>
        <p>Niveau: {level}</p>
      </CardDescription>
    </CardContent>
    <CardContent extra>
      <ButtonGroup className="binder-btn-group">
        <Button content={<Icon name="pencil" />} />
        <Button content={<Icon name="trash" />} />
      </ButtonGroup>
    </CardContent>
  </Card>
);

function Binder() {
  const location = useLocation();
  const gameId = Number(location.state);
  console.log('Je suis le urlGameId', gameId);

  const [sheets, setSheets] = useState<Sheet[]>([]);

  useEffect(() => {
    const getSheets = async () => {
      try {
        console.log('Je suis dans le getSheets', axiosInstance);

        const response = await axiosInstance.get(
          'http://localhost:3000/api/binder'
        );
        console.log('response de sheets', response);
        setSheets(response.data);
      } catch (error) {
        console.log('Erreur lors de la récupération des fiches', error);
      }
    };
    getSheets();
  }, []);

  return (
    <div className="binder">
      <Header />
      <h1 className="binder-title">Classeur de fiches</h1>
      <Container>
        <CardGroup>
          {sheets.map((sheet) => (
            <CardItem key={sheet.id} {...sheet} />
          ))}
        </CardGroup>
      </Container>
      <NavLink to="/api/createsheet" state={gameId}>
        <Button className="binder-btn-createsheet" content="Créer une fiche" />
      </NavLink>
      <NavLink to="/api/game/">
        <Button content="Retour à la partie" />
      </NavLink>
      <Footer />
    </div>
  );
}

export default Binder;
