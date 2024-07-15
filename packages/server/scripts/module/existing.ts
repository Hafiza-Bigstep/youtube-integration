import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import {
  constructController,
  constructPolicy,
  constructRepository,
  constructService,
} from './construct.service';
import { copyFile } from './fs.utils';
import { TemplateFileName } from './helpers';

enum FileType {
  Service = 'service',
  Controller = 'controller',
  Repository = 'repository',
  Policy = 'policy',
}

const TEMPLATE_DIR = path.resolve(__dirname, 'template');
const MODULES_DIR = path.resolve(process.cwd(), 'src', 'modules');

function getDirectories(source: string): string[] {
  return fs
    .readdirSync(source)
    .filter(name => fs.statSync(path.join(source, name)).isDirectory());
}

async function promptInput(message: string): Promise<string> {
  const response = await inquirer.prompt([
    { type: 'input', name: 'value', message },
  ]);
  return response.value;
}

async function promptList(
  message: string,
  choices: { name: string; value: string }[]
): Promise<string> {
  const response = await inquirer.prompt([
    { type: 'list', name: 'value', message, choices },
  ]);
  return response.value;
}

async function inputFileName(): Promise<string> {
  return await promptInput('Enter the name of the file:');
}

async function chooseFileType(): Promise<FileType> {
  const choices = [
    { name: 'Service', value: FileType.Service },
    { name: 'Controller', value: FileType.Controller },
    { name: 'Repository', value: FileType.Repository },
    { name: 'Policy', value: FileType.Policy },
  ];
  return (await promptList('Choose a file type:', choices)) as FileType;
}

async function chooseModule(
  directories: string[]
): Promise<{ module: string; fileType: FileType; fileName: string }> {
  const module = await promptList(
    'Choose a module:',
    directories.map(d => ({ name: d, value: d }))
  );
  const fileType = await chooseFileType();
  const fileName = await inputFileName();
  return { module, fileType, fileName };
}

function getTargetPath(
  module: string,
  folder: string,
  fileName: string
): string {
  return path.resolve(MODULES_DIR, module, folder, fileName);
}

function handleServiceFile(module: string, args: Record<string, string>): void {
  const fileName: string = TemplateFileName.Service;
  const targetPath = getTargetPath(module, 'services', fileName);

  copyFile(path.resolve(TEMPLATE_DIR, 'services', fileName), targetPath);
  constructService(targetPath, args);
}

function handleControllerFile(
  module: string,
  args: Record<string, string>
): void {
  const fileName: string = TemplateFileName.Controller;
  const targetPath = getTargetPath(module, 'controllers', fileName);

  copyFile(path.resolve(TEMPLATE_DIR, 'controllers', fileName), targetPath);
  constructController(targetPath, args);
}

function handlePolicyFile(module: string, args: Record<string, string>): void {
  const fileName = TemplateFileName.Policy;
  const targetPath = getTargetPath(module, 'policies', fileName);

  copyFile(path.resolve(TEMPLATE_DIR, 'policies', fileName), targetPath);
  constructPolicy(targetPath, args);
}

function handleRepositoryFile(
  module: string,
  args: Record<string, string>
): void {
  const fileName = TemplateFileName.Repository;
  const targetPath = getTargetPath(module, 'repositories', fileName);

  copyFile(path.resolve(TEMPLATE_DIR, 'repositories', fileName), targetPath);
  constructRepository(targetPath, args.repositoryName, args.modelName);
}

async function createModuleFile(
  module: string,
  fileType: FileType,
  fileName: string
): Promise<void> {
  const args = {
    controllerName: fileName,
    policyName: fileName,
    repositoryName: fileName,
    serviceName: fileName,
    modelName: fileName,
  };

  switch (fileType) {
    case FileType.Service:
      handleServiceFile(module, args);
      break;
    case FileType.Controller:
      handleControllerFile(module, args);
      break;
    case FileType.Policy:
      handlePolicyFile(module, args);
      break;
    case FileType.Repository:
      handleRepositoryFile(module, args);
      break;
    default:
      console.error(`Unsupported file type: ${fileType}`);
  }
}

async function keepCreating() {
  const response = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'continue',
      message: 'Do you want to create another file?',
      default: true,
    },
  ]);

  return response.continue;
}

export async function createExisting(): Promise<void> {
  let keepContinue = true;

  while (keepContinue) {
    try {
      const directories = getDirectories(MODULES_DIR);
      const { module, fileType, fileName } = await chooseModule(directories);
      await createModuleFile(module, fileType, fileName);
      console.log('File created successfully');

      keepContinue = await keepCreating();
    } catch (error) {
      console.error('Error creating module file:', error);
      process.exit(1);
    }
  }
}
