import { Container, Row, Col, Button, Spinner, Alert, Modal, Form } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';

// Import Hooku 
import { useDashboardLogic } from '../hooks/useDashboardLogic';
import ShoppingListCard from '../components/ShoppingListCard';

const Dashboard = () => {

  const logic = useDashboardLogic();

  if (logic.loading) return <div className="text-center mt-5"><Spinner animation="border" variant="primary" /></div>;
  if (logic.error) return <Container className="mt-5"><Alert variant="danger">Chyba: {logic.error}</Alert></Container>;

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Moje seznamy</h2>
        <Button variant="primary" onClick={() => logic.setShowCreateModal(true)}>
          <FaPlus className="me-2" /> Vytvořit nový seznam
        </Button>
      </div>

      <Row xs={1} md={2} lg={3} className="g-4">
        {logic.lists.map((list) => (
          <Col key={list._id}>
            <ShoppingListCard 
              list={list} 
              onDeleteClick={logic.openDeleteModal} 
            />
          </Col>
        ))}
      </Row>


      <Modal show={logic.showCreateModal} onHide={() => logic.setShowCreateModal(false)}>
        <Modal.Header closeButton><Modal.Title>Nový nákupní seznam</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Název seznamu</Form.Label>
              <Form.Control 
                type="text" placeholder="Např. Vánoční nákup" autoFocus
                value={logic.newListName}
                onChange={(e) => logic.setNewListName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => logic.setShowCreateModal(false)}>Zrušit</Button>
          <Button variant="primary" onClick={logic.handleCreate} disabled={!logic.newListName.trim()}>Vytvořit</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={logic.showDeleteModal} onHide={() => logic.setShowDeleteModal(false)}>
        <Modal.Header closeButton><Modal.Title>Smazat seznam?</Modal.Title></Modal.Header>
        <Modal.Body>Opravdu si přejete smazat tento nákupní seznam? Tato akce je nevratná.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => logic.setShowDeleteModal(false)}>Zrušit</Button>
          <Button variant="danger" onClick={logic.handleDeleteConfirm}>Smazat</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Dashboard;