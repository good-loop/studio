//@ts-nocheck
import React, { FC } from 'react';

import Wizard, { WizardStage } from '../../../base/components/WizardProgressWidget';

const stages = [{ title: 'hello one!'}, { title: 'Hello two!' }];

const WizardProgress: FC = () => {
	return <>
		<Wizard stageNum={3} stages={stages} stagePath={['widget', 'stageWizard']}>
			<WizardStage title='Hello!'>
				<h3>This is the first stage!</h3>
			</WizardStage>
			<WizardStage title='Middle section'>
				<h3>And the second!</h3>
			</WizardStage>
			<WizardStage title='Thank you!'>
				<h3>Hurray! Finished!</h3>
			</WizardStage>
		</Wizard>
	</>;
};

export default WizardProgress;
