import path from 'path';
import './string.extensions';
import { createModuleFolder, copyDirectory } from './fs.utils';
import {
  constructController,
  constructPolicy,
  constructIndex,
  constructTypes,
  constructService,
  constructRepository,
} from './construct.service';
import { TemplateFileName } from './helpers';

export function create(answers: Record<string, string>): void {
  const moduleFolder = createModuleFolder(answers.moduleName.toModuleName());
  if (!moduleFolder) {
    console.error(
      `An error occurred while creating the module ${answers.moduleName}`
    );
    process.exit(1);
  }

  copyDirectory(path.resolve(__dirname, 'template'), moduleFolder);

  const constructs: [Function, string, string, any[]][] = [
    [
      constructRepository,
      'repositories',
      TemplateFileName.Repository,
      [answers.repositoryName, answers.modelName],
    ],
    [constructService, 'services', TemplateFileName.Service, [answers]],
    [constructTypes, 'types', 'index.ts', [answers]],
    [constructIndex, '', 'index.ts', [answers]],
    [constructPolicy, 'policies', TemplateFileName.Policy, [answers]],
    [
      constructController,
      'controllers',
      TemplateFileName.Controller,
      [answers],
    ],
  ];

  constructs.forEach(([func, subdir, filename, args]) => {
    func(path.resolve(moduleFolder, subdir, filename), ...args);
  });
}
