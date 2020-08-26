
import React, { useState } from 'react';
import {Card, CardTitle } from 'reactstrap';

/**
 * A Card for use inside a larger Card
 */
const SubCard = ({title,children}) => <Card body><CardTitle><h4>{title}></h4></CardTitle>{children</Card>;

export default SubCard;
 