import Map from '../Components/Map';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        favouriteShops: state.user.favouriteShops,
        shops: state.shops.shops
    }
}

export default connect(mapStateToProps, null)(Map);
