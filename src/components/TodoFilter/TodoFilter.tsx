import { useContext } from 'react';
import { TodosContext } from '../../context/TodosContext';

export const TodoFilter = () => {
  const { setFilterField, query, setQuery } = useContext(TodosContext);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            onChange={event => setFilterField(event.target.value)}
            data-cy="statusSelect"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          onChange={event => setQuery(event.target.value)}
          data-cy="searchInput"
          value={query}
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query.trim() && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
