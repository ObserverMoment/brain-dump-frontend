import React, { Component } from 'react';
import IdeasDisplayPanel from '../components/IdeasDisplayPanel';
import styled from 'styled-components';

// TODO Remove to config file.
// To access heroku variables you need to set up the following from
// https://github.com/mars/create-react-app-buildpack#user-content-environment-variables
import runtimeEnv from '@mars/heroku-js-runtime-env';
const env = runtimeEnv();

// Then you can access config vars using the REACT_APP_ prefix.
let APIBase = env.REACT_APP_API_URL + 'ideas/' || 'http://localhost:8000/ideas/';
let allIdeas = 'all';
let addBlankIdea = 'create';
console.log(APIBase);

const Loading = styled.img`
  width: 100px;
`

class IdeasContainer extends Component {
  // IdeasBoard will manage the state that determines which ideas are displayed.
  // TODO. Move sortOptions to a config file. Add props to constructor.
  constructor() {
    super();
    this.state = {
      isLoading: true,
      textSearch: "",
      sortTitle: "Sort by...",
      sortValue: "",
      editingId: null,
      sortOptions: [
        {
          name: 'Date',
          value: 'created_at'
        },
        {
          name: 'Title',
          value: 'title'
        },
        {
          name: 'Author',
          value: 'author'
        }
      ],
      // Pull data in from database on mount.
      ideasArray: null
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.createSortDropdown = this.createSortDropdown.bind(this);
    this.compareIdeas = this.compareIdeas.bind(this);
    this.displayIdeasArray = this.displayIdeasArray.bind(this);
    this.addBlankIdea = this.addBlankIdea.bind(this);
    this.deleteIdea = this.deleteIdea.bind(this);
    this.updateIdea = this.updateIdea.bind(this);
    this.setEditableId = this.setEditableId.bind(this);
  }

  componentDidMount() {
    this.fetchAllIdeas();
  }

  fetchAllIdeas() {
    fetch(APIBase + allIdeas).then(r => r.json())
      .then(ideas => {
        this.setState({ ideasArray: ideas, isLoading: false });
      })
      .catch(e => console.log("Sorry, there was a problem retrieving your ideas"))
  }

  handleSearch(e) {
    this.setState({ textSearch: e.target.value })
  }

  handleSort(e) {
    this.setState({ sortValue: e.target.value })
  }

  createSortDropdown() {
    return (
      <select key={this.sortTitle} onChange={this.handleSort}>
        {this.state.sortOptions.map(option => {
            return <option key={option.name} value={option.value}>{option.name}</option>
        })}
      </select>
    )
  }

  // TODO. Move to utils.js
  compareIdeas(a, b) {
    const { sortValue } = this.state;
    if (sortValue === 'created_at') {
      return a[sortValue] - b[sortValue];
    }
    if (sortValue === "title" || sortValue === "author") {
      return a[sortValue].localeCompare(b[sortValue]);
    }
  }

  displayIdeasArray() {
    const { sortValue, textSearch, ideasArray } = this.state;
    if (ideasArray) { // make sure an array exists.
      let filteredArray = ideasArray
        .filter(idea => {
          let searchQuery = new RegExp(textSearch, "i");
          return idea.title.search(searchQuery) > -1
          || idea.body.search(searchQuery) > -1
          || idea.author.search(searchQuery) > -1
        })

      let sortedArray = sortValue
          ? filteredArray.sort((a,b) => this.compareIdeas(a,b))
          : filteredArray;

      return sortedArray;
    }

  }

  // Being called from IdeasDisplayPanel.js.
  addBlankIdea() {
    // Create a blank idea object data.
    let blankIdea = {
      title: "Enter your title",
      body: "Enter your idea",
      author: "Mr Default"
    }
    // Make a post request to the API to add a new empty idea to the database.
    // Once confirmed update the state to allow re-render
    fetch(APIBase + addBlankIdea, {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(blankIdea)
    }).then(res => res.json())
      .then(newBlankIdea => {
        console.log(newBlankIdea);
        // Use the data base as the single point of truth rather than trying to merge the newly updated idea into the previous state.
        this.fetchAllIdeas();
      })
      .catch(err => console.log(err));
  }

  // Being called from IdeaTile.js.
  updateIdea(updateIdeaData) {
    // TODO. Before doing any updating just compare the current
    // Just to make it clear that state from IdeaTile is not guaranteed to be in the corret format.
    let newIdeaData = { ...updateIdeaData };
    fetch(APIBase + newIdeaData._id, {
      method: 'PUT', // or 'PUT'
      body: JSON.stringify(newIdeaData),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(response => {
        if (response.status === 200) {
          // Use the data base as the single point of truth rather than trying to merge the newly updated idea into the previous state.
          this.fetchAllIdeas();
          // So as to come out of edit mode to notify user that update has taken place.
          this.setEditableId(null);
        }
      }) // TODO. Display success message.
      .catch(error => console.error('Error:', error));

    }

  // Being called from IdeaTile.js.
  deleteIdea(id) {
    fetch(APIBase + id, {method: 'delete'})
      .then(res => res.json())
      .then(deletedId => {
        console.log(deletedId);
        // Use the data base as the single point of truth rather than trying to merge the newly updated idea into the previous state.
        this.fetchAllIdeas();
      })
      .catch(err => console.log(err));
  }

  setEditableId(newEditableId) {
    this.setState({ editingId: newEditableId });
  }

  render() {
    const { ideasArray, isLoading, editingId } = this.state;
    return (
      <div>
        <h3>Ideas Display Panel</h3>
        <div style={{display: 'flex'}}>
          <div style={{width: '350px', margin: '0, 20px'}}>
            {this.createSortDropdown()}
          </div>
          <div style={{width: '350px', margin: '0, 20px'}}>
            <input type="text" placeholder="Text Search" value={this.state.textSerch} onChange={this.handleSearch}/>
          </div>
        </div>
        {isLoading
          ? <Loading src="/img/loading.svg" alt="Loading your ideas" />
          : ideasArray
              ? <IdeasDisplayPanel
                  deleteIdea={this.deleteIdea}
                  addBlankIdea={this.addBlankIdea}
                  ideasArray={this.displayIdeasArray()}
                  editingId={editingId}
                  setEditableId={this.setEditableId}
                  updateIdea={this.updateIdea}
                />
              : <span>Oops, there are no ideas..</span>
        }
      </div>
    )
  }
}

export default IdeasContainer;
