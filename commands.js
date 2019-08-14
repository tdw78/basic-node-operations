const fs = require("fs");

 function done(output) {
     process.stdout.write(output);
     process.stdout.write('\nprompt > ');
 }


 function evaluateCmd(userInput) {

   const userInputArray = userInput.split(" ");
   const command = userInputArray[0];

   switch (command) {
    case "echo":   
      commandLibrary.echo(userInputArray.slice(1).join(" "));
      break;
    case "cat":
      commandLibrary.cat(userInputArray.slice(1));
      break;
    case "head":
      commandLibrary.head(userInputArray.slice(1));
      break;
    case "tail":
      commandLibrary.tail(userInputArray.slice(1));
      break;
    default:
      commandLibrary.errorHandler(command);
  }
 }

 const commandLibrary = {
  "echo": function(userInput) {
    done(userInput);
  },
  "cat": function(fullPath) {
       const fileName = fullPath[0];
       fs.readFile(fileName, (err, data) => {
           if (err) throw err;
           done(data);
       });
   },
   "head": function (fullPath){
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
       if (err) throw err;
       let dataString = data.toString('utf8');
       let splitData = dataString.split('\n').slice(0, 5).join('\n');
       let finalData = Buffer.from(splitData, 'utf8');
       done(finalData);
    })
 },
 "tail": function (fullPath){
  const fileName = fullPath[0];
  fs.readFile(fileName, (err, data) => {
     if (err) throw err;
     let dataString = data.toString('utf8');
     let splitData = dataString.split('\n').slice(-5).join('\n');
     let finalData = Buffer.from(splitData, 'utf8');
     done(finalData);
  })
},
 "errorHandler": function(command) {
    let response = `Sorry but the "${command}" command does not exist`
    done(response)
 }
};

 module.exports.commandLibrary = commandLibrary;
 module.exports.evaluateCmd = evaluateCmd;