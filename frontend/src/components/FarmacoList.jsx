import PropTypes from 'prop-types';
import axios from '../api/axios';

function FarmacoList({ farmacos, updateFarmaco, deleteFarmaco }) {
  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`/farmacos/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    deleteFarmaco(id);
  };

  return (
    <ul>
      {Array.isArray(farmacos) && farmacos.map(farmaco => (
        <li key={farmaco._id} className="border p-2 mb-2">
          <h3 className="text-xl">{farmaco.name}</h3>
          <p>{farmaco.description}</p>
          <p>{farmaco.dose}</p>
          <p>{farmaco.frequency}</p>
          <p>{farmaco.times}</p>
          <p>{farmaco.startdate}</p>
          <p>{farmaco.enddate}</p>
          <button onClick={() => updateFarmaco(farmaco)} className="btn btn-secondary mr-2">Edit</button>
          <button onClick={() => handleDelete(farmaco._id)} className="btn btn-danger">Delete</button>
        </li>
      ))}
    </ul>
  );
}

FarmacoList.propTypes = {
  farmacos: PropTypes.array.isRequired,
  updateFarmaco: PropTypes.func.isRequired,
  deleteFarmaco: PropTypes.func.isRequired,
};

export default FarmacoList;