/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodosContext } from './context/TodosContext';
import { Select } from './types/Select';
import { useDebounce } from './hooks/useDebounce';

export const App: React.FC = () => {
  const { show, filterField, query } = useContext(TodosContext);

  const [todos, setTodos] = useState<Todo[]>([]);
  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    getTodos().then(todosFromSetver => setTodos(todosFromSetver));
  });

  function prepareTodos(listOfTodos: Todo[]) {
    let preparedTodos = [...listOfTodos];

    preparedTodos = preparedTodos.filter(todo => {
      switch (filterField) {
        case Select.Active:
          return !todo.completed;

        case Select.Completed:
          return todo.completed;

        default:
          return todo;
      }
    });

    if (debouncedQuery) {
      const queryNormalize = debouncedQuery.toLowerCase();

      preparedTodos = preparedTodos
        .filter(todo => todo.title.toLowerCase().includes(queryNormalize));
    }

    return preparedTodos;
  }

  const visibleTodos = prepareTodos(todos);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {!todos.length
                ? <Loader />
                : <TodoList todos={visibleTodos} />}
            </div>
          </div>
        </div>
      </div>

      {show && <TodoModal />}
    </>
  );
};
