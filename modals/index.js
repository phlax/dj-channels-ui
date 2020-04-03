
import {ResetPasswordModal} from "./forgotten";
import {RegisterModal} from "./register";
import {LoginModal} from "./login";
import {ContactModal} from "./contact";
import {AddModal} from "./add";
import {ConfirmModal} from "./confirm";

import {modalPropTypes} from "./base";


const allModals = {
    "channels.auth.contact": ContactModal,
    "channels.auth.reset": ResetPasswordModal,
    "channels.auth.register": RegisterModal,
    "channels.auth.login": LoginModal,
    "channels.ui.add": AddModal,
    "channels.ui.confirm": ConfirmModal};


export {
    ContactModal, LoginModal, AddModal, ConfirmModal,
    ResetPasswordModal, RegisterModal, allModals, modalPropTypes};
