import React, { FC } from 'react';
import { Form, FormGroup, Input, Label } from 'reactstrap';


const FilterControl: FC = () => {
	return (
		<Form>
			<FormGroup>
				<Label>Select project: </Label>
				<Input type="select" name="filterControl" className="filter-control" defaultValue="all">
					<option value="all">all</option>
				</Input>
			</FormGroup>
		</Form>
	);
};

export default FilterControl;
