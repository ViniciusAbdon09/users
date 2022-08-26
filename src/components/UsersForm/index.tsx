import { useState, forwardRef, useImperativeHandle } from "react";

import FormGroup from "../FormGroup";
import { Form, ButtonContainer } from "./styles";
import Input from "../Input";
import { Button } from "../Button";

import isEmailValid from "../../utils/isEmailValid";
import formatPhone from "../../utils/formatPhone";
import useErrors from "../../hooks/useErrors";
import { UserModel } from "../../services/userServices/models/user-model";

interface UsersFormProps {
  buttonLabel: string;
  onSubmit: (formData: UserModel) => Promise<void>;
}

interface RefType {
  setFieldValues: (user: UserModel) => void;
  resetFields: () => void;
}

const UsersForm = forwardRef<RefType, UsersFormProps>(
  ({ buttonLabel, onSubmit }: UsersFormProps, ref) => {
    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

    useImperativeHandle(
      ref,
      () => ({
        setFieldValues: (user: UserModel) => {
          setId(user.id);
          setName(user.name.firstname ?? "");
          setEmail(user.email ?? "");
          setPhone(formatPhone(user.phone) ?? "");
          setCity(user.address.city ?? "");
        },
        resetFields: () => {
          setId(0);
          setName("");
          setEmail("");
          setPhone("");
          setCity("");
        },
      }),
      []
    );

    const { setError, removeError, getErrorMessageByFieldName, errors } =
      useErrors();

    const isFormValid = name && errors.length === 0;

    function handleNameChange(event: any) {
      setName(event.target.value);

      if (!event.target.value) {
        setError({ field: "name", message: "O nome é obrigatório." });
      } else {
        removeError("name");
      }
    }

    function handleEmailChange(event: any) {
      setEmail(event.target.value);

      if (event.target.value && !isEmailValid(event.target.value)) {
        setError({ field: "email", message: "O e-mail está inválido." });
      } else {
        removeError("email");
      }
    }

    function handlePhoneChange(event: any) {
      setPhone(formatPhone(event.target.value));

      if (!event.target.value) {
        setError({ field: "phone", message: "O telefone é obrigatório." });
      } else {
        removeError("phone");
      }
    }

    function handleCityChange(event: any) {
      setCity(event.target.value);

      if (!event.target.value) {
        setError({ field: "city", message: "A cidade é obrigatória." });
      } else {
        removeError("city");
      }
    }

    async function handleSubmit(event: any) {
      event.preventDefault();

      setIsLoadingSubmit(true);

      const user = new UserModel();

      await onSubmit({
        ...user,
        id,
        name: {
          ...user.name,
          firstname: name,
        },
        email,
        phone,
        address: {
          ...user.address,
          city,
        },
      });

      setIsLoadingSubmit(false);
    }

    return (
      <Form onSubmit={handleSubmit} noValidate>
        <FormGroup error={getErrorMessageByFieldName("name")}>
          <Input
            error={getErrorMessageByFieldName("name")}
            value={name}
            onChange={handleNameChange}
            placeholder="Nome *"
            disabled={isLoadingSubmit}
          />
        </FormGroup>

        <FormGroup error={getErrorMessageByFieldName("email")}>
          <Input
            type="email"
            error={getErrorMessageByFieldName("email")}
            value={email}
            onChange={handleEmailChange}
            placeholder="E-mail *"
            disabled={isLoadingSubmit}
          />
        </FormGroup>

        <FormGroup error={getErrorMessageByFieldName("phone")}>
          <Input
            error={getErrorMessageByFieldName("phone")}
            value={phone}
            onChange={handlePhoneChange}
            placeholder="Telefone *"
            maxLength="15"
            disabled={isLoadingSubmit}
          />
        </FormGroup>

        <FormGroup error={getErrorMessageByFieldName("city")}>
          <Input
            error={getErrorMessageByFieldName("city")}
            value={city}
            onChange={handleCityChange}
            placeholder="Cidade *"
            disabled={isLoadingSubmit}
          />
        </FormGroup>

        <ButtonContainer>
          <Button
            type="submit"
            disabled={!isFormValid}
            isLoading={isLoadingSubmit}
          >
            {buttonLabel}
          </Button>
        </ButtonContainer>
      </Form>
    );
  }
);

export default UsersForm;
