import React from 'react';
import { func, shape, string } from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useCategoryLeaf } from '@magento/peregrine/lib/talons/CategoryTree';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';

import { useStyle } from '../../classify';
import defaultClasses from './categoryLeaf.module.css';

const Leaf = props => {
    const { category, onNavigate, categoryUrlSuffix, tabIndex } = props;
    const { name, url_path, children } = category;
    const classes = useStyle(defaultClasses, props.classes);
    const { handleClick } = useCategoryLeaf({ onNavigate });
    const destination = resourceUrl(`/${url_path}${categoryUrlSuffix || ''}`);

    const leafLabel =
    children ? (
        null
    ) : (
        name
    );

    return leafLabel ? (
    
        <div className={classes.root}>
            <Link
                className={classes.link}
                to={destination}
                onClick={handleClick}
            >
                <h3 className={classes.heading}>{leafLabel}</h3>
            </Link>            
        </div>

    ) : null;
};

export default Leaf;

Leaf.propTypes = {
    category: shape({
        name: string.isRequired,
        url_path: string.isRequired
    }).isRequired,
    classes: shape({
        root: string,
        target: string,
        text: string
    }),
    onNavigate: func.isRequired,
    tabIndex: func.isRequired,
    categoryUrlSuffix: string
};
