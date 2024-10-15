import React from 'react';

function ListaList({ listas, onEdit, onDelete }) {
  return (
    <div>
      <h2>Listas existentes</h2>
      <ul>
        {listas.map(lista => (
          <li key={lista._id}>
            <h3>{lista.categoria}</h3>
            <p>{lista.farmacos.join(', ')}</p> {/* Mostrar fármacos */}
            <button onClick={() => onEdit(lista)}>Editar</button>
            <button onClick={() => onDelete(lista._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaList;
