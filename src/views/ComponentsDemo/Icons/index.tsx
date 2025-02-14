import SvgIcon from "@/components/SvgIcon";
import svgIcons from "@/icons";
import { Tabs, Tooltip } from "antd";
import { FC, useCallback } from "react";

import "./index.scss";
import clipboard from "@/utils/clipboard";

const Icons:FC = () => {

  // - - - - - method - - - - - -
  const generateIconCode = useCallback((symbol:string | null) => {
    return `<SvgIcon icon-class="${symbol} />`;
  }, []);

  const handleClipboard = useCallback((text:string, event:any) => {
    clipboard(text, event);
  }, []);

  return (
    <div className="icons-container">
      <Tabs 
        type="card"
        items={[{
          label: 'Icons',
          key: 'Icons',
          children: (
            <div className="grid">
              {svgIcons.map((item, index) => (
                <div 
                  key={item}
                  onClick={(e) => handleClipboard(generateIconCode(item), e)}
                >
                    <Tooltip placement="top" title={generateIconCode(item)}>
                      <div className="icon-item">
                        <SvgIcon iconClass={item ?? ''} className="disabled" />
                        <span>{item}</span>
                      </div>
                    </Tooltip>
                </div>
              ))

              }
            </div>
          ),
        }]}
      />
    </div>
  );
}

export default Icons;