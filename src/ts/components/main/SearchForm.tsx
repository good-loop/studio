import React, { FC, useState } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

import DataStore from '../../../base/plumbing/DataStore';

const SearchForm: FC = () => {
	const [value, setValue] = useState('');
	const searchValue: any = DataStore.getValue(['misc', 'searchValue']) || '';

	const setSearchValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const newValue = e.target.value;
		setValue(newValue);
		DataStore.setValue(['misc', 'searchValue'], value, true);
	};

	return (
		<Form>
			<FormGroup>
				<Label>Search component:</Label>
				<Input
					type="text"
					name="search"
					placeholder="Type the component's name here..."
					value={value}
					onChange={setSearchValue}
				/>
			</FormGroup>
		</Form>
	);
};

export default SearchForm;
