
import Channels from "@chango/core";


// move these to Channels

test("open modal", () => {
    const action = Channels.actions.openModal("MODAL");
    expect(action.modal).toEqual("MODAL");
    expect(action.type).toEqual("OPEN_MODAL");
});


test("close modal", () => {
    const action = Channels.actions.closeModal();
    expect(action.type).toEqual("CLOSE_MODAL");
});
