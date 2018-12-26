import Profile from '../Components/Profile';
import { connect } from 'react-redux';
import { logout } from '../Actions/UserActions';

const mapStateToProps = (state) => {
    return {
        user: state.user,
        shops: state.shops.shops
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
