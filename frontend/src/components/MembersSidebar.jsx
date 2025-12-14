import { Card, ListGroup, Button, Badge } from 'react-bootstrap';
import { FaUser, FaUserPlus, FaSignOutAlt } from 'react-icons/fa';

const MembersSidebar = ({ list, currentUser, isOwner, onAddMemberClick, onRemoveMember, onLeaveList }) => {
  return (
    <Card className="shadow-sm">
      <Card.Header className="bg-white fw-bold d-flex justify-content-between align-items-center">
        <span><FaUser className="me-2"/> Členové</span>
        {isOwner && (
          <Button size="sm" variant="dark" onClick={onAddMemberClick}>
            <FaUserPlus /> Pozvat
          </Button>
        )}
      </Card.Header>
      <ListGroup variant="flush">
        {/* Vlastník */}
        <ListGroup.Item className="d-flex justify-content-between align-items-center bg-light">
          <div>
            <strong>{list.ownerId.name}</strong> <br/>
            <small className="text-muted">{list.ownerId.email}</small>
          </div>
          <Badge bg="primary">Vlastník</Badge>
        </ListGroup.Item>

        {/* Členové */}
        {list.members.map(member => (
          <ListGroup.Item key={member._id} className="d-flex justify-content-between align-items-center">
            <div>
              {member.name} <br/>
              <small className="text-muted">{member.email}</small>
            </div>
            {isOwner && (
              <Button variant="outline-danger" size="sm" onClick={() => onRemoveMember(member._id)}>
                &times;
              </Button>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>

      {!isOwner && (
        <Card.Footer className="text-center bg-white border-top-0">
          <Button variant="outline-danger" size="sm" className="w-100" onClick={onLeaveList}>
            <FaSignOutAlt className="me-2" /> Opustit seznam
          </Button>
        </Card.Footer>
      )}
    </Card>
  );
};

export default MembersSidebar;