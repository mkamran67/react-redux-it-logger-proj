import React, { useEffect } from 'react';
import LogItem from './LogItem';
import Preloader from '../layout/Preloader';
import PropTypes from 'prop-types';

// To use root actions we have to bring them in and we must include it in the export with connect as an option of actions SEE BELOEW
// Actions we bring in count as props now so you must destructure it
import { getLogs } from '../../actions/logActions';

// When you want to interact wit hredux from your component you need to bring in connect, connect exports a high lvl method
import { connect } from 'react-redux';

// since we are bringing in log as a prop via connect we are destructuring it here. We could destructure it in mapToState function below
const Logs = ({ log: { logs, loading }, getLogs }) => {
  // to call the function once
  useEffect(() => {
    getLogs();

    // eslint-disable-next-line
  }, []);

  if (loading || logs === null) {
    return <Preloader />;
  }
  return (
    <ul className="collection with-header">
      <li className="collection-header" key="head">
        <h4 className="center">System Logs</h4>
      </li>
      {!loading && logs.length === 0 ? (
        <p className="center">No logs to show...</p>
      ) : (
        logs.map(log => <LogItem log={log} key={log.id} />)
      )}
    </ul>
  );
};

// proptypes for log
Logs.propTypes = {
  log: PropTypes.object.isRequired,
  getLogs: PropTypes.func.isRequired
};

// Takes 2 things, 1 maps state to prop
// IF yo uwant to bring anything to your component from your app level state you have to bring it as a prop.
// This function takes in a state and set an obj
// "newStateName" : state."the state you're getting from your root reducer"
const mapStateToProps = state => ({
  log: state.log
});

// Another possibility for bringing in logs and loading without needing to destructure it at the top
// const mapStateToProps = state => ({
//    logs: state.log.logs,
//    loading: state.log.loading
// });

// with connect you have to export this as a high level method
export default connect(mapStateToProps, { getLogs })(Logs);
