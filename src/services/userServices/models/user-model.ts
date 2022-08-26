
class UserName {
  constructor(
    public firstname: string = '',
    public lastname: string = '',
  ) { }
}

class Geolocation {
  constructor(
    public lat: string = '',
    public long: string = '',
  ) { }
}

export class Address {
  constructor(
    public city: string = '',
    public street: string = '',
    public number: number = 0,
    public zipcode: string = '',
    public geolocation: Geolocation = new Geolocation()
  ) { }
}

export class UserModel {
  constructor(
    public id: number = 0,
    public email: string = '',
    public username: string = '',
    public password: string = '',
    public name: UserName = new UserName(),
    public address: Address = new Address(),
    public phone: string = ''
  ) { }
}
