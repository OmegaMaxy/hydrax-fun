import useSWR from 'swr'
import React from 'react'

import {
  Container,
  Heading,
  Spinner
} from '@chakra-ui/react'


class Joke extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: {}, error: false};
  }
  getJoke() {
    const headers = {
      'Accept': 'application/json'
    }
    const fetcher = (...args) => fetch(...args, { headers }).then((res) => res.json())
    //const {data, error} = useSWR('https://icanhazdadjoke.com', fetcher)
    var data, error = null;
    if (error) this.setState({error: true});
    if (!data) this.setState({data: {}});
    if (data) this.setState({data: data});
  };
  componentDidMount() {
    this.getJoke();
  }
  render() {

    console.log('Component is re-rendered');
    const hasError = this.state.error;
    const hasData = this.state.data;
    return (
      <section>
        { hasError ? (
          <div>Failed to load</div>
        ) : (
          hasData ? (
            <div>Loading...</div>
          ) : (
            <div>
              <p className="description">
                Click <span className={'renderbtn'} onClick={this.getJoke}>here</span> to generate a new one.
              </p>
              <h1>{this.state.data.joke}</h1>

              <style jsx>{`
                .renderbtn {
                  color: #39f;
                  cursor: pointer;
                }
                .renderbtn:hover {
                  text-decoration: underline;
                }
                section {
                  padding: 3rem;
                  margin-top: 2rem;
                }
                h1 {
                  font-size: 2em;
                  text-align: center;
                }
              `}</style>
            </div>
          )
        )
        }
      </section>
    );
  }
}
export default Joke;
