import { program } from 'commander';
import inquirer from 'inquirer';
import { create } from './main';
import { createExisting } from './existing';

program.version('1.0.0').description('Database Configuration CLI');

const optionQuestion = [
  {
    type: 'list',
    name: 'actionType',
    message: 'Choose an option:',
    choices: [
      {
        name: 'Create a new module',
        value: 'new',
      },
      {
        name: 'Create a file in existing module',
        value: 'existing',
      },
    ],
  },
];

const moduleQuestion = [
  {
    type: 'input',
    name: 'moduleName',
    message: 'Enter the name of the module:',
    validate: (input: string) =>
      input.trim() !== '' || 'Module name cannot be empty',
  },
];

const controllerNameQuestion = [
  {
    type: 'input',
    name: 'controllerName',
    message: 'Enter the name of the controller:',
    validate: (input: string) =>
      input.trim() !== '' || 'Controller name cannot be empty',
  },
];

function generateRelatedQuestions(controllerName: string) {
  return [
    {
      type: 'input',
      name: 'policyName',
      message: 'Enter the name of the policy:',
      default: controllerName,
      validate: (input: string) =>
        input.trim() !== '' || 'Policy name cannot be empty',
    },
    {
      type: 'input',
      name: 'repositoryName',
      message: 'Enter the name of the repository:',
      default: controllerName,
      validate: (input: string) =>
        input.trim() !== '' || 'Repository name cannot be empty',
    },
    {
      type: 'input',
      name: 'serviceName',
      message: 'Enter the name of the service:',
      default: controllerName,
      validate: (input: string) =>
        input.trim() !== '' || 'Service name cannot be empty',
    },
    {
      type: 'input',
      name: 'modelName',
      message: 'Enter the name of the model:',
      default: controllerName,
      validate: (input: string) =>
        input.trim() !== '' || 'Model name cannot be empty',
    },
  ];
}

program
  .command('create')
  .description('Create a new module')
  .action(() => {
    inquirer.prompt(optionQuestion).then(async answers => {
      if (answers.actionType === 'existing') {
        await createExisting();
        return;
      }
      inquirer.prompt(moduleQuestion).then(async ({ moduleName }) => {
        inquirer
          .prompt(controllerNameQuestion)
          .then(async ({ controllerName }) => {
            const otherQuestions = generateRelatedQuestions(controllerName);
            inquirer.prompt(otherQuestions).then(async answers => {
              const outputs = { moduleName, controllerName, ...answers };
              await create(outputs);
            });
          });
      });
    });
  });

program.parse(process.argv);
