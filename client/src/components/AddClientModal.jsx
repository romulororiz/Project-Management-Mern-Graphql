import { useState } from 'react';
import { FaUser } from 'react-icons/fa';

const AddClientModal = () => {
	const [clientData, setClientData] = useState({
		name: '',
		email: '',
		phone: '',
	});

	const { name, email, phone } = clientData;

	const onChangeHandler = e => {
		setClientData(prevState => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmitHandler = e => {
		e.preventDefault();
		console.log(name, email, phone);
	};

	return (
		<>
			<button
				type='button'
				className='btn btn-secondary'
				data-toggle='modal'
				data-target='#addClientModal'
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
								className='close'
								data-dismiss='modal'
								aria-label='Close'
							>
								<span aria-hidden='true'>&times;</span>
							</button>
						</div>
						<div className='modal-body'>
							<form onSubmit={onSubmitHandler}>
								<div className='mb-3'>
									<label className='form-label'>Name</label>
									<input
										type='text'
										className='form-control'
										name='name'
										id='name'
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
										id='email'
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
										id='phone'
										value={phone}
										onChange={onChangeHandler}
									/>
								</div>
								<button
									className='btn btn-secondary'
									type='submit'
									data-dismiss='modal'
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
