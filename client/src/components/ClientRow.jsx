import { useMutation } from '@apollo/client';
import { FaTrash } from 'react-icons/fa';
import { DELETE_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';
import { GET_PROJECTS } from '../queries/projectQueries';

const ClientRow = ({ client }) => {
	const { id, name, email, phone } = client;

	const [deleteClient] = useMutation(DELETE_CLIENT, {
		variables: {
			id: id,
		},
		//* Refetch GET_CLIENTS so it's gone from the UI
		refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
		//* Get clients from the cache and updates it so it's gone from the UI (no new requests)
		// update(cache, { data: { deleteClient } }) {
		// 	const { clients } = cache.readQuery({ query: GET_CLIENTS });
		// 	cache.writeQuery({
		// 		query: GET_CLIENTS,
		// 		data: {
		// 			clients: clients.filter(client => client.id !== deleteClient.id),
		// 		},
		// 	});
		// },
	});

	return (
		<tr>
			<td>{name}</td>
			<td>{email}</td>
			<td>{phone}</td>
			<td>
				<button className='btn btn-danger btn-sm' onClick={deleteClient}>
					<FaTrash />
				</button>
			</td>
		</tr>
	);
};
export default ClientRow;
