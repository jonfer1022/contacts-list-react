import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

const ModalCreateContact = (props) => {
  const { show = false, onClose, onConfirm } = props;
  const [newContact, setNewContact] = useState();

  const changeAttribute = (value, attribute) => {
    setNewContact((prev) => {
      const newObjt = { ...prev, [attribute]: value };
      return { ...newObjt };
    });
  };

  return (
    <Modal show={show} className="modal-create-contact" centered>
      <Modal.Body>
        <h2 className="heading-h2">Create Contact</h2>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>First name</Form.Label>
            <Form.Control
              value={newContact?.firstName || ""}
              type="text"
              placeholder={`First Name`}
              onChange={(e) => changeAttribute(e.target.value, "firstName")}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              value={newContact?.lastName || ""}
              type="text"
              placeholder={`Last Name`}
              onChange={(e) => changeAttribute(e.target.value, "lastName")}
            />
          </Form.Group>
          <Row>
            <Form.Group className="mb-3" as={Col} lg="4">
              <Form.Label>Country Code</Form.Label>
              <Form.Control
                value={
                  newContact?.countryCode ? `${newContact.countryCode}` : "+"
                }
                type="text"
                placeholder={`Country Code`}
                onChange={(e) => changeAttribute(e.target.value, "countryCode")}
              />
            </Form.Group>
            <Form.Group className="mb-3" as={Col} lg="8">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                value={newContact?.phone || ""}
                type="text"
                placeholder={`Phone`}
                onChange={(e) => changeAttribute(e.target.value, "phone")}
              />
            </Form.Group>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={newContact?.email || ""}
              type="email"
              placeholder={`Email`}
              onChange={(e) => changeAttribute(e.target.value, "email")}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={newContact?.address || ""}
              type="text"
              placeholder={`Address`}
              onChange={(e) => changeAttribute(e.target.value, "address")}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="btn-danger-without-bg"
          onClick={() => {
            onClose();
            setNewContact();
          }}
        >
          Cancel
        </Button>
        <Button
          className="btn-success"
          onClick={() => {
            onConfirm(newContact);
            setNewContact();
          }}
        >
          Create new contact
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const ModalDeleteContact = (props) => {
  const { show = false, onClose, onConfirm, contact } = props;
  return (
    <Modal show={show} className="modal-create-contact" centered>
      <Modal.Body>
        <h2 className="heading-h2 text-center">Delete Contact</h2>
        <p className="mb-0 text-center">
          ¿Are you sure you want to delete this item?
        </p>
        <p className="mb-0 text-center">{`${contact?.firstName || ""} ${
          contact?.lastName || ""
        }`}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="btn-danger-without-bg"
          onClick={() => {
            onClose();
          }}
        >
          Cancel
        </Button>
        <Button
          className="btn-success"
          onClick={() => {
            onConfirm();
          }}
        >
          Delete contact
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const ModalEditContact = (props) => {
  const { show = false, onClose, onConfirm, contact } = props;
  const [editContact, setEditContact] = useState();

  useEffect(() => setEditContact(contact), [contact]);

  const changeAttribute = (value, attribute) => {
    setEditContact((prev) => {
      const newObjt = { ...prev, [attribute]: value };
      return { ...newObjt };
    });
  };

  return (
    <Modal show={show} className="modal-create-contact" centered>
      <Modal.Body>
        <h2 className="heading-h2">Edit Contact</h2>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>First name</Form.Label>
            <Form.Control
              value={editContact?.firstName || ""}
              type="text"
              placeholder={`First Name`}
              onChange={(e) => changeAttribute(e.target.value, "firstName")}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              value={editContact?.lastName || ""}
              type="text"
              placeholder={`Last Name`}
              onChange={(e) => changeAttribute(e.target.value, "lastName")}
            />
          </Form.Group>
          <Row>
            <Form.Group className="mb-3" as={Col} lg="4">
              <Form.Label>Country Code</Form.Label>
              <Form.Control
                value={
                  editContact?.countryCode ? `${editContact.countryCode}` : "+"
                }
                type="text"
                placeholder={`Country Code`}
                onChange={(e) => changeAttribute(e.target.value, "countryCode")}
              />
            </Form.Group>
            <Form.Group className="mb-3" as={Col} lg="8">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                value={editContact?.phone || ""}
                type="text"
                placeholder={`Phone`}
                onChange={(e) => changeAttribute(e.target.value, "phone")}
              />
            </Form.Group>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={editContact?.email || ""}
              type="email"
              placeholder={`Email`}
              onChange={(e) => changeAttribute(e.target.value, "email")}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={editContact?.address || ""}
              type="text"
              placeholder={`Address`}
              onChange={(e) => changeAttribute(e.target.value, "address")}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="btn-danger-without-bg"
          onClick={() => {
            onClose();
            setEditContact();
          }}
        >
          Cancel
        </Button>
        <Button
          className="btn-success"
          onClick={() => {
            onConfirm({...editContact, id: contact?.id });
            setEditContact();
          }}
        >
          Update contact
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { ModalCreateContact, ModalDeleteContact, ModalEditContact };
