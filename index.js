
import {Avatar, AvatarProvider} from "./avatar";
import {APILink, Link, ModalLink} from "./link";
import * as forms from "./forms";
import * as actions from "./actions";
import * as modals from "./modals";
import * as menus from "./menus";
import * as nprogress from "./nprogress";
import * as tables from "./tables";
import {Provider} from "./provider";
import {AddModalButton, Modal} from "./modal";
import {App} from "./app";
import {Context} from "./context";
import {withData} from "./utils";
import {Icon} from "./icon";
import {UserAvatar} from "./user";
import {Search} from "./search";


const ChannelsUI = {
    actions, App, APILink, Avatar, AvatarProvider,
    Context, Link, forms, menus, modals, Modal, ModalLink,
    nprogress, tables, Provider, withData,
    Throbber: nprogress.Throbber, Icon, UserAvatar,
    allModals: modals.allModals,
    modalPropTypes: modals.modalPropTypes,
    AddModalButton,
    Search
};


const FormGroups = forms.FormGroups;
const FormErrors = forms.FormErrors;
const FormSubmit = forms.FormSubmit;
const Fieldset = forms.Fieldset;

export {
    Avatar, APILink, AddModalButton,
    Fieldset, FormGroups, FormErrors, FormSubmit, Search,
    Context, Link, ModalLink, Icon, UserAvatar};
export default ChannelsUI;
