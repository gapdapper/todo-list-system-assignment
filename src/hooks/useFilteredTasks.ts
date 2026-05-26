import { useMemo } from "react";
import type { FilterType } from "../types/Filter";
import type { ITask } from "../types/Task";


function useFilteredTasks (taskList: ITask[], searchKeyword: string, activeFilter: FilterType) {
    return useMemo(() => {
        return taskList.filter((task) => {
          const matchesSearch = task.task
            .toLocaleLowerCase()
            .includes(searchKeyword.toLocaleLowerCase());
    
          const matchesFilter =
            activeFilter === "all"
              ? true
              : activeFilter === "active"
                ? task.isDone === false
                : task.isDone === true;
    
          return matchesSearch && matchesFilter;
        });
      }, [taskList, searchKeyword, activeFilter]);
}

export default useFilteredTasks;