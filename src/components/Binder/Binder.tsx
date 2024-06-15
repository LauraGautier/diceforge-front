import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, CardGroup, Container } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { actionGetSheets } from '../../store/thunks/sheetThunks';
import CardItem from '../CardItem/CardItem';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './Binder.scss';

// const CardItem: React.FC<ISheet> = ({
//   id,
//   name,
//   image,
//   class: className,
//   level,
// }) => (
//   <Card
//     onClick={() => {
//       dispatch(actionSetSheetName(name));
//     }}
//   >
//     <CardContent>
//       <CardHeader>{name}</CardHeader>
//       <CardDescription>
//         <img src={image} alt={name} />
//         <p>Classe: {className}</p>
//         <p>Niveau: {level}</p>
//       </CardDescription>
//     </CardContent>
//     <CardContent extra>
//       <ButtonGroup className="binder-btn-group">
//         <Button content={<Icon name="pencil" />} />
//         <Button content={<Icon name="trash" />} />
//       </ButtonGroup>
//     </CardContent>
//   </Card>
// );

function Binder() {
  const dispatch = useAppDispatch();
  // const location = useLocation();
  // const gameId = Number(location.state);

  const sheetName = useAppSelector((state) => state.sheet.sheetName);
  const sheets = useAppSelector((state) => state.sheet.sheets);

  // const [sheets, setSheets] = useState<Sheet[]>([]);
  const gameId = useAppSelector((state) => state.game.currentGame.id);
  console.log('Je suis le urlGameId', gameId);

  // useEffect(() => {
  //   const getSheets = async () => {
  //     try {
  //       console.log('Je suis dans le getSheets', axiosInstance);

  //       const response = await axiosInstance.get(
  //         'http://localhost:3000/api/binder'
  //       );
  //       console.log('response de sheets', response);
  //       setSheets(response.data);
  //     } catch (error) {
  //       console.log('Erreur lors de la récupération des fiches', error);
  //     }
  //   };
  //   getSheets();
  // }, []);

  useEffect(() => {
    dispatch(actionGetSheets());
  }, []);

  return (
    <div className="binder">
      <Header />
      <h1 className="binder-title">Classeur de fiches</h1>
      <Container>
        <CardGroup className="binder-card-container">
          {sheets.map((sheet) => (
            <CardItem key={sheet.id} {...sheet} />
          ))}
        </CardGroup>
      </Container>
      <NavLink to="/api/createsheet" /* state={gameId} */>
        <Button className="binder-btn-createsheet" content="Créer une fiche" />
      </NavLink>
      <NavLink to="/api/game/">
        <Button
          className="binder-btn-backToGame"
          content="Retour à la partie"
        />
      </NavLink>
      <Footer />
    </div>
  );
}

export default Binder;
