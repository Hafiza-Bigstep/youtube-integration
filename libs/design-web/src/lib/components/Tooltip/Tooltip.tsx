import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

interface TooltipProps {
  children?: React.ReactElement<any>;
  content?: React.ReactNode;
  className?: string;
  placement:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'right'
    | 'right-start'
    | 'right-end';
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  placement,
  className,
  children,
}) => {
  return (
    <Tippy content={content} placement={placement} className={className}>
      {children}
    </Tippy>
  );
};

export default Tooltip;
