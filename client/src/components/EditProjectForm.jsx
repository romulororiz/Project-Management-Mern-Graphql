import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { UPDATE_PROJECT } from '../mutations/projectMutation';
import { GET_PROJECT } from '../queries/projectQueries';

const EditProjectForm = ({ project }) => {
	const [projectData, setProjectData] = useState({
		name: project.name,
		description: project.description,
		status: 'new',
	});

	const { name, description, status } = projectData;

	const [updateProject] = useMutation(UPDATE_PROJECT, {
		variables: { id: project.id, name, description, status },
		refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
	});

	const onChangeHandler = e => {
		setProjectData(prevState => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmitHandler = e => {
		e.preventDefault();

		if (!name || !description || !status) {
			return alert('Please fill in all the fields');
		}

		updateProject(name, description, status);
	};

	return (
		<div className='mt-5'>
			<h3>Update Project Details</h3>
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

				<button type='submit' className='btn btn-primary'>
					Submit
				</button>
			</form>
		</div>
	);
};
export default EditProjectForm;
