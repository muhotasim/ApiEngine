import React from 'react';
import { uuid } from '../../general/Common.Comp';

const ApiList = (props) => {
  const key = uuid();
  return (
    <div>
      <ul className="api-list-holder">
        {props.apis.map((api, index) => {
          return (
            <li
              key={key + index}
              className="api-list-item"
              onClick={() => {
                props.onSelect(api);
              }}
            >
              {api.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default ApiList;
