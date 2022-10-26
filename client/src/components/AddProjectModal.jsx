import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { FaList } from 'react-icons/fa';
import { ADD_PROJECT } from '../mutations/projectMutation';
import { GET_CLIENTS } from '../queries/clientQueries';
import { GET_PROJECTS } from '../queries/projectQueries';

const AddProjectModal = () => {
	const [projectData, setProjectData] = useState({
		name: '',
		description: '',
		clientId: '',
		status: 'new',
	});

	const { name, description, status, clientId } = projectData;

	const [addProject] = useMutation(ADD_PROJECT, {
		variables: { name, description, status, clientId },
		update(cache, { data: { addProject } }) {
			const { projects } = cache.readQuery({ query: GET_PROJECTS });
			cache.writeQuery({
				query: GET_PROJECTS,
				data: { projects: [...projects, addProject] },
			});
		},
	});

	// Get clients for select
	const { loading, error, data } = useQuery(GET_CLIENTS);

	const onChangeHandler = e => {
		setProjectData(prevState => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmitHandler = e => {
		e.preventDefault();

		if (!name || !description || !status) {
			return alert('Please fill in all fields');
		}

		addProject(name, description, status, clientId);

		setProjectData({
			name: '',
			description: '',
			status: 'new',
			clientId: '',
		});
	};

	if (loading) return null;
	if (error) return <p>Something Went Wrong</p>;

	return (
		<>
			{!loading && !error && (
				<>
					<button
						type='button'
						className='btn btn-secondary'
						data-bs-toggle='modal'
						data-bs-target='#addProjectModal'
					>
						<div className='d-flex align-items-center'>
							<FaList className='icon' />
							<div>New Project</div>
						</div>
					</button>

					<div
						className='modal fade'
						id='addProjectModal'
						role='dialog'
						aria-labelledby='addProjectModalLabel'
						aria-hidden='true'
					>
						<div className='modal-dialog' role='document'>
							<div className='modal-content'>
								<div className='modal-header'>
									<h5 className='modal-title' id='addProjectModalLabel'>
										New Project
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
											<label className='form-label'>Description</label>
											<textarea
												type='text'
												className='form-control'
												name='description'
												value={description}
												onChange={onChangeHandler}
											></textarea>
										</div>
										<div className='mb-3'>
											<label className='form-label'>Status</label>
											<select
												className='form-select'
												name='status'
												value={status}
												onChange={onChangeHandler}
											>
												<option value='new'>Not Started</option>
												<option value='progress'>In Progress</option>
												<option value='completed'>Completed</option>
											</select>
										</div>

										<div className='mb-3'>
											<label className='form-label'>Client</label>
											<select
												className='form-select'
												name='clientId'
												value={clientId}
												onChange={onChangeHandler}
											>
												<option value=''>Select Client</option>
												{data.clients.map(client => (
													<option key={client.id} value={client.id}>
														{client.name}
													</option>
												))}
											</select>
										</div>

										<button
											type='submit'
											data-bs-dismiss='modal'
											className='btn btn-primary'
										>
											Submit
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};
export default AddProjectModal;
