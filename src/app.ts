import { yarg as argv, yarg } from "./config/plugins/args.plugin"
import { ServerApp } from "./presentation/server.app";


// console.log(process.argv)

// console.log(yarg.b);
(async() => {
    await main();
})();

async function main(){
    const {b:base, l:limit, s:showTable, n:fileName, d:destination}=yarg;


    ServerApp.run({base, limit,showTable,fileName, destination});
}