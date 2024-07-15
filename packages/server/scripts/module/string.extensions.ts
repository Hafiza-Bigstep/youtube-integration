export {};

declare global {
  interface String {
    toModuleName(): string;
    toCapitalCase(): string;
    toControllerName(): string;
    toPolicyName(): string;
    toServiceName(): string;
    toRepositoryClassName(): string;
    toFileName(): string;
    toVarName(): string;
    toRepositoryVarName(): string;
    toPolicyVarName(): string;
    toServiceVarName(): string;
    toControllerVarName(): string;
    toModuleVarName(): string;
  }
}

String.prototype.toModuleName = function () {
  return `${this.toLowerCase()}_module`;
};

String.prototype.toCapitalCase = function (): string {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.toControllerName = function (): string {
  return `${this.toCapitalCase()}Controller`;
};

String.prototype.toPolicyName = function (): string {
  return `${this.toCapitalCase()}Policy`;
};

String.prototype.toServiceName = function (): string {
  return `${this.toCapitalCase()}Service`;
};

String.prototype.toRepositoryClassName = function (): string {
  return `${this.toCapitalCase()}Repository`;
};

String.prototype.toFileName = function (): string {
  return this.toLowerCase();
};

String.prototype.toVarName = function (): string {
  return this.charAt(0).toLowerCase() + this.slice(1);
};

String.prototype.toRepositoryVarName = function (): string {
  return `${this.toVarName()}Repository`;
};

String.prototype.toPolicyVarName = function (): string {
  return `${this.toVarName()}Policy`;
};

String.prototype.toServiceVarName = function (): string {
  return `${this.toVarName()}Service`;
};

String.prototype.toControllerVarName = function (): string {
  return `${this.toVarName()}Controller`;
};

String.prototype.toModuleVarName = function (): string {
  return `${this.toVarName()}Module`;
};
