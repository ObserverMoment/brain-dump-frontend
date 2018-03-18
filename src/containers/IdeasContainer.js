import React, { Component } from 'react';
import IdeasDisplayPanel from '../components/IdeasDisplayPanel';
import styled from 'styled-components';

const Loading = styled.img`
  width: 100px;
`

let APIBase = 'http://localhost:8000/ideas/'; // TODO Remove to config file.
let allIdeas = 'all';
let addBlankIdea = 'create';

class IdeasContainer extends Component {
  // IdeasBoard will manage the state that determines which ideas are displayed.
  constructor() {
    super();
    this.state = {
      isLoading: true,
      textSearch: "",
      sortTitle: "Sort by...",
      sortValue: "",
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
        let updatedIdeasArray = [ ...this.state.ideasArray, newBlankIdea ];
        this.setState({ ideasArray: updatedIdeasArray });
      })
      .catch(err => console.log(err));
  }

  deleteIdea(id) {
    fetch(APIBase + id, {method: 'delete'})
      .then(res => res.json())
      .then(deletedId => {
        let updatedIdeasArray = this.state.ideasArray.filter(idea => idea._id !== deletedId);
        this.setState({ ideasArray: updatedIdeasArray })
      })
      .catch(err => console.log(err));
  }

  render() {
    const { ideasArray, isLoading } = this.state;
    return (
      <div>
        <h3>Ideas Display Panel</h3>
        <div>
          {this.createSortDropdown()}
        </div>
        <div>
          <input type="text" placeholder="Text Search" value={this.state.textSerch} onChange={this.handleSearch}/>
        </div>
        {isLoading
          ? <Loading src="/img/loading.svg" alt="Loading your ideas" />
          : ideasArray
              ? <IdeasDisplayPanel deleteIdea={this.deleteIdea} addBlankIdea={this.addBlankIdea} ideasArray={this.displayIdeasArray()} />
              : <span>Oops, there are no ideas..</span>
        }
      </div>
    )
  }
}

export default IdeasContainer;
