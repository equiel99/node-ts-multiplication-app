import { ServerApp } from "../src/presentation/server.app";



describe('Test App.ts', () => {
    test('should call Server.run with the values', async () => {

        const serverMockRun = jest.fn();

        ServerApp.run = serverMockRun;
        process.argv = ['node','app.ts','-b','10','-l','5','-s','-n','test-file','-d','test-destination'];

        await import('../src/app');

        expect(serverMockRun).toHaveBeenCalledWith({
            base:10,
            limit:5,
            showTable:true,
            fileName:'test-file',
            destination:'test-destination'

        });



    });

});