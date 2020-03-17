import React from 'react';
import PropTypes from 'prop-types';


const style = {
    common: 'no-underline',
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-xl',
    primary: 'text-primary',
    secondary: 'text-red',
    outline: 'text-dark',
    salmon: 'text-salmon',
    white: 'text-white'
};

const Link = props => {
    const { children, extraClassName, onClick, url, size, type } = props;
    const className = style['common'] + ' ' + style[size] + ' ' + style[type];

    return (
        <div className={extraClassName}>
            <a href={url} onClick={onClick} className={className}>
                {children}
            </a>
        </div>
    );
};

Link.defaultProps = {
    size: 'medium',
    type: 'primary',
    url: '/#'
};

Link.propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    disabled: PropTypes.bool,
    extraClassName: PropTypes.string,
    onClick: PropTypes.func,
    url: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    type: PropTypes.oneOf(['primary', 'secondary', 'outline', 'salmon', 'white'])
};

export default Link;