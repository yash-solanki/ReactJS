import axios from "axios";

const initialState = {
    users: []
};

const deleteProduct = (i) => {
    axios.delete(`http://localhost:9002/v1/admin/users/${i}`, headers)
        .then(res => {
            axios.get(`http://localhost:9002/v1/admin/users`, headers)
                .then(res => {
                    const persons = res.data.Data.data;
                    this.setState({ persons });
                })
        })
};
const headers = {
    headers: {
        Authorization: 'Bearer d40e029af72beb4aaa434816eee414f43f744098',
        // Division: 'KROG065',
        SessionToken: 'uZFQVcNHk4wWZdf4QqaAOoUo7JgBqyd9gBfC4KJ8Cq9BOuXogCdIlUsPvObv',
        'content-type': 'application/json'
    }
};

const reducerUser = (state = initialState, action) => {
    if (action.type === '') {
        return {
            ...state,
            users: ''
        };
    }
    return state;
};

export default reducerUser;
