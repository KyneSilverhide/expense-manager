import React from 'react';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import TeamsList from '../../containers/teams/TeamsList.js';

const Teams = () => (
  <div className="Teams">
    <div className="page-header clearfix">
      <h4 className="pull-left">Equipes</h4>
      <Link to="/teams/new">
        <button bsStyle="success" className="pull-right"><FontAwesome name='plus'/> Ajouter une équipe</button>
      </Link>
    </div>
    <TeamsList />
  </div>
);

export default Teams;
