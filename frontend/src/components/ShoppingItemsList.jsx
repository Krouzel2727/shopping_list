import { Card, Form, InputGroup, Button, ButtonGroup } from 'react-bootstrap';
import { FaCheck, FaUndo, FaTrash } from 'react-icons/fa';

const ShoppingItemsList = ({ 
  items, 
  filter, 
  setFilter, 
  newItemName, 
  setNewItemName, 
  onAddItem, 
  onToggleItem, 
  onDeleteItem 
}) => {
  
  // Logika filtrování 
  const filteredItems = items.filter(item => {
    if (filter === 'unresolved') return !item.resolved;
    return true;
  });

  return (
    <Card className="shadow-sm border-0">
      <Card.Body>
        {/* Formulář pro přidání */}
        <Form onSubmit={onAddItem} className="mb-4">
          <InputGroup size="lg">
            <Form.Control 
              placeholder="Přidat novou položku..." 
              value={newItemName}
              onChange={e => setNewItemName(e.target.value)}
            />
            <Button variant="dark" type="submit" disabled={!newItemName.trim()}>
              <FaCheck /> Přidat
            </Button>
          </InputGroup>
        </Form>

        {/* Přepínače filtrů */}
        <div className="d-flex justify-content-end mb-3">
          <ButtonGroup size="sm">
            <Button 
              variant={filter === 'unresolved' ? 'primary' : 'outline-secondary'} 
              onClick={() => setFilter('unresolved')}
            >
              Nevyřešené
            </Button>
            <Button 
              variant={filter === 'all' ? 'primary' : 'outline-secondary'} 
              onClick={() => setFilter('all')}
            >
              Všechny
            </Button>
          </ButtonGroup>
        </div>

        {/* Seznam */}
        <div className="list-group">
          {filteredItems.length === 0 && (
            <div className="text-center text-muted py-4">Žádné položky k zobrazení</div>
          )}

          {filteredItems.map(item => (
            <div key={item._id} className={`list-group-item d-flex align-items-center justify-content-between py-3 ${item.resolved ? 'bg-light' : ''}`}>
              <div className="d-flex align-items-center gap-3">
                <Form.Check 
                  type="checkbox" 
                  checked={item.resolved}
                  onChange={() => onToggleItem(item._id, item.resolved)}
                  style={{ transform: 'scale(1.3)' }}
                />
                <span style={{ 
                  textDecoration: item.resolved ? 'line-through' : 'none',
                  color: item.resolved ? '#adb5bd' : 'inherit',
                  fontSize: '1.1rem'
                }}>
                  {item.name}
                </span>
              </div>
              
              <div className="d-flex gap-2">
                {item.resolved && (
                  <Button variant="link" size="sm" className="text-warning p-0" onClick={() => onToggleItem(item._id, item.resolved)}>
                    <FaUndo title="Obnovit" />
                  </Button>
                )}
                <Button variant="link" size="sm" className="text-danger p-0 ms-2" onClick={() => onDeleteItem(item._id)}>
                  <FaTrash title="Smazat" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ShoppingItemsList;