import React, { useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
//Components
import TechSelectOptions from '../techs/TechSelectOptions';
// For redux
import { connect } from 'react-redux';
// For props
import PropTypes from 'prop-types';
// Actions
import { addLog } from '../../actions/logActions';

const AddLogModal = ({ addLog }) => {
  const [message, setMessage] = useState('');
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState('');

  const onSubmit = () => {
    if (message === '' || tech === '') {
      M.toast({ html: 'Please enter a message and select a tech' }); // Toast
    } else {
      console.log(`Submitted`);

      // Add to DB (push to addLog())
      addLog({
        message,
        attention,
        tech,
        date: new Date()
      });

      M.toast({
        html: `Log added by ${tech}`
      });
      // Clear the fields
      setMessage('');
      setTech('');
      setAttention(false);
    }
  };

  return (
    // Modal
    <div id="add-log-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Enter System Log</h4>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="message"
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
            <label htmlFor="message" className="active">
              Log Message
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <select
              name="tech"
              value={tech}
              className="browser-default"
              onChange={e => setTech(e.target.value)}
            >
              <option value="" disabled>
                Select Technician
              </option>
              <TechSelectOptions />
            </select>
          </div>
        </div>
        <div className="input-field">
          <p>
            <label>
              <input
                type="checkbox"
                className="filled-in"
                checked={attention}
                value={attention}
                onChange={e => setAttention(!attention)}
              />
              <span>Needs Attention</span>
            </label>
          </p>
        </div>
      </div>
      <div className="modal-footer">
        <a
          href="#!"
          onClick={onSubmit}
          className="modal-close waves-effect waves-green waves-light btn blue"
        >
          Enter
        </a>
      </div>
    </div>
  );
};

const modalStyle = {
  width: '75%',
  height: '75%'
};

AddLogModal.propTypes = {
  addLog: PropTypes.func.isRequired
};

// since we are not bringing in any state we pull null
export default connect(null, { addLog })(AddLogModal);
