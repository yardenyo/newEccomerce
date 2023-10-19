import * as fs from 'fs-extra';
import * as path from 'path';
import {
    controllerContent,
    interfaceContent,
    modelContent,
    serviceContent,
    validationContent,
} from '../server/src/utils/helpers/resourceContent.helper';
import prettier from 'prettier';

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

createFile(
    path.join(resourceFolder, `${resourceName}.controller.ts`),
    controllerContent(resourceName),
);
createFile(
    path.join(resourceFolder, `${resourceName}.interface.ts`),
    interfaceContent(resourceName),
);
createFile(
    path.join(resourceFolder, `${resourceName}.model.ts`),
    modelContent(resourceName),
);
createFile(
    path.join(resourceFolder, `${resourceName}.service.ts`),
    serviceContent(resourceName),
);
createFile(
    path.join(resourceFolder, `${resourceName}.validation.ts`),
    validationContent(resourceName),
);

console.log(`Resource '${resourceName}' created successfully.`);

async function updateIndexFile() {
    const indexPath = path.join(__dirname, 'src/index.ts');
    const controllerImport = `import ${resourceName}Controller from '@/resources/${resourceName}/${resourceName}.controller';`;
    const controllerNewInstance = `new ${resourceName}Controller(),`;

    let indexContent = fs.readFileSync(indexPath, 'utf-8');
    const indexContentArray = indexContent.split('\n');

    const validateEnvIndex = indexContentArray.findIndex((line) =>
        line.includes('validateEnv()'),
    );

    indexContentArray.splice(validateEnvIndex - 1, 0, controllerImport);

    const lastControllerInstance = indexContentArray.findIndex((line) =>
        line.includes('],'),
    );

    indexContentArray.splice(lastControllerInstance, 0, controllerNewInstance);

    const newContent = indexContentArray.join('\n');

    const formattedContent = await prettier.format(newContent, {
        parser: 'typescript',
    });

    fs.writeFileSync(indexPath, formattedContent, 'utf-8');
}

updateIndexFile()
    .then(() => {
        console.log('Index file updated successfully.');
    })
    .catch((error) => {
        console.error('Error updating index file:', error);
    });
