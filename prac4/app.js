
const httpServer = require('http');
const fileSystem = require('fs');
const pathHandler = require('path');


const serverInstance = httpServer.createServer((request, response) => {
   
    let requestedFilePath = '.' + request.url;
    
    if (requestedFilePath == './') {
        requestedFilePath = './home.html';
    }


    const fileExtension = String(pathHandler.extname(requestedFilePath)).toLowerCase();
    let mimeType = 'text/html'; 

   
    switch (fileExtension) {
        case '.html':
            mimeType = 'text/html';
            break;
        case '.css':
            mimeType = 'text/css';
            break;
        case '.jpg':
        case '.jpeg':
            mimeType = 'image/jpeg';
            break;
        case '.png':
            mimeType = 'image/png';
            break;
        default:
            mimeType = 'application/octet-stream';
            break;
    }

  
    fileSystem.readFile(requestedFilePath, (error, fileContent) => {
        if (error) {
            
            if (error.code == 'ENOENT') {
                fileSystem.readFile('./not-found.html', (error404, content404) => {
                    response.writeHead(404, { 'Content-Type': 'text/html' });
                    response.end(content404, 'utf-8');
                });
            } else {
                
                response.writeHead(500);
                response.end('Server encountered an error.', 'utf-8');
            }
        } else {
            
            response.writeHead(200, { 'Content-Type': mimeType });
            response.end(fileContent, 'utf-8');
        }
    });
});

serverInstance.listen(4000, () => {
    console.log('Server is live at http://localhost:4000');
});
