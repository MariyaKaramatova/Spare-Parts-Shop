import Login from '../Components/Login';
import { login, facebookLogin } from '../Actions/UserActions';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
    return {
        login: (username, password) => dispatch(login(username, password)),
        facebookLogin: () => dispatch(facebookLogin())
    };
};

export default connect(null, mapDispatchToProps)(Login);
