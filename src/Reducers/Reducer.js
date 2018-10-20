import initialStates from "../Data/initialData";
import {
  lens,
  compose,
  insert,
  remove,
  set,
  prop,
  assoc,
  replace,
  propOr,
  append,
  dissoc,
  reject
} from "ramda";

const Reducer = (state = initialStates, action) => {
  switch (action.type) {
    case "DRAG_AND_DROP_BOARDS": {
      const newBoardOrder = compose(
        insert(action.destination.index, action.draggableId),
        remove(action.source.index, 1)
      )(state.boardOrder);
      return { ...state, boardOrder: newBoardOrder };
    }

    case "DRAG_AND_DROP_TASKS": {
      let startBoard = state.Board[action.source.droppableId];
      const endBoard = state.Board[action.destination.droppableId];

      //Task being dragged in the same board
      if (startBoard === endBoard) {
        const newOrderOfTaskIdsOrder = compose(
          insert(action.destination.index, action.draggableId),
          remove(action.source.index, 1)
        )(startBoard.taskIds);

        startBoard = set(
          lens(prop("taskIds"), assoc("taskIds")),
          newOrderOfTaskIdsOrder,
          startBoard
        );

        return {
          ...state,
          Board: { ...state.Board, [startBoard.id]: startBoard }
        };
      }

      //Task being dragged from one board to another
      const newStartBoardTaskIds = remove(
        action.source.index,
        1,
        startBoard.taskIds
      );
      const newEndBoardTaskIds = insert(
        action.destination.index,
        action.draggableId,
        endBoard.taskIds
      );

      const newStartBoard = set(
        lens(prop("taskIds"), assoc("taskIds")),
        newStartBoardTaskIds,
        startBoard
      );
      const newEndBoard = set(
        lens(prop("taskIds"), assoc("taskIds")),
        newEndBoardTaskIds,
        endBoard
      );

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
      let lastTaskId = Object.keys(state.tasks)[
        Object.keys(state.tasks).length - 1
      ];

      lastTaskId = propOr("task-1", lastTaskId)(state.tasks);

      if (lastTaskId != "task-1") {
        const lastDigitOfTaskId = lastTaskId.id.substring(
          lastTaskId.id.length - 1
        );
        const nextIdDigit = parseInt(lastDigitOfTaskId) + 1;
        lastTaskId = replace(lastDigitOfTaskId, nextIdDigit, lastTaskId.id);
      }

      const boardToBeUpdated = state.Board[action.boardId];
      const newTaskIds = boardToBeUpdated.taskIds.concat(lastTaskId);
      const updatedBoard = set(
        lens(prop("taskIds"), assoc("taskIds")),
        newTaskIds,
        boardToBeUpdated
      );

      const updatedTasks = {
        ...state.tasks,
        [lastTaskId]: { id: lastTaskId, content: action.taskName }
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
      let lastBoardId = Object.keys(state.Board)[
        Object.keys(state.Board).length - 1
      ];
      lastBoardId = propOr("board-1", lastBoardId)(state.Board);

      if (lastBoardId != "board-1") {
        const lastDigitOfBoardId = lastBoardId.id.substring(
          lastBoardId.id.length - 1
        );
        const nextIdDigit = parseInt(lastDigitOfBoardId) + 1;
        lastBoardId = replace(lastDigitOfBoardId, nextIdDigit, lastBoardId.id);
      }

      const newBoardsOrder = append(lastBoardId, state.boardOrder);

      return {
        ...state,
        Board: {
          ...state.Board,
          [lastBoardId]: {
            id: lastBoardId,
            title: action.boardName,
            taskIds: []
          }
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

    case "DELETE_BOARD": {
      const allBoards = dissoc(action.boardId, state.Board);
      const newboardsOrder = reject(
        board => board === action.boardId,
        state.boardOrder
      );

      return {
        ...state,
        Board: allBoards,
        boardOrder: newboardsOrder
      };
    }

    case "DELETE_TASK": {
      const allTasks = dissoc(action.taskId, state.tasks);
      const newtaskIdsOfCurrentBoard = reject(
        task => task === action.taskId,
        state.Board[action.boardId].taskIds
      );
      return {
        ...state,
        tasks: allTasks,
        Board: {
          ...state.Board,
          [action.boardId]: {
            ...state.Board[action.boardId],
            taskIds: newtaskIdsOfCurrentBoard
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
