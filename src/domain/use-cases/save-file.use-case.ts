import fs from 'fs';


export interface saveFileUseCase{
    execute:(options:Options) => boolean;
}

export interface Options{
    fileContent : string;
    fileDestination? : string;
    fileName?: string;
}

export class SaveFile implements saveFileUseCase{
    constructor(
        /** repository: storageRepository */
    ){}
    execute({
        fileContent,
        fileDestination = 'outputs',
        fileName ='table'
    }: Options) :boolean {

        try{
            fs.mkdirSync(fileDestination, {recursive:true});
            fs.writeFileSync(`${fileDestination}/${fileName}.txt`, fileContent);
            return true;

        }
        catch(error){
            console.log(error);
            return false;
        }
    };


}


