import axios from "axios";

const API_URL = "http://localhost:5255/api/Home";

// Alterar Produtos: role adm
// Alterar Usuario: role user
// Carrinho: role user
// Listar Produtos: todos


const user = JSON.parse(localStorage.getItem('user'));

const getPublicContent = () => {
    return axios.get(API_URL + "anonymous");
};

const getAuthenticatedBoard = async () => {
    return await axios.get(API_URL + "authenticated", {
        headers: {
            Authorization:
                'Bearer ' + user.token
        }
    });
};

const UserService = {
    getPublicContent,
    getAuthenticatedBoard
};

export default UserService;