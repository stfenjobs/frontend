import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import Loading from '../components/Loading';
import NotFound from '../components/NotFound';
import Login from './Login';
import Register from './Register';

const Explore = lazy(() => import('./Explore'));
const Query = lazy(() => import('./Query'));
const PaperDetail = lazy(() => import('./PaperDetail'));
const ExpertDetail = lazy(() => import('./ExpertDetail'));

export default () => (
    <Suspense fallback={<Loading />}>
        <Switch>
            <Route exact path='/' component={Explore} />
            <Route exact path='/search' component={Query} />
            <Route exact path='/papers/:paperId' component={PaperDetail} />
            <Route exact path='/experts/:expertId' component={ExpertDetail} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route component={NotFound} />
        </Switch>
    </Suspense>
);
