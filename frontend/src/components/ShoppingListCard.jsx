import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

const ShoppingListCard = ({ list, onDeleteClick }) => {
  return (
    <Card className="h-100 shadow-sm hover-shadow">
      <Card.Body>
        <Card.Title>{list.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {new Date(list.createdAt).toLocaleDateString('cs-CZ')}
        </Card.Subtitle>
        <Card.Text>
           Stav: {list.archived ? "Archivováno" : "Aktivní"}
        </Card.Text>
      </Card.Body>
      <Card.Footer className="bg-white border-top-0 d-flex justify-content-between">
        <Link to={`/list/${list._id}`}>
            <Button variant="outline-primary" size="sm">Otevřít</Button>
        </Link>
        <div>
           <Button variant="outline-danger" size="sm" onClick={() => onDeleteClick(list._id)}>
             <FaTrash />
           </Button>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default ShoppingListCard;