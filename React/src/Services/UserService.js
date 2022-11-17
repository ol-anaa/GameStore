import axios from "axios";

const API_URL = "http://localhost:3000/";

// Alterar Produtos: role adm
// Alterar Usuario: role user
// Carrinho: role user
// Listar Produtos: todos


const user = JSON.parse(localStorage.getItem('user'));

const getPublicContent = () => {
    return axios.get(API_URL + "produtos");
};

const getAdmBoard = async () => {
    return await axios.get(API_URL + "produtos", {
        headers: {
            Authorization:
                'Bearer ' + user.token
        }
    });
};
const UserService = {
    getPublicContent,
    getAdmBoard
};

export default UserService;