
const fsPromises = require('fs').promises;
const pathUtil = require('path');


const fileCategories = {
  Images: ['.jpg', '.jpeg', '.png', '.gif'],
  Documents: ['.doc', '.docx', '.pdf', '.txt'],
  Videos: ['.mp4', '.avi', '.mkv'],
  Others: []
};


async function organizeFiles(sourceDir) {
  try {
    
    const entries = await fsPromises.readdir(sourceDir);
    
    const operationLogs = [];

    if (entries.length === 0) {
      console.log("No files found in the source directory.");
    }

    for (const entry of entries) {
      const currentFilePath = pathUtil.join(sourceDir, entry);
      const fileStats = await fsPromises.stat(currentFilePath);

      console.log(`Processing: ${entry}`);

   
      if (fileStats.isFile()) {
        const fileExtension = pathUtil.extname(entry).toLowerCase();
        let destinationFolder = 'Others'; 

  
        for (const [category, extensions] of Object.entries(fileCategories)) {
          if (extensions.includes(fileExtension)) {
            destinationFolder = category;
            break;
          }
        }

    
        const destinationDir = pathUtil.join(sourceDir, destinationFolder);
        await fsPromises.mkdir(destinationDir, { recursive: true });

        const destinationFilePath = pathUtil.join(destinationDir, entry);
        await fsPromises.rename(currentFilePath, destinationFilePath);

     
        operationLogs.push(`Moved: ${entry} -> ${destinationFolder}`);
      } else {
        console.log(`${entry} is a directory, skipping.`);
      }
    }

  
    if (operationLogs.length === 0) {
      console.log("No files were moved.");
    }

    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const summaryFile = pathUtil.join(sourceDir, `summary.txt`);
    
    
    await fsPromises.writeFile(summaryFile, operationLogs.join('\n'), 'utf8');

    console.log('File organization complete. Summary logged in:', summaryFile);
  } catch (error) {
    console.error('Error during file organization:', error);
  }
}

const targetDirectory = process.argv[2];
if (!targetDirectory) {
  console.error('Please provide a directory path as an argument.');
  process.exit(1);
}

organizeFiles(targetDirectory);
