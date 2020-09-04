import React from 'react';
import List from './pages/List/index';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

export default function Routes() { 
    return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={List} />
                </Switch>
            </BrowserRouter>
        );
}