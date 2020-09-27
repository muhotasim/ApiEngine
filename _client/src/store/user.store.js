const initialState = {
    name: '',
    email: '',
    permissions: []
};
const userStore = (state = initialState, action = {}) => {
    switch(action.type){

        default:
            return state;
    }
}
export default userStore;