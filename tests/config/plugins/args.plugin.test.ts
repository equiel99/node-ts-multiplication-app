
const runCommand = async (args:string[]) => {
    process.argv=[...process.argv, ...args];
    const {yarg} = await import('../../../src/config/plugins/args.plugin');
    return yarg;
}

describe ('args.plugin',()=>{
    const originalArgv = process.argv;
    
    beforeEach(()=>{
        process.argv=originalArgv;
        jest.resetModules();

    });

    test('shoud be return default values',async()=>{
        const argv = await runCommand(['-b','5']);

        expect(argv).toEqual(expect.objectContaining({
           b:5,
           l:10,
           s:false,
           n:'Multiplication-table',
           d:'outputs' 
        }));
    });

    test('should return configuration with custom values', async() => {
        const argv = await runCommand(
            ['-b','7','-l','20','-s','true','-n','custom-name','-d','custom-dir']
        );
        expect(argv).toEqual(expect.objectContaining({
           b:7,
           l:20,
           s:true,
           n:'custom-name',
           d:'custom-dir' 
        }));

    });











});
