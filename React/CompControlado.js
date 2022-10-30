import React from 'react';
export default function CompControlado() {
    const [nome, setNome] = useState("nome inicial");
    function leNome(evento) {
        //console.log(evento.target.value)
        setNome(evento.target.value)
    }
    function exibeNome() {
        alert(nome)
    }
    return (
        <div style={{ fontFamily: 'Verdana' }}>
            <h1>Exemplo Componente Controlado</h1>
            <label>
                Nome:
                <input type="text" value={nome} onChange={leNome} />
                <button onClick={exibeNome}>Exibe</button>
            </label>
        </div>
    )
}