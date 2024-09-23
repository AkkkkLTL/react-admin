import { isExternal } from "@/utils/validate"
import "./styles.scss"

interface IProps {
  iconClass: string;
  className?: string;
}

const SvgIcon = (props:IProps) => {
  const {iconClass, className} = props;
  const iconName = `#icon-${iconClass}`;
  const svgClass = className ? "svg-icon " + className : "svg-icon";
  const styleExternalIcon = {
    mask: `url(${iconClass}) no-repeat 50% 50%`,
    '-webkit-mask': `url(${iconClass}) no-repeat 50% 50%`
  }

  return (
    <>
      {isExternal(props.iconClass) ? (
        <div 
          style={styleExternalIcon}
          className="svg-external-icon svg-icon"
        />
      ) : (
        <svg 
          className={svgClass}
          aria-hidden={true}
        >
          <use xlinkHref={iconName} />
        </svg>
      )}
    </>
  )
}

export default SvgIcon;