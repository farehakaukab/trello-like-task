const initialData = {
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

export default initialData;
