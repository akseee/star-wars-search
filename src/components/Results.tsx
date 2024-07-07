import React from 'react';

type ResultItem = {
  name: string;
  description: string;
};

type ResultsProps = {
  data: ResultItem[] | null;
};

class Results extends React.Component<ResultsProps> {
  // Область для отображения результатов поиска (имя и краткое описание элементов).

  // При монтировании приложения выполняется первоначальный запрос к API.
  // Если поле ввода пустое, выполняется запрос для получения всех элементов.
  // Если в поле ввода есть значение, выполняется запрос с этим значением.
  // После выполнения запроса, результаты отображаются в нижней секции.
  // Результаты отображают имя и краткое описание каждого элемента.

  render() {
    const { data } = this.props;
    if (!Array.isArray(data)) {
      return <span>No data yet</span>;
    }

    return (
      <div>
        <h2>Search Results</h2>;
        {data ? (
          <ul>
            {data.map((item, index) => (
              <li key={index}>
                <strong>Name:</strong> {item.name} <br />
                <span>{item.description}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    );
  }
}

export default Results;
