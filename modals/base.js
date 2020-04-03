
import PropTypes from "prop-types";
import exact from "prop-types-exact";


export const modalPropTypes = exact({
    config: PropTypes.object.isRequired,
    enableSubmit: PropTypes.func.isRequired,
    disableSubmit: PropTypes.func.isRequired,
    toggle: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    submit: PropTypes.bool,
});
