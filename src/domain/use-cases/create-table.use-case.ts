

export interface crateTableUseCase{
    execute:(options:createTableOptions) => string; 
}

export interface createTableOptions{
    base: number;
    limit?: number;
}


export class CreateTable implements crateTableUseCase{
    constructor(
        /*
        ** DI
        */
    ){};


    execute({base,limit=10}:createTableOptions){
        let outputMessage = '';
        for (let i = 1; i <= limit; i++) {
            outputMessage += `${base} x ${i} = ${base * i}`;
            if(i < limit) outputMessage += '\n';
        }
        return outputMessage;
    };
}