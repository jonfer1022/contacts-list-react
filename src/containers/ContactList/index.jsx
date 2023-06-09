import { useEffect, useRef, useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Spinner,
  Form,
  Pagination,
} from "react-bootstrap";
import { useGetContacts } from "../../graphql/useQuerys/contacts";
import {
  AiOutlineAudit,
  AiOutlineDelete,
  AiOutlineForm,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import {
  ModalCreateContact,
  ModalDeleteContact,
  ModalEditContact,
} from "../../components/Modals";
import { useMutation } from "@apollo/client";
import {
  ADD_NEW_CONTACT,
  DELETE_CONTACT,
  EDIT_CONTACT,
} from "../../graphql/mutations/contacts";
import "./styles.css";

const ContactList = () => {
  let itemsPagination = [];
  const isMounted = useRef(false);
  const [paginationActive, setPaginationActive] = useState(1);
  const [limitPagination] = useState(10);
  const [pages, setPages] = useState(1);
  const [maxContacts, setMaxContacts] = useState(1);
  const [searchContact, setSearchContact] = useState("");
  const [listContacts, setListContacts] = useState([]);
  const [contactSelected, setContactSelected] = useState();
  const [openModalAddContact, setOpenModalAddContact] = useState(false);
  const [openModalDeleteContact, setOpenModalDeleteContact] = useState(false);
  const [openModalEditContact, setOpenModalEditContact] = useState(false);
  const [query, setQuery] = useState("");

  const [createContact, { loading: createContactLoading }] =
    useMutation(ADD_NEW_CONTACT);

  const [deleteContact, { loading: deleteContactLoading }] =
    useMutation(DELETE_CONTACT);

  const [editContact, { loading: editContactLoading }] =
    useMutation(EDIT_CONTACT);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setSearchContact(query);
      setPages(1);
      setPaginationActive(1);
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [query]);

  const importContactVcard = async (item) => {
    const response = await fetch(`${process.env.REACT_APP_URL_VCARD}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: item.id }),
    });

    const data = await response.text();
    let blob = new Blob([data], { type: "text/vcard" });
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = `${item?.firstName || ""}_${item.lastName || ""}.vcf`;
    a.click();
  };

  const {
    data: dataContacts,
    loading: loadingContacts,
    refetch: refetchContacts,
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
    if (dataContacts?.getContacts) {
      const { getContacts } = dataContacts;
      setListContacts(getContacts?.contacts);
      setMaxContacts(getContacts?.totalContacts);
    }
  }, [dataContacts]);

  useEffect(() => {
    if (isMounted.current) {
      if (!createContactLoading) {
        refetchContacts({
          search: searchContact,
          limit: limitPagination,
          pages: pages
        });
      }
    }
    // eslint-disable-next-line
  }, [
    createContactLoading,
    deleteContactLoading,
    editContactLoading,
    searchContact,
  ]);

  const createNewContact = (contact) => {
    createContact({ variables: { ...contact } });
    setOpenModalAddContact(false);
  };

  const updateContact = (contact) => {
    editContact({ variables: { ...contact } });
    setOpenModalEditContact(false);
  };

  const removeContact = () => {
    deleteContact({ variables: { removeContactId: contactSelected?.id } });
    setOpenModalDeleteContact(false);
  };

  for (let i = 1; i <= Math.trunc(maxContacts / limitPagination) + 1; i++) {
    itemsPagination.push(
      <Pagination.Item
        key={`item-pagination-${i}`}
        active={i === paginationActive}
        onClick={() => {
          setPaginationActive(i);
          setPages(i);
          refetchContacts({
            search: searchContact,
            limit: limitPagination,
            pages: i
          })
        }}
      >
        {i}
      </Pagination.Item>
    );
  }

  return (
    <Container fluid>
      <Row className="mb-3 mt-3">
        <Col>
          <AiOutlinePlusCircle
            size="2em"
            className="addContact"
            onClick={() => setOpenModalAddContact(true)}
          />
          <span className="ms-2">Add new contact</span>
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
                <th style={{ width: "5%" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {createContactLoading ||
              loadingContacts ||
              deleteContactLoading ||
              editContactLoading ? (
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
                    <td style={{ width: "7%" }}>
                      <AiOutlineForm
                        style={{ cursor: "pointer" }}
                        size="2em"
                        onClick={() => {
                          setOpenModalEditContact(true);
                          setContactSelected(item);
                        }}
                      />
                      <AiOutlineDelete
                        style={{ cursor: "pointer" }}
                        size="2em"
                        onClick={() => {
                          setOpenModalDeleteContact(true);
                          setContactSelected(item);
                        }}
                      />
                      <AiOutlineAudit
                        style={{ cursor: "pointer" }}
                        size="2em"
                        onClick={() => importContactVcard(item)}
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
          <Pagination>{itemsPagination}</Pagination>
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
