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

type UsersRequestData = {
  records: UserRequestData[];
};

type UserRequestData = {
  fields: {
    name: string;
    age: number;
  };
};
export class UserRepository {
  constructor(private readonly httpClient: HttpClient) {}

  insert = async (users: User[]): Promise<void> => {
    const convertedUsers = this.convertUsersToAirtableRequestFormatData(users);
    // pathを切り出したい
    await this.httpClient.post<UsersRequestData>(`/Table%201`, convertedUsers);
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

  private convertUsersToAirtableRequestFormatData = (
    users: User[]
  ): UsersRequestData => {
    const formattedUsers = users.map((user) => {
      return {
        fields: {
          name: user.name,
          age: user.age,
        },
      };
    });
    return { records: formattedUsers };
  };
}
