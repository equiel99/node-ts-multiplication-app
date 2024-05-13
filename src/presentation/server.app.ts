import { yarg } from "../config/plugins/args.plugin"
import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

interface runOptions{
    base: number;
    limit: number;
    showTable: boolean;
    fileName:string;
    destination:string;
}


export class ServerApp{
    
    static run({base,limit,showTable,fileName,destination}:runOptions){
        console.log('Server run...')
        const tabla = new CreateTable().execute({base,limit});
        const wasCreated = new SaveFile()
            .execute({
                fileContent:tabla,
                fileDestination:destination,
                fileName:fileName,
            
            });
        if(showTable) console.log(tabla);
        (wasCreated)
            ? console.log('File Created!')
            : console.log('File Not created!!');
    }
}