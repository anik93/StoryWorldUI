export class Role {

  id: number;
  name: String;

  constructor(id?: number, name?: String) {
    this.id = id;
    this.name = name;
  }

  public getId() {
    return this.id;
  }

}
