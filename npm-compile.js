//Script to emulate this command (for cross-platform usage by npm):
//rm -rf lib && coffee --output lib --map --compile src

var fs = require('fs');
var exec = require('child_process').exec;

deleteFolderRecursive('./lib');
exec('node_modules/coffee-script/bin/coffee --output lib --map --compile src');


function deleteFolderRecursive(path) {
    var files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};
