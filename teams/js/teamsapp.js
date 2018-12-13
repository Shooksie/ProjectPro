import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import qs from 'qs';
import _ from 'lodash'


axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';

function renderModal() {
  if (this.state.modalIsOpen) {
    return (
      <div className={this.getModalClass()} id='exampleModal' tabIndex="-1" role="dialog">
        <div className='modal-dialog modal-lg' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>Modal title</h5>
              <button onClick={() => this.closeModal()} type='button' className='close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className='modal-body'>

                <div className="form-group">
                  <label htmlFor="formGroupExampleInput">Example label</label>
                  <input type="text" value={this.state.team_name}
                         name={'team_name'}
                         className={"form-control"}
                         onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                  <label htmlFor="formGroupExampleInput">Example label</label>
                  <textarea value={this.state.description}
                            name={'description'}
                            className={"form-control"}
                            onChange={this.handleChange}/>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" value="Submit" className="btn btn-primary">Save changes</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}




class App extends React.Component {
  constructor() {
    super();

    this.state = {
      teams: [],
      team_name: '',
      id: undefined,
      description: '',

    };
    this.renderModal = renderModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.viewTeam = this.viewTeam.bind(this);
  }

  componentWillMount() {
    // const { setState } = this
    this.fetchTeams();
    console.log(this.state)
  }

  teamEndPoint() {
    axios.post(window.appUrls.updateTeam,
      qs.stringify(
        {
          id: ((this.state.id) ? this.state.id : undefined),
          team_name: this.state.team_name,
          team_description: this.state.description,
        })
    ).then((val) => {
      console.log(val);
      const temp = {};
      temp[val.data.team.id] = val.data.team;
      if (val.data.created) {
        const { teams } = this.state;
        console.log(temp);
        this.setState({teams: _.merge(teams, temp), modalIsOpen: false})
      } else {
        let tempTeam = _.cloneDeep(this.state.teams);
        tempTeam[val.id] = val;
        this.setState({teams: tempTeam, modalIsOpen: false})
      }
    }).catch(error => {
      console.log(error);
    });
  }

  viewTeam(teamObj) {
    this.setState({ team_name: teamObj.team_name, description: teamObj.description, id: teamObj.id})
  }

  handleSubmit(event) {
    console.log(event);
    this.teamEndPoint();
    event.preventDefault();
  }

  handleChange(event) {
    const obj = {},
      {name, value} = event.target;
    obj[name] = value;
    this.setState(obj);
    console.log(this.state);
  }

  getModalClass() {
    if (this.state.modalIsOpen) {
      return 'modal fade show d-block'
    }
    document.body.classList.remove('modal-open');
    return 'modal fade'
  }

  fetchTeams() {
    axios.get(window.appUrls.teams)
      .then((response) => {
        console.log(response.data);
        const teams =  _.keyBy(response.data, (o) => o.id);
        console.log(teams);
        this.setState({teams});
      }).catch((error) => {
      console.log(error);
    });
  }

  closeModal() {
    console.log('click');
    document.body.classList.remove('modal-open');
    this.setState({modalIsOpen: false});
  }

  openModal() {
    console.log('click');
    document.body.classList.remove('modal-open');
    this.setState({modalIsOpen: true});
  }

  renderTeamPage() {
    return (
      <div className={'col-12'}>
        <div className={'text-center border-bottom border-dark'}>
          <h2>{this.state.team_name}</h2>
        </div>
        <div className={'mt-3'}>
          <label className={'ml-3'}><u>Description:</u></label>
          <div className={'p-3 bg-white rounded'}>
            <span>{this.state.description}</span>
          </div>
        </div>
        <div className={'d-flex mt-3 align-items-stretch section-height'}>
          <div className={'col-6 border-right border-dark'}>
            <h6>Team Members</h6>
          </div>
          <div className={'col-6'}>
            <h6>Team Projects</h6>
          </div>
        </div>
      </div>
    )
  }
  //d-flex flex-colum
  onDragStart = (ev, val) => {
    console.log('dragstart:', val);
    ev.dataTransfer.setData('obj', JSON.stringify(val))
  };

  onDragOver = (ev) => {
    ev.preventDefault();
  };

  onDrop = (ev) => {
    console.log('dropping');
    let obj = JSON.parse(ev.dataTransfer.getData('obj'));
    console.log(obj);
    this.setState({
      team_name: obj.team_name,
      description: obj.description,
      id: obj.id
    })
  };

  renderTeam() {
    if (this.state.id) {
      return this.renderTeamPage()
    } else {
      return (
        <div className={'align-self-center text-center w-100'}>
          Select/drag team from the side to view the team
        </div>)
    }
  }

  renderBackDrop() {
    if (this.state.modalIsOpen) {
      return (<div className="modal-backdrop fade show" onClick={this.closeModal}/>)
    }
  }

  renderTeams() {
    return _.map(this.state.teams, (val) =>
      <div key={val.id} className='card mb-3'>
        <div className={'card-header d-flex'}
             draggable
             onDragStart={(e) => this.onDragStart(e, val)}>
          <div className={'col-10'}>
            <h3>{val.team_name}</h3>
          </div>
          <div className={'col-2'}>
            <button onClick={()=> {this.viewTeam(val)}} className={'btn btn-link'}>
              <i className={'fa fa-plus-circle'}/>
            </button>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className={'container-fluid'}>
        <div className={'text-right border-bottom border-dark'}>
          <button onClick={this.openModal} className={'btn btn-link'}>
            Create A new Team
          </button>
        </div>
        <div className={'team-widget mt-3 d-flex rounded'}>
          <div className={'pb-3 col-4 border-right border-dark y-scroll-bar'}>
            <div className={'pt-3 border-bottom border-dark sticky-title bg-white mb-3'}>
              <h4>Teams</h4>
            </div>
            {this.renderTeams()}
          </div>
          <div className={'col-8 bg-light rounded-right d-flex'}
               onDragOver={(e) => this.onDragOver(e)}
               onDrop={(e) => this.onDrop(e)}>
            {this.renderTeam()}
          </div>
        </div>
        {this.renderModal()}
        {this.renderBackDrop()}
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));