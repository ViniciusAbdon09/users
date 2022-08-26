import UsersForm from "../../components/UsersForm";
import PageHeader from "../../components/PageHeader";
import { UserModel } from "../../services/userServices/models/user-model";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toast";
import UsersService from "../../services/userServices/UsersService";
import Loader from "../../components/Loader";
import { useSelector } from "react-redux";
import { updateUser, useUsers } from "../../redux/sliceUsers";
import { useDispatch } from "react-redux";

interface ParamsProps {
  id: string;
}

interface RefType {
  setFieldValues: (user: UserModel) => void;
  resetFields: () => void;
}

export default function EditUser() {
  const { id } = useParams<ParamsProps>();
  const usersRedux = useSelector(useUsers).find(
    (user) => Number(user.id) === Number(id)
  );
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userName, setUserName] = useState("");
  const usersFormRef = useRef<RefType>(null);
  const history = useHistory();

  useEffect(() => {
    async function loadUser() {
      try {
        const userData = await UsersService.getUserById(id);
        console.log(userData);

        if (usersRedux) {
          usersFormRef.current?.setFieldValues(usersRedux);
          setUserName(usersRedux.name.firstname);
        }

        setIsLoading(false);
      } catch (e: any) {
        toast.error(
          `Ocorreu um erro ao processar a requisição. Detalhe: ${e.message}`
        );
        return history.push("/");
      }
    }

    loadUser();
  }, [id, history, usersRedux]);

  async function handleSubmit(formData: UserModel) {
    try {
      const response = await UsersService.updateUsers(id, formData);
      console.log(response);
      setUserName(formData.name.firstname);
      dispatch(updateUser(formData));

      toast.success(
        `Usuário: ${formData.name.firstname}, alterado com sucesso!`
      );
    } catch (e: any) {
      toast.error(
        `Ocorreu um erro ao processar a requisição. Detalhe: Não foi possível atualizar o usuário ${e.message}`
      );
      return history.push("/");
    }
  }

  return (
    <>
      <Loader isLoading={isLoading} />
      <ToastContainer position="bottom-center" delay={2000} />
      <PageHeader title={isLoading ? "Carregando..." : `Editar ${userName}`} />
      <UsersForm
        ref={usersFormRef}
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
      />
    </>
  );
}
