import React from 'react';

type ResultItem = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
};

type ResultsProps = {
  data: ResultItem[];
};

class Results extends React.Component<ResultsProps> {
  render() {
    const { data } = this.props;

    return (
      <>
        <ul className={data.length < 4 ? 'result' : ''}>
          {data.length === 0 ? (
            <p>Not found</p>
          ) : (
            data.map((item, index) => (
              <li key={index}>
                {data.length < 5 ? (
                  <>
                    <span>
                      <strong className='result-name'>{item.name}</strong>
                    </span>
                    <br />
                    <strong>Gender:</strong> {item.gender} <br />
                    <strong>Birth year:</strong> {item.birth_year} <br />
                    <strong>Height:</strong> {item.height} <br />
                    <strong>Hair color:</strong> {item.hair_color} <br />
                    <strong>Skin color:</strong> {item.skin_color} <br />
                    <strong>Eye color:</strong> {item.eye_color} <br />
                    <strong>Mass:</strong> {item.mass} <br />
                  </>
                ) : (
                  <>
                    <span className='result-name'>{item.name}</span>
                    <br />
                  </>
                )}
              </li>
            ))
          )}
        </ul>
      </>
    );
  }
}

export default Results;
