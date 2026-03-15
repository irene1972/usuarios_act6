import { IUser } from "./i-user";

export interface IUserResponse {
    total: number;
    page: number;
    per_page: number;
    total_pages:number;
    results: IUser[];
}
