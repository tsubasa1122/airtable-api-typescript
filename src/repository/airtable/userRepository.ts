import { HttpClient } from "../../infrastructure/api/httpClient";
import User from "../../model/airtable/user";

type UsersResponse = {
  records: UserResponse[];
};

type UserResponse = {
  id: string;
  createdTime: string;
  fields: {
    name: string;
    age: number;
  };
};
export class UserRepository {
  constructor(private readonly httpClient: HttpClient) {}

  insert = async (data: any) => {
    // pathを切り出したい
    await this.httpClient.post(`/Table%201`, data);
  };

  getAll = async (): Promise<User[] | []> => {
    const maxRecords = 25;
    const data = await this.httpClient.get<UsersResponse>(
      `/Table%201?maxRecords=${maxRecords}&view=Grid%20view`
    );

    return data.records.map((record) =>
      User.build(record.fields.name, record.fields.age, record.id)
    );
  };
}
