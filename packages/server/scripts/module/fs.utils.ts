import fs from 'fs';
import path from 'path';

export function createModuleFolder(moduleName: string): string {
  const modulePath = path.resolve(process.cwd(), 'src', 'modules', moduleName);
  if (fs.existsSync(modulePath)) {
    console.error(`Module ${moduleName} already exists!`);
    process.exit(1);
  }

  fs.mkdirSync(modulePath, { recursive: true });
  console.log(`Module ${moduleName} created successfully!`);
  return modulePath;
}

export function copyFile(source: string, destination: string): void {
  fs.copyFileSync(source, destination);
}

export function copyDirectory(source: string, destination: string): void {
  const items = fs.readdirSync(source);
  items.forEach(item => {
    const sourcePath = path.join(source, item);
    const destinationPath = path.join(destination, item);

    if (fs.lstatSync(sourcePath).isDirectory()) {
      fs.mkdirSync(destinationPath, { recursive: true });
      copyDirectory(sourcePath, destinationPath);
    } else {
      copyFile(sourcePath, destinationPath);
    }
  });
}

export function replaceTemplateValues(
  filePath: string,
  replacements: Record<string, string>,
  renameKey?: string
): void {
  let template = fs.readFileSync(filePath, 'utf8').toString();
  Object.entries(replacements).forEach(([key, value]) => {
    const regex = new RegExp(`\\$\\$${key}\\$\\$`, 'g');
    template = template.replace(regex, value);
  });

  fs.writeFileSync(filePath, template);

  if (renameKey) {
    const newFilePath = filePath.replace(
      `$$${renameKey}$$`,
      replacements[renameKey]
    );
    fs.renameSync(filePath, newFilePath);
  }
}
