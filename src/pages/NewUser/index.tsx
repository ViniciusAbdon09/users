import UsersForm from "../../components/UsersForm";
import PageHeader from "../../components/PageHeader";
import { UserModel } from "../../services/userServices/models/user-model";
import UsersService from "../../services/userServices/UsersService";
import { ToastContainer, toast } from "react-toast";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/sliceUsers";

interface RefType {
  setFieldValues: (user: UserModel) => void;
  resetFields: () => void;
}

export default function NewUser() {
  const dispatch = useDispatch();

  const usersFormRef = useRef<RefType>(null);

  async function handleSubmit(formData: UserModel) {
    try {
      const responseApi = await UsersService.createUsers(formData);
      console.log(responseApi);

      dispatch(addUser(formData));

      toast.success(`Usuário: ${formData.name.firstname}, adicionado com sucesso!`);
      usersFormRef.current?.resetFields();
    } catch (e: any) {
      toast.error(`Ocorreu um erro ao processar a requisição. Detalhe: ${e.message}`);
    }
  }

  return (
    <>
      <ToastContainer position="bottom-center" delay={2000}/>
      <PageHeader title="Novo Usuário" />

      <UsersForm ref={usersFormRef} buttonLabel="Cadastrar" onSubmit={handleSubmit} />
    </>
  );
}
