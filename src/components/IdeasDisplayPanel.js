import React from 'react';
import IdeaTile from './IdeaTile';
import styled from 'styled-components';
import { fadeIn } from '../animations';

const IdeasDisplayPanel = styled.div`
  animation: ${fadeIn} 1000ms;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`

const AddIdeaIcon = styled.img`
  width: 40px;
  &:hover {
    cursor: pointer;
  }
`

export default ({ideasArray, addBlankIdea, deleteIdea, editingId, setEditableId, updateIdea}) => (
  <IdeasDisplayPanel>
    {
      ideasArray.map(idea => {
        let isEditable = editingId === idea.id;
        return (
          <IdeaTile
            deleteIdea={deleteIdea}
            key={idea.id} idea={idea}
            isEditing={isEditable}
            setEditableId={setEditableId}
            updateIdea={updateIdea}
          />
        )
      })
    }
    <AddIdeaIcon onClick={addBlankIdea} src="/img/plus.svg" alt="Add a new idea"/>
  </IdeasDisplayPanel>
)
