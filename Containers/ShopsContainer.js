import Home from '../Components/Home';
import { getShops } from '../Actions/ShopsActions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        shops: state.shops.shops
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getShops: () => dispatch(getShops())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
