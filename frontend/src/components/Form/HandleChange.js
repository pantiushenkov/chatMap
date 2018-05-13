import * as React from 'react';

export function handleChange(name) {
  return (value) => {
    const data = {
      [name]: value,
    };

    this.setState({
      data: {
        ...this.state.data,
        ...data,
      },
    });
  }
}
