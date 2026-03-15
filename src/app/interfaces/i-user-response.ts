import { IUser } from "./i-user";

export interface IUserResponse {
    total: number;
    page: number;
    per_page: number;
    results: IUser[];
}
