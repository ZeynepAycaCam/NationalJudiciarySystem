import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from '.';

const style = {
    common: 'bg-transparent border-2 rounded-4 shadow-md',
    small: 'w-4/12',
    medium: 'w-8/12',
    large: 'w-full py-2'
};

const Input = props => {
    const { disabled, iconLeft, iconRight, name, placeholder, onChange, size, type, value } = props;
    const className = 'flex items-center' + style['common'] + ' ' + style[size];

    const leftPart = iconLeft ? <div className="flex justify-center items-center w-2/12 border-solid border-r-0  text-right p-2"><Icon name={iconLeft} /></div> : null;
    const rightPart = iconRight ? <div className="flex justify-center items-center w-2/12 border-solid border-l-2  text-left p-2"><Icon name={iconRight} /></div> : null;

    const object = (type === "checkbox" || type === "image") ? (
        <input type={type} />
    ) : (
            <div className={className}>
                {leftPart}
                <input className="bg-transparent px-1" disabled={disabled} name={name} placeholder={placeholder} onChange={onChange} type={type} value={value} />
                {rightPart}
            </div>
        );

    return object;
};

Input.defaultProps = {
    disabled: false,
    size: 'medium',
};

Input.propTypes = {
    disabled: PropTypes.bool,
    iconLeft: PropTypes.string,
    iconRight: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    type: PropTypes.string,
    value: PropTypes.string
};

export default Input;