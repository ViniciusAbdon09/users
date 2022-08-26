import { useEffect, useState, useCallback, useMemo } from "react";
import {
  FaArrowUp,
  FaArrowDown,
  FaRegTrashAlt,
  FaUserEdit,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import UsersService from "../../services/userServices/UsersService";
import { UserModel } from "../../services/userServices/models/user-model";
import { ToastContainer, toast } from "react-toast";

import {
  Container,
  InputSearchContainer,
  Header,
  ListContainer,
  ListBody,
  Card,
} from "./styles";
import formatPhone from "../../utils/formatPhone";
import Modal from "../../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useUsers, removeUser } from "../../redux/sliceUsers";

export default function Home() {
  const usersRedux = useSelector(useUsers);
  const dispatch = useDispatch();
  const [users, setUsers] = useState<UserModel[]>([]);
  const [orderBy, setOrderBy] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [userDelete, setUserDelete] = useState<UserModel>(new UserModel());
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [isShowDeleteModal, setShowDeleteModal] = useState(false);

  const filterdUsers = useMemo(
    () =>
      users.filter((user) =>
        user.name.firstname.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm, users]
  );

  useEffect(() => {
    setIsLoading(true);

    const loadContats = async () => {
      try {
        const usersListAPI = await UsersService.getUsers(orderBy);
        // como não vou utilizar os dados da API na aplicação deixarei um console.log mas farei a chamda para simular conforme solicitado no teste.
        console.log(usersListAPI);

        setUsers(usersRedux);
      } catch (err: any) {
        toast.error(
          `Ocorreu um erro ao processar a requisição. Detalhe: ${err.message}`
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadContats();
  }, [orderBy, usersRedux]);

  const handleToggleOrderBy = useCallback(() => {
    setOrderBy((prevState) => (prevState === "asc" ? "desc" : "asc"));
  }, []);

  const handleChangeSearchTerm = useCallback((event: any) => {
    setSearchTerm(event.target.value);
  }, []);

  const handleDeleteUser = useCallback((user: UserModel) => {
    setUserDelete(user);
    setShowDeleteModal(true);
  },[]);

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  }

  const handleDeleteConfirmUser = async (user: UserModel) => {
    try {
      setIsLoadingModal(true);
      await UsersService.deleteUser(String(user.id));
      handleCloseDeleteModal();
      dispatch(removeUser(user.id))

      setUserDelete(new UserModel());
      toast.success(
        `Usuário ${user.name.firstname} foi deletado.`
      );
    } catch (err: any) {
      toast.error(
        `Ocorreu um erro ao processar a requisição. Detalhe: ${err.message}`
      );
    } finally {
      setIsLoadingModal(false);
      setShowDeleteModal(false);
    }
  }

  return (
    <Container>
      <ToastContainer position="bottom-center" delay={2000} />
      <Loader isLoading={isLoading} />
      <Modal
        show={isShowDeleteModal}
        title={`Tem certeza que deseja excluir o usuário: ${userDelete?.name?.firstname ?? 'não identificado'}`}
        confirmLabel="Deletar"
        danger
        onCancel={handleCloseDeleteModal}
        onConfirm={() => handleDeleteConfirmUser(userDelete)}
        isLoading={isLoadingModal}
      >
        <p>A operação não poderá ser desfeita!</p>
      </Modal>

      <InputSearchContainer>
        <input
          value={searchTerm}
          type="text"
          placeholder="Pesquisar usuário"
          onChange={handleChangeSearchTerm}
        />
      </InputSearchContainer>
      <Header>
        <strong>
          {filterdUsers.length}{" "}
          {filterdUsers.length === 1 ? "usuário" : "usuários"}
        </strong>
        <Link to="/new">Novo Usuário</Link>
      </Header>
      <ListContainer>
        {filterdUsers.length > 0 && (
          <header>
            <button type="button" onClick={handleToggleOrderBy}>
              <span>Nome</span>
              {orderBy === "asc" ? (
                <FaArrowDown id="arrow" />
              ) : (
                <FaArrowUp id="arrow" />
              )}
            </button>
          </header>
        )}

        <ListBody>
          {filterdUsers.length > 0 &&
            filterdUsers.map((user) => {
              return (
                <Card key={user.id}>
                  <div className="info">
                    <div className="user-name">
                      <strong>{user.name.firstname}</strong>
                      <small>{user.address.city}</small>
                    </div>
                    <span>{user.email ?? "Sem e-mail"}</span>
                    <span>{formatPhone(user.phone) ?? "Sem Celular"}</span>
                  </div>
                  <div className="action">
                    <Link to={`/edit/${user.id}`}>
                      <FaUserEdit />
                    </Link>
                    <button type="button" onClick={() => handleDeleteUser(user)}>
                      <FaRegTrashAlt />
                    </button>
                  </div>
                </Card>
              );
            })}
        </ListBody>
      </ListContainer>
    </Container>
  );
}
