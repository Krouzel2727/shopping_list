import { useParams } from 'react-router-dom';
import { Container, Row, Col, Spinner, Form, InputGroup, Button, Modal } from 'react-bootstrap';
import { FaCheck, FaPen } from 'react-icons/fa';

// Importy komponent
import MembersSidebar from '../components/MembersSidebar';
import ShoppingItemsList from '../components/ShoppingItemsList';
// Import LOGIKY
import { useShoppingListLogic } from '../hooks/useShoppingListLogic';

const ListDetail = () => {
  const { id } = useParams();
  
  // ★ MAGICKÝ ŘÁDEK: Všechnu logiku taháme z hooku ★
  const logic = useShoppingListLogic(id);

  // --- RENDER ---
  if (logic.loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;
  if (logic.error) return <Container className="mt-5 text-danger">Chyba: {logic.error}</Container>;
  if (!logic.list) return <Container className="mt-5">Seznam nenalezen</Container>;

  return (
    <Container className="mb-5">
      <div className="d-flex align-items-center justify-content-between mb-4 border-bottom pb-3">
        {logic.editingName ? (
            <InputGroup style={{ maxWidth: '400px' }}>
                <Form.Control value={logic.tempName} onChange={e => logic.setTempName(e.target.value)} />
                <Button variant="success" onClick={logic.handleUpdateName}><FaCheck /></Button>
                <Button variant="secondary" onClick={() => logic.setEditingName(false)}>X</Button>
            </InputGroup>
        ) : (
            <h2 className="d-flex align-items-center gap-3">
                {logic.list.name}
                {logic.isOwner && (
                    <Button variant="link" size="sm" onClick={() => logic.setEditingName(true)} className="text-muted">
                        <FaPen />
                    </Button>
                )}
            </h2>
        )}
      </div>

      <Row>
        <Col md={4} className="mb-4">
          <MembersSidebar 
            list={logic.list}
            currentUser={logic.currentUser}
            isOwner={logic.isOwner}
            onAddMemberClick={() => logic.setShowMemberModal(true)}
            onRemoveMember={logic.handleRemoveMember}
            onLeaveList={logic.handleLeaveList}
          />
        </Col>

  
        <Col md={8}>
          <ShoppingItemsList 
            items={logic.list.items}
            filter={logic.filter}
            setFilter={logic.setFilter}
            newItemName={logic.newItemName}
            setNewItemName={logic.setNewItemName}
            onAddItem={logic.handleAddItem}
            onToggleItem={logic.handleToggleItem}
            onDeleteItem={logic.handleDeleteItem}
          />
        </Col>
      </Row>

      <Modal show={logic.showMemberModal} onHide={() => logic.setShowMemberModal(false)} centered>
        <Modal.Header closeButton><Modal.Title>Pozvat člena</Modal.Title></Modal.Header>
        <Modal.Body>
            <Form.Group>
                <Form.Label>Email uživatele</Form.Label>
                <Form.Control 
                    type="email" placeholder="pepa@email.cz" 
                    value={logic.newMemberEmail} onChange={e => logic.setNewMemberEmail(e.target.value)} autoFocus
                />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => logic.setShowMemberModal(false)}>Zrušit</Button>
            <Button variant="primary" onClick={logic.handleAddMember}>Pozvat</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ListDetail;