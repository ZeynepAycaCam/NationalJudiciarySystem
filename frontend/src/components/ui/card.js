import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

const style = {
    common: 'w-1 border-blueyGrey bg-white rounded-4',
    lg: 'shadow-lg',
    md: 'shadow-md',
    none: 'shadow',
    margin: 'my-4',
    padding: 'px-8 py-6',
    tiny: 'shadow',
};

const Card = props => {
    const { applyMargin, applyPadding, extraClassName, extraStyle, shadow, children } = props;
    return (
        <div
            className={cls(extraClassName, style[shadow], style.common, {
                [style.padding]: applyPadding
            }, {
                [style.margin]: applyMargin
            })}
            style={extraStyle}
        >
            {children}
        </div>
    );
};

Card.defaultProps = {
    applyMargin: true,
    applyPadding: true
};

Card.propTypes = {
    applyMargin: PropTypes.bool,
    applyPadding: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.arrayOf(PropTypes.object),
    ]),
    extraClassName: PropTypes.string,
    extraStyle: PropTypes.string,
    shadow: PropTypes.oneOf(['none', 'tiny', 'md', 'lg']).isRequired,
};

export default Card;