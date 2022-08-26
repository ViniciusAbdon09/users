import HttpClient from "../utils/HttpClient";
import { UserModel } from "./models/user-model";

class UsersService {
  constructor(
    public httpClient: HttpClient = new HttpClient('https://fakestoreapi.com')
  ) { }

  getUsers(orderBy: string = 'asc') {
    return this.httpClient.makeRequest(`/users?sort=${orderBy}`, {
      method: 'GET'
    });
  }

  getUserById(id: string){
    return this.httpClient.makeRequest(`/users/${id}`, {
      method: 'GET'
    });
  }

  createUsers(user: UserModel) {
    return this.httpClient.makeRequest(`/users`, {
      method: 'POST',
      body: user,
    });
  }

  updateUsers(id: string, user: UserModel) {
    return this.httpClient.makeRequest(`/users/${id}`, {
      method: 'PUT',
      body: user,
    });
  }

  deleteUser(id: string){
    return this.httpClient.makeRequest(`/users/${id}`, {
      method: 'DELETE'
    });
  }
}

export default new UsersService();
