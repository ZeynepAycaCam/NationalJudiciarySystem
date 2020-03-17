import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';

import '@/css/app.css';

import Home from '@/components/pages/home';
import Login from '@/components/pages/login';
import Register from '@/components/pages/register';
import Error from '@/components/pages/error';
import HireLawyer from '@/components/pages/citizen/hireLawyer';
import Payment from '@/components/pages/citizen/payment';
import FileLawsuit from '@/components/pages/fileLawsuit';
import DisplayLawsuit from '@/components/pages/displayLawsuits';
import DetailLawsuit from '@/components/pages/detailLawsuit';
import EditLawsuit from '@/components/pages/judge/editLawsuit';
import DetailTrial from '@/components/pages/detailTrial';
import Reconciliation from '@/components/pages/conciliator/reconciliation';
import Report from '@/components/pages/report';


const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/hireLawyer" component={HireLawyer} />
    <Route exact path="/fileLawsuit" component={FileLawsuit} />
    <Route exact path="/displayLawsuits" component={DisplayLawsuit} />
    <Route exact path="/detailLawsuit/:lawsuitID" component={DetailLawsuit} />
    <Route exact path="/detailLawsuit/:lawsuitID/edit" component={EditLawsuit} />
    <Route exact path="/detailLawsuit/:lawsuitID/trial/:trialNumber" component={DetailTrial} />
    <Route exact path="/payment" component={Payment} />
    <Route exact path="/reconciliation" component={Reconciliation} />
    <Route exact path="/report" component={Report} />
    <Route exact path="/*" component={Error} />
  </Switch>
);

export default App;
