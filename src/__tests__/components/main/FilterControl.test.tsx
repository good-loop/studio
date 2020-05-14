// import React from 'react';
const React = require('react');
// import { render, cleanup } from '@testing-library/react';
const { render, cleanup } = require('@testing-library/react');

// import SearchForm from '../../../ts/components/main/SearchForm';
const SearchForm = require('../../../ts/components/main/SearchForm');

describe('Tests for FilterControl', () => {
	it('should render component with "search" form value', async () => {
		const { findByTestId } = render(<SearchForm />);

		const searchForm = await findByTestId("search-form");

		expect(searchForm).toHaveFormValues({
			search: ""
		});
	});
});
