import Details from '../Components/Details';
import { toggleFavouriteShop } from '../Actions/UserActions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        favouriteShops: state.user.favouriteShops
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleFavouriteShop: (shopId) => dispatch(toggleFavouriteShop(shopId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);
