import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { ADD_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';

const AddClientModal = () => {
	const [clientData, setClientData] = useState({
		name: '',
		email: '',
		phone: '',
	});

	const { name, email, phone } = clientData;

	const [addClient] = useMutation(ADD_CLIENT, {
		variables: { name, email, phone },
		update(cache, { data: { addClient } }) {
			const { clients } = cache.readQuery({ query: GET_CLIENTS });
			cache.writeQuery({
				query: GET_CLIENTS,
				data: { clients: [...clients, addClient] },
			});
		},
	});

	const onChangeHandler = e => {
		setClientData(prevState => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmitHandler = e => {
		e.preventDefault();

		if (!name || !email || !phone) {
			return alert('Please fill in all fields');
		}

		addClient(name, email, phone);

		setClientData({
			name: '',
			email: '',
			phone: '',
		});
	};

	return (
		<>
			<button
				type='button'
				className='btn btn-secondary'
				data-bs-toggle='modal'
				data-bs-target='#addClientModal'
			>
				<div className='d-flex align-items-center'>
					<FaUser className='icon' />
					<div>Add Client</div>
				</div>
			</button>

			<div
				className='modal fade'
				id='addClientModal'
				role='dialog'
				aria-labelledby='addClientModalLabel'
				aria-hidden='true'
			>
				<div className='modal-dialog' role='document'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='addClientModalLabel'>
								Add Client
							</h5>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
							></button>
						</div>
						<div className='modal-body'>
							<form onSubmit={onSubmitHandler}>
								<div className='mb-3'>
									<label className='form-label'>Name</label>
									<input
										type='text'
										className='form-control'
										name='name'
										value={name}
										onChange={onChangeHandler}
									/>
								</div>
								<div className='mb-3'>
									<label className='form-label'>Email</label>
									<input
										type='email'
										className='form-control'
										name='email'
										value={email}
										onChange={onChangeHandler}
									/>
								</div>
								<div className='mb-3'>
									<label className='form-label'>Phone</label>
									<input
										type='text'
										className='form-control'
										name='phone'
										value={phone}
										onChange={onChangeHandler}
									/>
								</div>
								<button
									type='submit'
									data-bs-dismiss='modal'
									className='btn btn-secondary'
								>
									Submit
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default AddClientModal;
