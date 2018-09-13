import { Role } from './role.class';

export class User{

	id: number;
	name: String;
	password: String;
	mail: String;
	token: string;
	roles: Array<Role>;
  block: any;

	constructor(id?: number, name?: String, mail?: String, token?: string, roles?: Array<Role>){
		this.id = id;
		this.name = name;
		this.mail = mail;
		this.token = token;
		this.roles = roles;
	}

	public getToken(): string{
		return this.token;
	}

	public getRoles(): Array<Role>{
		return this.roles;
	}

	public getId(): number{
		return this.id;
	}

}
