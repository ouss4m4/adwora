import { ObjectId } from 'mongodb'

export default class Client {
  constructor(
    public name: string,
    public email: string,
    public phone: string,
    public _id?: ObjectId
  ) {}
}
