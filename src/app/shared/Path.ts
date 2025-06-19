import { environment } from "../../environment/environment";

export class Path {
    static baseUrl = environment.apiUrl

    static GET_TODO_DATA = this.baseUrl + '61c56458-2b07-44e2-9ec9-c7df98ccbe9f';
}