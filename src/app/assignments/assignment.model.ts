export class Assignment {
  nom!:string;
  dateDeRendu!:Date;
  rendu!:boolean;
  id?:number;
  _id?:string;
  auteur?: string;
    matiere?: {
        nomMatiere?: string,
        imageMatiere?: string,
        photoProf?: string
    };
    note?: number;
    remarques?: string
}
