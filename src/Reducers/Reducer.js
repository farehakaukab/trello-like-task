const initialStates = {
  tasks: {
    "task-1": { id: "task-1", content: "Wake up at 7 am" },
    "task-2": { id: "task-2", content: "Work out" },
    "task-3": { id: "task-3", content: "Drink lemon water" }
  },
  Board: {
    "board-1": {
      id: "board-1",
      title: "Morning Routine",
      taskIds: ["task-1", "task-2", "task-3"]
    },
    "board-2": {
      id: "board-2",
      title: "Evening Routine",
      taskIds: []
    },
    "board-3": {
      id: "board-3",
      title: "Night Routine",
      taskIds: []
    }
  },
  boardOrder: ["board-1", "board-2", "board-3"]
};

const Reducer = (state = initialStates, action) => {
  switch (action.type) {
    case "DRAG_AND_DROP_BOARDS": {
      const newBoardOrder = Array.from(state.boardOrder);
      newBoardOrder.splice(action.source.index, 1);
      newBoardOrder.splice(action.destination.index, 0, action.draggableId);

      return { ...state, boardOrder: newBoardOrder };
    }

    case "DRAG_AND_DROP_TASKS": {
      const startBoard = state.Board[action.source.droppableId];
      const endBoard = state.Board[action.destination.droppableId];

      //Task being dragged in the same board
      if (startBoard === endBoard) {
        const startBoardTaskIds = Array.from(startBoard.taskIds);
        startBoardTaskIds.splice(action.source.index, 1);
        startBoardTaskIds.splice(
          action.destination.index,
          0,
          action.draggableId
        );

        const newStartBoard = {
          ...startBoard,
          taskIds: startBoardTaskIds
        };

        return {
          ...state,
          Board: { ...state.Board, [newStartBoard.id]: newStartBoard }
        };
      }

      //Task being dragged from one board to another
      const startBoardTaskIds = Array.from(startBoard.taskIds);
      const endBoardTaskIds = Array.from(endBoard.taskIds);
      startBoardTaskIds.splice(action.source.index, 1);
      endBoardTaskIds.splice(action.destination.index, 0, action.draggableId);

      const newStartBoard = {
        ...startBoard,
        taskIds: startBoardTaskIds
      };

      const newEndBoard = {
        ...endBoard,
        taskIds: endBoardTaskIds
      };

      return {
        ...state,
        Board: {
          ...state.Board,
          [newStartBoard.id]: newStartBoard,
          [newEndBoard.id]: newEndBoard
        }
      };
    }

    case "ADD_NEW_TASK": {
      const lastTaskId = Object.keys(state.tasks)[
        Object.keys(state.tasks).length - 1
      ];
      const lastDigitOfTaskId = lastTaskId.substring(lastTaskId.length - 1);
      const nextIdDigit = parseInt(lastDigitOfTaskId) + 1;
      const newTaskId = lastTaskId.slice(0, -1) + nextIdDigit;
      const boardToBeUpdated = state.Board[action.boardId];
      const taskIdsOfBoard = boardToBeUpdated.taskIds;
      const newTaskIds = taskIdsOfBoard.concat(newTaskId);
      const updatedBoard = {
        ...boardToBeUpdated,
        taskIds: newTaskIds
      };
      const allTasks = state.tasks;
      const updatedTasks = {
        ...allTasks,
        [newTaskId]: { id: newTaskId, content: action.taskName }
      };

      return {
        ...state,
        tasks: updatedTasks,
        Board: {
          ...state.Board,
          [boardToBeUpdated.id]: updatedBoard
        }
      };
    }

    case "ADD_NEW_BOARD": {
      const lastBoardId = Object.keys(state.Board)[
        Object.keys(state.Board).length - 1
      ];
      const lastDigitOfBoardId = lastBoardId.substring(lastBoardId.length - 1);
      const nextIdDigit = parseInt(lastDigitOfBoardId) + 1;
      const newBoardId = lastBoardId.slice(0, -1) + nextIdDigit;
      const newBoardsOrder = Array.from(state.boardOrder);
      newBoardsOrder.push(newBoardId);
      return {
        ...state,
        Board: {
          ...state.Board,
          [newBoardId]: { id: newBoardId, title: action.boardName, taskIds: [] }
        },
        boardOrder: newBoardsOrder
      };
    }

    case "EDIT_TASK": {
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.taskId]: {
            ...state.tasks[action.taskId],
            content: action.taskName
          }
        }
      };
    }

    case "EDIT_TITLE": {
      return {
        ...state,
        Board: {
          ...state.Board,
          [action.boardId]: {
            ...state.Board[action.boardId],
            title: action.title
          }
        }
      };
    }

    default: {
      return state;
    }
  }
};

export default Reducer;
