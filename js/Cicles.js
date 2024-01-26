export class Cicle{
    constructor(nom, categoria, numAlumnes, abreviatura){
        this.nom = nom;
        this.categoria = categoria;
        this.numAlumnes = numAlumnes;
        this.abreviatura = abreviatura;
        this.numEdicions = 0;
        this.dataEdit= 0;
        this.moduls = [];
    }

    setNumEdicions(){
        this.numEdicions++;
        let date = new Date();
        this.dataEdit = date;
    }

    añadirModul(modul){
        this.moduls.push(modul);
    }

    get ToString(){
        modulString=""
        if (this.moduls.length > 0){
        this.moduls.forEach(modul => {
            modulsString+= modul + " ";                        
        });
        }else{
            modulString = "No tiene ningun modulo";
        }
        return `Datos del ciclo: ${this.nom}, ${this.categoria}, ${this.numAlumnes}, ${this.abreviatura},
                                 ${this.numEdicions}, ${this.dataEdit}, Moduls: ${modulsString}` 
    }


}