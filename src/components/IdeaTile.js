import React, { Component } from 'react';
import styled from 'styled-components';

const Tile = styled.div`
  padding: 5px 10px;
  box-sizing: border-box;
    border-radius: 4px;
    width: 300px;
    height: 200px;
    margin: 20px;
    border: ${props => props.isEditing
        ? '3px solid lightblue;'
        : '1px solid lightgrey;'}
    box-shadow: ${props => props.isEditing
        ? '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);'
        : '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);'}
`

const DeleteIdeaIcon = styled.img`
  width: 15px;
  &:hover {
    cursor: pointer;
  }
`

class IdeaTile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.textAreaUpdate = this.textAreaUpdate.bind(this);
    this.titleUpdate = this.titleUpdate.bind(this);
  }

  // Use this lifecycle method rather than didMount so you can check updates from collaborators and only update if you need to
  componentDidMount() {
    let { _id, title, body, author, created_at } = this.props.idea;
    this.setState({ _id, title, body, author, created_at });
  }


  titleUpdate(e) {
    this.setState({ title: e.target.value });
  }

  textAreaUpdate(e) {
    this.setState({ body: e.target.value });
  }

  render() {
    const { idea, deleteIdea, isEditing, setEditableId, updateIdea } = this.props;
    return (
      <div>
        {
          !isEditing
            ? (
              <Tile onClick={() => setEditableId(idea._id)} isEditing={isEditing}>
                <h4>{idea.title}</h4>
                <div><p>{idea.body}</p></div>
                <div><p>Posted by {idea.author} on {idea.created_at}</p></div>
                {/* TODO. There is a flicker of the editable view when you click this delete button. Resolve. */}
                <DeleteIdeaIcon onClick={() => deleteIdea(idea._id)} src="/img/delete.svg" alt="Delete this idea"/>
              </Tile>
            )
            : (
              <Tile isEditing={isEditing}>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    updateIdea(this.state)
                  }
                }>
                  <h4>
                    <input
                      type="text"
                      value={this.state.title}
                      onChange={this.titleUpdate}
                    />
                  </h4>
                  <div>
                    <input
                      type="text"
                      value={this.state.body}
                      onChange={this.textAreaUpdate}
                      maxLength="140"
                    />
                  </div>
                  <div><p>Originally posted by {this.state.author} on {this.state.created_at}</p></div>
                  <button>Save</button>
                </form>
                <button onClick={() => setEditableId(null)}>Close</button>
              </Tile>
            )
        }
      </div>
    )
  }
}

export default IdeaTile;
