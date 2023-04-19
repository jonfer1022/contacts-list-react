import { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Table, Spinner, Form } from "react-bootstrap";
import { useGetContacts } from "../../graphql/useQuerys/contacts";
import { AiOutlineDelete, AiOutlineForm, AiOutlinePlusCircle } from "react-icons/ai";
import { ModalCreateContact, ModalDeleteContact, ModalEditContact } from "../../components/Modals";
import { useMutation } from "@apollo/client";
import { ADD_NEW_CONTACT, DELETE_CONTACT, EDIT_CONTACT } from "../../graphql/mutations/contacts";
import "./styles.css";

const ContactList = () => {
  const isMounted = useRef(false);
  const [searchContact, setSearchContact] = useState("");
  const [listContacts, setListContacts] = useState([]);
  const [contactSelected, setContactSelected] = useState();
  const [openModalAddContact, setOpenModalAddContact] = useState(false);
  const [openModalDeleteContact, setOpenModalDeleteContact] = useState(false);
  const [openModalEditContact, setOpenModalEditContact] = useState(false);
  const [query, setQuery] = useState('');

  const [createContact, { loading: createContactLoading }] =
    useMutation(ADD_NEW_CONTACT);

  const [deleteContact, { loading: deleteContactLoading }] =
    useMutation(DELETE_CONTACT);

  const [editContact, { loading: editContactLoading }] =
    useMutation(EDIT_CONTACT);

  useEffect(() => {
    const timeOutId = setTimeout(() => setSearchContact(query), 500);
    return () => clearTimeout(timeOutId);
  }, [query]);

  const {
    data: dataContacts,
    loading: loadingContacts,
    refetch: refetchContacts
  } = useGetContacts(searchContact);

  useEffect(() => {
    if (!loadingContacts) {
      if (!isMounted.current) {
        isMounted.current = true;
      }
    }
    // eslint-disable-next-line
  }, [loadingContacts, isMounted.current]);

  useEffect(() => {
    if (dataContacts?.getContacts?.length) {
      const { getContacts } = dataContacts;
      setListContacts(getContacts);
    }
  }, [dataContacts]);

  useEffect(() => {
    if (isMounted.current) {
      if (!createContactLoading) {
        refetchContacts({
          search: searchContact
        });
      }
    }
    // eslint-disable-next-line
  }, [createContactLoading, deleteContactLoading, editContactLoading, searchContact]);

  const createNewContact = (contact) => {
    createContact({ variables: { ...contact }})
    setOpenModalAddContact(false);
  };

  const updateContact = (contact) => {
    editContact({ variables: { ...contact }})
    setOpenModalEditContact(false);
  };

  const removeContact = () => {
    deleteContact({ variables: { removeContactId: contactSelected?.id }})
    setOpenModalDeleteContact(false);
  };

  return (
    <Container fluid>
      <Row className="mb-3 mt-3">
        <Col>
          <AiOutlinePlusCircle
            size="2em"
            className="addContact"
            onClick={() => setOpenModalAddContact(true)}
          />
        </Col>
        <Col>
          <Form.Control
            value={query || ""}
            type="text"
            placeholder={`Search`}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Address</th>
                <th style={{ width: "5%"}}>Action</th>
              </tr>
            </thead>
            <tbody>
              {createContactLoading || loadingContacts || deleteContactLoading || editContactLoading ? (
                <tr>
                  <td colSpan={6}>
                    <Spinner animation="border" />
                  </td>
                </tr>
              ) : listContacts?.length ? (
                listContacts.map((item) => (
                  <tr key={`contact-${item?.id}`}>
                    <td>{item?.firstName || ""}</td>
                    <td>{item?.lastName || ""}</td>
                    <td>
                      {item?.phone ? `${item?.countryCode} ${item?.phone}` : ""}
                    </td>
                    <td>{item?.email || ""}</td>
                    <td>{item?.address || ""}</td>
                    <td style={{ width: "5%"}}>
                      <AiOutlineForm 
                        size="2em"
                        onClick={() => {
                          setOpenModalEditContact(true);
                          setContactSelected(item);
                        }}
                      />
                      <AiOutlineDelete 
                        size="2em"
                        onClick={() => {
                          setOpenModalDeleteContact(true);
                          setContactSelected(item);
                        }}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>
                    <div>No List</div>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
      <ModalCreateContact
        show={openModalAddContact}
        onClose={() => setOpenModalAddContact(false)}
        onConfirm={(item) => createNewContact(item)}
      />
      <ModalEditContact
        show={openModalEditContact}
        contact={contactSelected}
        onClose={() => setOpenModalEditContact(false)}
        onConfirm={(item) => updateContact(item)}
      />
      <ModalDeleteContact
        show={openModalDeleteContact}
        contact={contactSelected}
        onClose={() => setOpenModalDeleteContact(false)}
        onConfirm={(item) => removeContact(item)}
      />
    </Container>
  );
};

export default ContactList;
