import { UserModel } from "../services/userServices/models/user-model";
import formatPhone from "./formatPhone";

export const userDefault: UserModel = {
  id: 1,
  name: {
    firstname: 'Vinícius',
    lastname: ''
  },
  address: {
    city: 'Biritiba',
    street: '',
    zipcode: '',
    number: 0,
    geolocation: {
      lat: '',
      long: ''
    }
  },
  email: 'vinicius@teste.com',
  password: '',
  username: '',
  phone: formatPhone('11999999999')
};
