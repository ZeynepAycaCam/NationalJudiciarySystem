import cls from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const style = {
    h1: 'text-6xl leading-4xl font-bold',
    h2: 'text-5xl leading-3xl font-bold',
    h3: 'text-4xl leading-2xl font-normal',
    h4: 'text-3xl leading-xl font-normal',
    h5: 'text-2xl leading-lg font-normal',
    h6: 'text-lg leading-base font-light',
};

const Title = props => {
    const { type: HeaderType, extraClassName, children } = props;
    return <HeaderType className={
        cls(extraClassName,
            style[HeaderType],
            "capitalize"
        )
    }>
        {children}
    </HeaderType>;
};

Title.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.any,
    ]),
    extraClassName: PropTypes.string,
    type: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']).isRequired,
};

export default Title;