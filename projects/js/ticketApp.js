import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import qs from 'qs';
import {Markdown} from 'markdown'
import {FilterBar} from 'filterbar';

import LiveMarkedArea from './markdowntest'

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)


axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';

class Filters extends React.Component {
  render() {
    return (
      <div className='col-3'>
        <div className='card'>
          <input/>
        </div>
      </div>
    )
  }
}

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      tickets: [],
      ticketsDisplay: [],
      name: '',
      description: '',
      priority: undefined,
      index: undefined,
      id: '',
      selectedKeyChoices: {}
    };
    this.childState = {description: '', previewValue: ''};
    this.ticketMetaData = {};
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.updatePriority = this.updatePriority.bind(this);
    this.updateTicket = this.updateTicket.bind(this);
    this.createNewTicket = this.createNewTicket.bind(this);
    this.getDescription = this.getDescription.bind(this);
    this.setTicketMetaData = this.setTicketMetaData.bind(this);
    this.filterCallBack = this.filterCallBack.bind(this);
  }


  afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  setTicketMetaData(meta) {
    console.log(meta);
    this.ticketMetaData = meta;
  }

  openModal() {
    document.body.classList.add('modal-open');
    this.setState({modalIsOpen: true});
  }

  filterCallBack(dict, selected) {
    this.setState({ticketsDisplay: dict, selectedKeyChoices: selected})
  }

  closeModal() {
    console.log('click');
    document.body.classList.remove('modal-open');
    this.setState({modalIsOpen: false});
  }

  componentWillMount() {
    // const { setState } = this
    this.fetchTicketsMeta();
    console.log(this.ticketMetaData);
    this.fetchTickets();
  }

  fetchTickets() {
    axios.get(window.appUrls.ticket)
      .then((response) => {
        this.setState({tickets: response.data, ticketsDisplay: response.data});
      }).catch((error) => {
      console.log(error);
    });
  }

  fetchTicketsMeta() {
    axios.get(window.appUrls.ticketMeta)
      .then((response) => {
        this.setTicketMetaData({
          ticket_states: response.data.ticket_states,
          ticket_state_paths: response.data.ticket_state_paths,
          ticket_priorities: response.data.ticket_priorities
        });
      }).catch((error) => {
      console.log(error);
    });
  }

  ticketEditClick({name, description, priority, id, status}, index) {
    document.body.classList.add('modal-open');
    this.setState({name, priority, description, id, status, modalIsOpen: true});
  }

  getModalClass() {
    if (this.state.modalIsOpen) {
      return 'modal fade show d-block'
    }
    document.body.classList.remove('modal-open');
    return 'modal fade'
  }

  updateDescription(modifiedDescription, markupDescription) {
    this.childState = {description: modifiedDescription, previewValue: markupDescription};
    console.log(this.childState);
  }

  updateName(event) {
    this.setState({name: event.target.value});
  }


  updatePriority(event) {
    this.setState({priority: event.target.value});
  }

  updateTicket() {
    const {id, name, priority, tickets, ticketsDisplay, status} = this.state;
    const {description} = this.childState;
    console.log({id: id, ticket_name: name, ticket_description: description, ticket_priority: Number(priority)});
    axios.post(window.appUrls.updateTicket,
      qs.stringify({
        id: id,
        ticket_name: name,
        ticket_description: description,
        ticket_priority: Number(priority),
        ticket_state: Number(status)
      })
    ).then(value => {
      console.log(value);
      if (value.data.created) {
        document.body.classList.remove('modal-open');
        const {name, description, status, priority} = value.data.ticket;
        console.log(status);
        this.setState({
          tickets: tickets.concat({
            name: name, description: description, status: Number(status), priority: priority
          }),
          ticketsDisplay: ticketsDisplay.concat({
            name: name, description: description, status: Number(status), priority: priority
          }),
          modalIsOpen: modalIsOpen,
        });

      } else {
        document.body.classList.remove('modal-open');
        this.setState({modalIsOpen: false, description: this.childState.description});
      }
      this.fetchTickets();
    }).catch(error => {
      console.log(error);
    })
  }

  createNewTicket() {
    document.body.classList.add('modal-open');
    this.setState({name: '', description: '', priority: 1, id: undefined, modalIsOpen: true})
  }

  getTicketClass = (ticket) => {
    let value = '';

    switch (ticket.priority) {
      case 1:
        value = 'bd-callout-priority-low';
        break;
      case 2:
        value = 'bd-callout-priority-medium';
        break;
      case 3:
        value = 'bd-callout-priority-high';
        break;
      case 4:
        value = 'bd-callout-priority-extreme';
        break;
      default:
        value = 'bd-callout-prioirty-low';
        break;
    }
    return `bd-callout ${value} bg-white row mx-1 mt-4`
  };

  renderTickets() {
    const tasks = {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
      10: []
    };

    const keys = ['status', 'priority'];
    const keydisplays = {
      status: this.ticketMetaData.ticket_states,
      priority: this.ticketMetaData.ticket_priorities
    };

    this.state.ticketsDisplay.forEach((t) => {
      tasks[t.status].push(
        <div className={this.getTicketClass(t)}
             draggable
             onDragStart={(e) => this.onDragStart(e, t.id)}
             key={t.id}>
          <div className='card-body'>
            <div className='row'>
              {t.name}
            </div>
            <div className='row'>
              <button onClick={() => this.ticketEditClick(t, t.id)}
                      className='btn btn-link p-0'>View/Edit
              </button>
            </div>
          </div>
        </div>);
    });

    if (this.state.tickets.length) {
      return (
        <div className='card'>
          <div className='card-header py-0'>
            <h2 className="header">Tickets Management</h2>
          </div>
          <FilterBar keys={keys} data={this.state.tickets}
                     selected={this.state.selectedKeyChoices}
                     displaydata={keydisplays}
                     callback={this.filterCallBack}/>
          <div className='card-body d-flex' style={{overflowY: 'auto'}}>
            <div className="wip col-4 col-xl-2 border border-dark rounded-left"
                 onDragOver={(e) => this.onDragOver(e)}
                 onDrop={(e) => {
                   this.onDrop(e, 8)
                 }}>
              <div className="text-center">Blocked</div>
              {tasks[8]}
            </div>
            <div className="wip col-4 col-xl-2 border border-dark pb-4"
                 onDragOver={(e) => this.onDragOver(e)}
                 onDrop={(e) => {
                   this.onDrop(e, 1)
                 }}>
              <div className="text-center">Open</div>
              {tasks[1]}
            </div>
            <div className="droppable col-4 col-xl-2 border border-dark pb-4"
                 onDragOver={(e) => this.onDragOver(e)}
                 onDrop={(e) => this.onDrop(e, 2)}>
              <div className="text-center">In progress</div>
              {tasks[2]}
            </div>
            <div className="droppable col-4 col-xl-2 border border-dark pb-4"
                 onDragOver={(e) => this.onDragOver(e)}
                 onDrop={(e) => this.onDrop(e, 3)}>
              <div className="text-center">In Review</div>
              {tasks[3]}
            </div>
            <div className="droppable col-4 col-xl-2 border border-dark pb-4"
                 onDragOver={(e) => this.onDragOver(e)}
                 onDrop={(e) => this.onDrop(e, 4)}>
              <div className="text-center">Review Done</div>
              {tasks[4]}
            </div>
            <div className="droppable col-4 col-xl-2 border border-dark pb-4"
                 onDragOver={(e) => this.onDragOver(e)}
                 onDrop={(e) => this.onDrop(e, 5)}>
              <div className="text-center">In Testing</div>
              {tasks[5]}
            </div>
            <div className="droppable col-4 col-xl-2 border border-dark pb-4"
                 onDragOver={(e) => this.onDragOver(e)}
                 onDrop={(e) => this.onDrop(e, 6)}>
              <div className="text-center">Testing Done</div>
              {tasks[6]}
            </div>
            <div className="droppable col-4 col-xl-2 border border-dark pb-4"
                 onDragOver={(e) => this.onDragOver(e)}
                 onDrop={(e) => this.onDrop(e, 7)}>
              <div className="text-center">Testing Issues</div>
              {tasks[7]}
            </div>
            <div className="droppable col-4 col-xl-2 border border-dark pb-4"
                 onDragOver={(e) => this.onDragOver(e)}
                 onDrop={(e) => this.onDrop(e, 9)}>
              <div className="text-center">Release Ready</div>
              {tasks[9]}
            </div>
            <div className="droppable col-4 col-xl-2 border border-dark pb-4"
                 onDragOver={(e) => this.onDragOver(e)}
                 onDrop={(e) => this.onDrop(e, 10)}>
              <div className="text-center">Released</div>
              {tasks[10]}
            </div>
          </div>
        </div>
      );
    }
  }

  //d-flex flex-colum
  onDragStart = (ev, id) => {
    console.log('dragstart:', id);
    ev.dataTransfer.setData('id', id)
  };

  onDragOver = (ev) => {
    ev.preventDefault();
  };

  onDrop = (ev, status) => {
    let id = ev.dataTransfer.getData('id');
    console.log(id);
    let tickets = this.state.tickets.filter((task) => {
      if (task.id === Number(id)) {
        console.log(task);
        task.status = Number(status);
        axios.post(window.appUrls.updateTicket,
          qs.stringify(
            {
              id: task.id,
              ticket_name: task.name,
              ticket_description: task.description,
              ticket_priority: task.priority,
              ticket_state: task.status,
            })
        ).then((val) => {
          console.log(val)
        }).catch(error => {
          console.log(error);
        });
      }

      return task
    });

    this.setState({
      ...this.state,
      tickets
    })
  };

  getDescription() {
    return this.state.description;
  }

  renderBackDrop() {
    if (this.state.modalIsOpen) {
      return (<div className="modal-backdrop fade show" onClick={this.closeModal}/>)
    }
  }

  getStatusOptions(currentStatus) {
    console.log(this.ticketMetaData);
    const options = [(<option value={currentStatus}>{this.ticketMetaData.ticket_states[currentStatus]}</option>)]
    this.ticketMetaData.ticket_state_paths[currentStatus].forEach((status) => {
      console.log(this.ticketMetaData.ticket_states[status]);
      options.push(
        <option value={status}>
          Hello
        </option>)
    });

    return options;

  }

  renderModal() {
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
              <div className='modal-body'>
                <div className='form-group mb-3'>
                  <label htmlFor="formGroupExampleInput">Title:</label>
                  <input type='text' className='form-control'
                         value={this.state.name}
                         onChange={this.updateName}/>
                </div>
                <div className='form-group mb-3'>
                  <label htmlFor="formGroupExampleInput">Status:</label>
                  <select className={'form-control mb-3'}
                          value={this.state.priority}
                          onChange={this.updatePriority}>
                    {this.getStatusOptions(this.state.status)}
                  </select>
                </div>
                <div className='form-group mb-3'>
                  <label htmlFor="formGroupExampleInput">Priority:</label>
                  <select className={'form-control mb-3'}
                          value={this.state.priority}
                          onChange={this.updatePriority}>
                    <option value='1'>Low Priority</option>
                    <option value='2'>Medium Priority</option>
                    <option value='3'>High Priority</option>
                    <option value='4'>Extreme Priority</option>
                  </select>
                </div>
                <div className='form-group mb-3'>
                  <label htmlFor="formGroupExampleInput">Description:</label>
                  <Markdown onChange={this.updateDescription}
                            value={this.state.description}
                            className='form-control'
                            style={{resize: 'none'}}/>
                </div>
              </div>
              <div className='modal-footer'>
                <button type='button'
                        className='btn btn-secondary'
                        data-dismiss='modal'>Close
                </button>
                <button type='button'
                        className='btn btn-primary'
                        onClick={this.updateTicket}>Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <div className='row align-right'>
          <div className='col-12'>
            <button className='btn btn-link float-right' onClick={this.createNewTicket}>Create New Ticket</button>
          </div>
        </div>
        {this.renderTickets()}
        {this.renderModal()}
        {this.renderBackDrop()}
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));