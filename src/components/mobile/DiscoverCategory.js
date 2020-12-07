import React from 'react';
import Discover from '../general-components/mobile/Discover';





const DiscoverCategoryMobile = ({ currentUser, logout, categoryName }) => {
    return (
        <Discover
            currentUser={currentUser}
            logout={logout}
            discoverMessage={`Browse ${categoryName}`}
        />
    )
}

export default DiscoverCategoryMobile;