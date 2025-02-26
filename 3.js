
const osModule = require('os');
const fileSystem = require('fs');
const pathModule = require('path');


function fetchSystemDetails() {
    const systemDetails = {
        operatingSystem: osModule.type(),
        totalSystemMemory: osModule.totalmem(),
        availableMemory: osModule.freemem(),
        cpuInfo: osModule.cpus()
    };

    return systemDetails;
}


function saveSystemDetails(systemDetails) {
    const logDirectory = pathModule.join(__dirname, 'logFiles');
    const logFilePath = pathModule.join(logDirectory, 'system-details.txt');

    
    if (!fileSystem.existsSync(logDirectory)) {
        fileSystem.mkdirSync(logDirectory);
    }

    const logText = `
        Operating System: ${systemDetails.operatingSystem}
        Total Memory: ${systemDetails.totalSystemMemory} bytes
        Available Memory: ${systemDetails.availableMemory} bytes
        CPU Info: ${JSON.stringify(systemDetails.cpuInfo, null, 2)}
    `;

  
    fileSystem.writeFileSync(logFilePath, logText, { flag: 'w' });
    console.log('System details have been saved to:', logFilePath);
}


const systemDetails = fetchSystemDetails();
saveSystemDetails(systemDetails);
