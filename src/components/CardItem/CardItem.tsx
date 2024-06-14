import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  Icon,
} from 'semantic-ui-react';
import { ISheet } from '../../@Types/sheet';
import { useAppDispatch } from '../../hooks/hooks';
import { actionSetSheetName } from '../../store/reducers/sheetReducer';

function CardItem({ id, name, image, level, class: className }: ISheet) {
  const dispatch = useAppDispatch();
  return (
    <Card
      className="card-container"
      onClick={() => {
        dispatch(actionSetSheetName(name));
      }}
    >
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
}
export default CardItem;
