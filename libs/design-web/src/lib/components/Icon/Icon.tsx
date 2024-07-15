import React, { memo, lazy, useEffect, Suspense, useState } from 'react';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

interface BaseIconProps {
  height?: number;
  width?: number;
  fillColor?: string;
  borderColor?: string;
  isHovered?: boolean;
  className?: string;
  onClick?: () => void;
}

interface IconProps extends BaseIconProps {
  name: string;
}

const defaultIconSize = 24;
const defaultIconColor = '#717171';
const defaultIconStroke = '#717171';

const defaultSelectedIconColor = '#652dbf';
const defaultSelectedIconStroke = '#652dbf';

const IconComponent: React.FC<IconProps> = ({
  name,
  height = defaultIconSize,
  width = defaultIconSize,
  fillColor,
  borderColor,
  isHovered,
  className,
  onClick,
}) => {
  const [selectedIcon, setSelectedIcon] = useState(isHovered);

  useEffect(() => {
    setSelectedIcon(isHovered);
  }, [isHovered]);

  const onMouseEnterHandler = () => {
    setSelectedIcon(true);
  };

  const onMouseLeaveHandler = () => {
    if (!isHovered) {
      setSelectedIcon(false);
    }
  };

  // Use state to store lazy-loaded components
  const [DynamicComponent, setDynamicComponent] =
    useState<React.ComponentType<any> | null>(null);
  const [SelectDynamicComponent, setSelectDynamicComponent] =
    useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    const importDynamicComponents = async () => {
      try {
        // Dynamically import both components
        const [dynamic, selectDynamic] = await Promise.all([
          import(`./assets/outlined/${name}`),
          import(`./assets/filled/${name}`),
        ]);
        setDynamicComponent(() => dynamic.default);
        setSelectDynamicComponent(() => selectDynamic.default);
      } catch (error) {
        console.error('Error loading dynamic components:', error);
      }
    };

    importDynamicComponents();
  }, [name]); // Dependency on name ensures components are reloaded if name changes

  console.log(
    'IconComponent',
    height,
    width,
    fillColor,
    name,
    isHovered,
    className
  );

  return (
    <div
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
      onClick={onClick}
    >
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          {selectedIcon && SelectDynamicComponent ? (
            <SelectDynamicComponent
              height={height}
              width={width}
              fillColor={fillColor || defaultSelectedIconColor}
              borderColor={borderColor || defaultSelectedIconStroke}
              className={className}
              key={`selected-${name}`}
            />
          ) : (
            DynamicComponent && (
              <DynamicComponent
                height={height}
                width={width}
                fillColor={fillColor || defaultIconColor}
                borderColor={borderColor || defaultIconStroke}
                className={className}
                key={`normal-${name}`}
              />
            )
          )}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default memo(IconComponent);
