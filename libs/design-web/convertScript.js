const fs = require('fs').promises;
const path = require('path');

const sourceDir = './icons'; // Source directory containing SVG files
const targetDir = './components/Icon/assets'; // Target directory for TSX files

const contentReplacer = content => {
  const replacers = [
    { regex: /(<svg[^>]*?)height="\d+"/g, replace: '$1height={height}' },
    { regex: /(<svg[^>]*?)width="\d+"/g, replace: '$1width={width}' },
    {
      regex: /(<path[^>]*?)fill="(?!white")[^"]*"/g,
      replace: `$1fill={fillColor}`,
    },
    {
      regex: /(<path[^>]*?)stroke="[^"]*"/g,
      replace: `$1stroke={borderColor}`,
    },
    { regex: /style="mask-type:luminance"/g, replace: `` },
    { regex: /stroke-width/g, replace: `strokeWidth` },
    { regex: /stroke-miterlimit/g, replace: `strokeMiterlimit` },
    { regex: /stroke-linecap/g, replace: `strokeLinecap` },
    { regex: /stroke-linejoin/g, replace: `strokeLinejoin` },
    { regex: /fill-rule/g, replace: `fillRule` },
    { regex: /clip-rule/g, replace: `clipRule` },
    { regex: /(<svg)([^>]*>)/g, replace: `$1 className={className}$2` },
    { regex: /"/g, replace: `'` },
  ];
  replacers.forEach(({ regex, replace }) => {
    content = content.replace(regex, replace);
  });
  return content;
};

const convertSvgToReactComponent = async (fileName, sourceDir, targetDir) => {
  const svgContent = await fs.readFile(path.join(sourceDir, fileName), 'utf8');
  // Parse SVG content
  const componentName = fileName.replace('.svg', '');

  const addtionalCode = `
  `;

  const reactComponent = `
import React from 'react';

interface ${componentName}Props {
  fillColor: string;
  borderColor: string;
  height: number;
  width: number;
  className?: string;
}

const ${componentName}: React.FC<${componentName}Props> = ({
  fillColor,
  borderColor,
  height,
  width,
  className
}: ${componentName}Props) => {
  ${addtionalCode}
  return (${contentReplacer(svgContent)})
  };

export default ${componentName};
  `.trim();

  await fs.writeFile(
    path.join(targetDir, `${componentName}.tsx`),
    reactComponent
  );
};

const convertAllSvgs = async () => {
  try {
    fs.access(`${targetDir}/outlined`).catch(async () => {
      await fs.mkdir(`${targetDir}/outlined`, { recursive: true });
    });

    fs.access(`${targetDir}/filled`).catch(async () => {
      await fs.mkdir(`${targetDir}/filled`, { recursive: true });
    });

    const outlinedFiles = await fs.readdir(`${sourceDir}/outlined`);
    const svgOutlinedFiles = outlinedFiles.filter(file =>
      file.endsWith('.svg')
    );

    for (const file of svgOutlinedFiles) {
      await convertSvgToReactComponent(
        file,
        `${sourceDir}/outlined`,
        `${targetDir}/outlined`
      );
      console.log(`Converted ${file} to React component`);
    }

    const filledFiles = await fs.readdir(`${sourceDir}/filled`);
    const svgFilledFiles = filledFiles.filter(file => file.endsWith('.svg'));

    for (const file of svgFilledFiles) {
      await convertSvgToReactComponent(
        file,
        `${sourceDir}/filled`,
        `${targetDir}/filled`
      );
      console.log(`Converted ${file} to React component`);
    }
  } catch (error) {
    console.error('Error converting SVGs:', error);
  }
};

convertAllSvgs();
