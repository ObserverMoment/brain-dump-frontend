import React, { Component } from 'react';
import styled from 'styled-components';
import { BasicButton } from '../customStyledComponents';
import { fadeIn } from '../animations';

const Tile = styled.div`
  animation: ${fadeIn} 1000ms;
  text-align: center;
  padding: 5px 10px;
  box-sizing: border-box;
  border-radius: 4px;
  width: 350px;
  min-height: 180px;
  margin: 10px;
  border: ${props => props.isEditing
        ? '3px solid lightblue;'
        : '1px solid lightgrey;'}
    box-shadow: ${props => props.isEditing
        ? '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);'
        : '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);'}
`

const DeleteIdeaIcon = styled.img`
  animation: ${fadeIn} 1000ms;
  position: absolute;
  top: 27px;
  right: 27px;
  width: 14px;
  &:hover {
    cursor: pointer;
  }
`

const SaveButton = styled(BasicButton)`
  background-color: #53be84;
  color: #ecf0f1;
  margin: 2px auto 4px auto;
  padding: 4px 8px;
  &:hover {
    background-color: #16b134;
  }
`

const CloseButton = styled(BasicButton)`
  background-color: #b02020;
  color: #ecf0f1;
  margin: 4px auto 2px auto;
  padding: 4px 8px;
  &:hover {
    background-color: #dd4141;
  }
`

export const IdeaTileInput = styled.input`
  padding: 6px 6px 6px 6px;
  display: block;
  width: 80%;
  border:none;
  border-bottom: 2px solid rgba(46, 178, 191, 0.3);
  margin: 5px;
`

// ######### Class Definition ######### //
class IdeaTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDelete: false
    };
    this.textAreaUpdate = this.textAreaUpdate.bind(this);
    this.titleUpdate = this.titleUpdate.bind(this);
  }

  // Use this lifecycle method rather than didMount so you can check updates from collaborators and only update if you need to
  componentDidMount() {
    let { _id, title, body, author, created_at } = this.props.idea;
    let isEditing = this.props.isEditing;
    this.setState({ _id, title, body, author, created_at });
    if (isEditing && this.nameInput) {
      this.nameInput.focus();
    };
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
      <div
        style={{position: 'relative'}}
        onMouseEnter={() => this.setState({ showDelete: true })}
        onMouseLeave={() => this.setState({ showDelete: false })}
      >
        {
          !isEditing
            ? (
              <Tile
                onClick={() => setEditableId(idea._id) }
                isEditing={isEditing}
                >
                <h4>{idea.title}</h4>
                <div><p>{idea.body}</p></div>
                <div><p>Posted by {idea.author} on {idea.created_at}</p></div>
                {/* TODO. There is a flicker of the editable view when you click this delete button. Resolve. */}
                { this.state.showDelete && (
                  <DeleteIdeaIcon
                    onClick={() => deleteIdea(idea._id)}
                    src="/img/delete.svg"
                    alt="Delete this idea"
                  />
                  )
                }
              </Tile>
            )
            : (
              <Tile
                isEditing={isEditing}
              >
                <form onSubmit={(e) => {
                    e.preventDefault();
                    updateIdea(this.state)
                  }
                }>
                  <h4>
                    <IdeaTileInput
                      innerRef={(IdeaTileInput) => this.nameInput = IdeaTileInput }
                      type="text"
                      value={this.state.title}
                      onChange={this.titleUpdate}
                    />
                  </h4>
                  <div>
                    <IdeaTileInput
                      type="text"
                      value={this.state.body}
                      onChange={this.textAreaUpdate}
                      maxLength="140"
                    />
                  </div>
                  <div><p>Originally posted by {this.state.author} on {this.state.created_at}</p></div>
                  <SaveButton>Save</SaveButton>
                </form>
                <CloseButton onClick={() => setEditableId(null)}>Close</CloseButton>
              </Tile>
            )
        }
      </div>
    )
  }
}

export default IdeaTile;
