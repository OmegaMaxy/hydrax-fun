import useSWR from 'swr'
import React from 'react'

import {
  Container,
  Heading,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from '@chakra-ui/react'


class Joke extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: {}, error: false};

    this.getJoke = this.getJoke.bind(this);
  }
  getJoke() {
    const headers = {
      'Accept': 'application/json'
    }
    /*
    Can only be used in a function
    const fetcher = (...args) => fetch(...args, { headers }).then((res) => res.json())
    const {data, error} = useSWR('https://icanhazdadjoke.com', fetcher);*/
    let obj = {
      data: {},
      error: false,
    };
    fetch('https://icanhazdadjoke.com', { headers })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) obj.error = true;
      if (data) obj.data = data;
      this.setState(obj);
    })
    .catch((err) => {
      obj.error = true;
      this.setState(obj);
    });



  };
  componentDidMount() {
    this.getJoke();
  }
  render() {

    console.log('Joke Component is re-rendered');
    var { error, data } = this.state;
    return (
      <section>
        <div>
          <p className="description">
            Click <span className={'renderbtn'} onClick={this.getJoke}>here</span> to generate a new one.
          </p>
          { error == true ? (
            <Alert status='error'>
              <AlertIcon />
              <AlertTitle mr={2}>Failed to load!</AlertTitle>
              <AlertDescription>Something went wrong, please try again.</AlertDescription>
              <CloseButton position='relative' left='8px' top='0px' />
            </Alert>
          ) : (
            data == {} ? (
              <p className="loading">Loading...</p>
            ) : (
              <div className="joke">
                <h1 className="jokeText">{this.state.data.joke}</h1>
              </div>
            )
          )
          }
          <style jsx>{`
            .joke {
              margin-top: 2rem;
            }
            .jokeText {
              font-size: large;
            }
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
            p.loading {
              text-align: center;
            }
            .description {
              line-height: 1.5;
              font-size: 1.5rem;
              text-align: center;
            }
          `}</style>
        </div>
      </section>
    );
  }
}
export default Joke;
