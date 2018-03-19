import React from 'react';
import IdeaTile from './IdeaTile';
import styled from 'styled-components';

const IdeasDisplayPanel = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const AddIdeaIcon = styled.img`
  width: 25px;
  &:hover {
    cursor: pointer;
  }
`

export default ({ideasArray, addBlankIdea, deleteIdea, editingId, setEditableId}) => (
  <IdeasDisplayPanel>
    {
      ideasArray.map(idea => {
        let isEditable = editingId === idea._id;
        return (
          <IdeaTile
            deleteIdea={deleteIdea}
            key={idea._id} idea={idea}
            isEditing={isEditable}
            setEditableId={setEditableId}
          />
        )
      })
    }
    <AddIdeaIcon onClick={addBlankIdea} src="/img/plus.svg" alt="Add a new idea"/>
  </IdeasDisplayPanel>
)
