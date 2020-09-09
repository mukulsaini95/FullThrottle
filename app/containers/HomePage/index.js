/**
 *
 * HomePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import * as ACTIONS from "./actions";
import * as SELECTIONS from "./selectors";

export class HomePage extends React.Component {
  state = {
    users: [],
    isFetching: true,
    selectedUser: {}
  }
  componentWillMount() {
    this.props.getUsers()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.users && nextProps.users !== this.props.users) {
      this.setState({
        users: nextProps.users,
        isFetching: false
      })
    }

  }

  onClickHandler = (selectedUser) => {
    $('#myModal').modal('toggle');
    this.setState({
      selectedUser
    })
  }



  render() {
    let users = [
      {
        "title": "dsfsdf",
        "status": "Planned",
        "timestamp": "2020-09-02T20:16:19.848Z",
        "id": "a4062c1d-15ee-40ee-bfeb-99f3f601259d"
      }
    ]

    return (
      <div className="devContainer">
        <div className="container">
          <div className="list">
            {this.state.isFetching ?
              <div>Loading</div>
              : <ul className="todo" >
                {this.state.users.length ? this.state.users.map(item => <li key={item.id} onClick={() => this.onClickHandler(item)}>
                  <span className="deleteIcon">
                    <i className="fa fa-calendar text-yellow" aria-hidden="true"></i>
                  </span>
                  {item.real_name} ({item.tz})
                </li>)
                  :
                  <li>
                    <p>
                      No Data Found!
                   </p>
                  </li>
                }

              </ul>
            }

          </div>
          <div id="myModal" class="modal fade" role="dialog">
            <div class="modal-dialog">

              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                  <h4 class="modal-title">Activity Periods for {this.state.selectedUser.real_name} ({this.state.selectedUser.tz})</h4>
                </div>
                <div class="modal-body modalCss" >
                  <ul className="todo" >
                    {this.state.selectedUser.activity_periods && this.state.selectedUser.activity_periods.length ? this.state.selectedUser.activity_periods.map(item => <li key={item.id} onClick={() => this.onClickHandler(item)}>
                      <span className="deleteIcon">
                        <i className="fa fa-calendar text-yellow" aria-hidden="true"></i>
                      </span>
                      {item.start_time} - {item.end_time}
                    </li>)
                      :
                      <li>
                        <p>
                          No Data Found!
                   </p>
                      </li>
                    }

                  </ul>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  users: SELECTIONS.usersSuccess(),
  usersFailure: SELECTIONS.usersFailure(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getUsers: () => dispatch(ACTIONS.getUsers()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'homePage', reducer });
const withSaga = injectSaga({ key: 'homePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);