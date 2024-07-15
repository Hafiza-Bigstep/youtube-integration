import { replaceTemplateValues } from './fs.utils';

export function constructController(
  filePath: string,
  answers: Record<string, string>
): void {
  const replacements = {
    controller_class_name: answers.controllerName.toControllerName(),
    controller_file_name: answers.controllerName.toFileName(),
    service_class_name: answers.serviceName.toServiceName(),
    service_file_name: answers.serviceName.toFileName(),
    policy_class_name: answers.policyName.toPolicyName(),
    policy_file_name: answers.policyName.toFileName(),
    service_var_name: answers.serviceName.toServiceVarName(),
    policy_var_name: answers.policyName.toPolicyVarName(),
    controller_route_name: answers.controllerName.toVarName(),
  };

  replaceTemplateValues(filePath, replacements, 'controller_file_name');
}

export function constructPolicy(
  filePath: string,
  answers: Record<string, string>
): void {
  const replacements = {
    repository_class_name: answers.repositoryName.toRepositoryClassName(),
    policy_class_name: answers.policyName.toPolicyName(),
    policy_file_name: answers.policyName.toFileName(),
    repository_file_name: answers.repositoryName.toFileName(),
    repository_var_name: answers.repositoryName.toRepositoryVarName(),
  };

  replaceTemplateValues(filePath, replacements, 'policy_file_name');
}

export function constructIndex(
  filePath: string,
  answers: Record<string, string>
): void {
  const replacements = {
    repository_class_name: answers.repositoryName.toRepositoryClassName(),
    service_class_name: answers.serviceName.toServiceName(),
    controller_class_name: answers.controllerName.toControllerName(),
    policy_class_name: answers.policyName.toPolicyName(),
    service_file_name: answers.serviceName.toFileName(),
    policy_file_name: answers.policyName.toFileName(),
    repository_file_name: answers.repositoryName.toFileName(),
    controller_file_name: answers.controllerName.toFileName(),
    module_var_name: answers.moduleName.toModuleVarName(),
  };

  replaceTemplateValues(filePath, replacements);
}

export function constructTypes(
  filePath: string,
  answers: Record<string, string>
): void {
  const replacements = {
    repository_class_name: answers.repositoryName.toRepositoryClassName(),
    policy_class_name: answers.policyName.toPolicyName(),
    service_class_name: answers.serviceName.toServiceName(),
    controller_class_name: answers.controllerName.toControllerName(),
  };

  replaceTemplateValues(filePath, replacements);
}

export function constructService(
  filePath: string,
  answers: Record<string, string>
): void {
  const replacements = {
    repository_class_name: answers.repositoryName.toRepositoryClassName(),
    repository_file_name: answers.repositoryName.toFileName(),
    service_class_name: answers.serviceName.toServiceName(),
    service_file_name: answers.serviceName.toFileName(),
    repository_var_name: answers.repositoryName.toRepositoryVarName(),
  };

  replaceTemplateValues(filePath, replacements, 'service_file_name');
}

export function constructRepository(
  filePath: string,
  repositoryName: string,
  modelName: string
): void {
  const replacements = {
    repository_class_name: repositoryName.toRepositoryClassName(),
    repository_file_name: repositoryName.toFileName(),
    model_name: modelName.toVarName(),
  };

  replaceTemplateValues(filePath, replacements, 'repository_file_name');
}
