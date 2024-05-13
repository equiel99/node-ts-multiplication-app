import {SaveFile} from '../../../src/domain/use-cases/save-file.use-case'
import fs, { rmSync } from 'fs';
import { rimraf } from 'rimraf';


describe('save-file.use-case', () => {
    const customOptions = {
        fileContent : 'custom content',
        fileDestination : 'custom-outputs/file-destination',
        fileName: 'custom-table-name'
    };

    const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;

    afterEach(() =>{
        const outputFolderExist = fs.existsSync('outputs');
        if(outputFolderExist) rimraf('outputs');
        const customFolderExist = fs.existsSync(customOptions.fileDestination);
        if(customFolderExist) rimraf(customOptions.fileDestination);
    })


    test('should save files with default values', () => {
        const filePath ='outputs/table.txt';
        const saveFile = new SaveFile();
        const options = {fileContent : 'test content'};
        const result = saveFile.execute(options);

        
        const fileExist = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath,{encoding :'utf-8'})
        
        expect(result).toBeTruthy();
        expect(fileExist).toBeTruthy();
        expect(fileContent).toBe(options.fileContent);

    });

    test('should save files with custom values', () => {

        const saveFile = new SaveFile();
        
        const result = saveFile.execute(customOptions);
        const fileExist = fs.existsSync(customFilePath);
        const fileContent = fs.readFileSync(customFilePath,{encoding :'utf-8'})
        
        expect(result).toBeTruthy();
        expect(fileExist).toBeTruthy();
        expect(fileContent).toBe(customOptions.fileContent);


    });

    test('should return false if directory could not be created', () => {

        const saveFile = new SaveFile();
        const mkdirMock = jest.spyOn(fs,'mkdirSync').mockImplementation(
            () => { throw new Error ('This is a custom error message from testing');}
        );

        const result = saveFile.execute(customOptions);
        
        expect(result).toBe(false);

        mkdirMock.mockRestore();
    });


    test('should return false if file could not be created', () => {

        const saveFile = new SaveFile();
        const writeFileMock = jest.spyOn(fs,'writeFileSync').mockImplementation(
            () => { throw new Error ('This is a custom writing error message');}
        );

        const result = saveFile.execute({fileContent:'Hola'});
        
        expect(result).toBe(false);

        writeFileMock.mockRestore();


    });

});