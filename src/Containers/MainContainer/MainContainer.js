import React from 'react';
import propTypes from 'prop-types'

const MainContainer = ({ Children }) => {

    return (
        <div>
            <h1>Navbar:</h1>
            {Children}
        </div>
    )
}

MainContainer.propTypes = {
    Children: propTypes.object.isRequired
}

export default MainContainer