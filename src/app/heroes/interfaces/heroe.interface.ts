export interface IHeroe {
    id?:              string;
    superhero:        string;
    publisher:        string;
    alter_ego:        string;
    first_appearance: string;
    characters:       string;
    altImg?:          string;
}

export class HeroeDTO implements IHeroe {
    public id: string;
    public superhero: string;
    public publisher: string;
    public alter_ego: string;
    public first_appearance: string;
    public characters: string;
    public altImg: string;

    constructor(){
        this.id = '';
        this.superhero = '';
        this.publisher =  '';
        this.alter_ego = '';
        this.first_appearance = '';
        this.characters = '';
        this.altImg = '';

    }
}
