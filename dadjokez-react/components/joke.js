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
  }
  getJoke() {
    const headers = {
      'Accept': 'application/json'
    }
    /*const fetcher = (...args) => fetch(...args, { headers }).then((res) => res.json())
    const {data, error} = useSWR('https://icanhazdadjoke.com', fetcher);*/
    let obj = {
      data: {},
      error: false,
    };
    fetch('https://icanhazdadjoke.com', { headers })
    .then(res => res.json())
    .then(data => {
      if (data.error) obj.error = true;
      if (data) obj.data = data;
      this.setState(obj);
    })
    .catch(err => {
      obj.error = true;
      this.setState(obj);
    })



  };
  componentDidMount() {
    this.getJoke();
  }
  render() {

    console.log('Component is re-rendered');
    var { error, data } = this.state;
    console.log("ss");
    console.log(data);
    /*const hasError = this.state.error;
    const hasData = this.state.data;*/
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
              <h1>{this.state.data.joke}</h1>
            )
          )
          }
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
            p.loading {
              text-align: center;
            }
          `}</style>
        </div>
      </section>
    );
  }
}
export default Joke;
