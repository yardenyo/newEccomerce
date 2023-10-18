import * as fs from 'fs-extra';
import * as path from 'path';

const resourceName = process.argv[2];

if (!resourceName) {
    console.error('Usage: ts-node generateResource.ts <resourceName>');
    process.exit(1);
}

const resourceFolder = path.join(__dirname, 'src/resources', resourceName);

const createFolder = (folderPath: string) => {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
        console.log(`Created folder: ${folderPath}`);
    }
};

const createFile = (filePath: string, content: string) => {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content);
        console.log(`Created file: ${filePath}`);
    }
};

createFolder(resourceFolder);

createFile(path.join(resourceFolder, `${resourceName}.controller.ts`), '');
createFile(path.join(resourceFolder, `${resourceName}.interface.ts`), '');
createFile(path.join(resourceFolder, `${resourceName}.model.ts`), '');
createFile(path.join(resourceFolder, `${resourceName}.service.ts`), '');
createFile(path.join(resourceFolder, `${resourceName}.validation.ts`), '');

console.log(`Resource '${resourceName}' created successfully.`);
